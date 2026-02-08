package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

const (
	// Servidor
	ServerPort    = ":8080"
	ReadTimeout   = 10 * time.Second
	WriteTimeout  = 10 * time.Second
	AllowedOrigin = "http://localhost:5173" // URL do Vite em dev

	// Game
	PlayerMoveStep = 10
	MaxX           = 800
	MaxY           = 600
	PingInterval   = 30 * time.Second
)

// ============================================================================
// TIPOS
// ============================================================================

type Player struct {
	X, Y int `json:"x,y"`
}

type Command struct {
	Key string `json:"key"`
}

type GameServer struct {
	upgrader websocket.Upgrader
	clients  map[*Client]bool
	mu       sync.RWMutex
	logger   *log.Logger
}

type Client struct {
	conn   *websocket.Conn
	server *GameServer
	player Player
	done   chan struct{}
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

func NewGameServer() *GameServer {
	return &GameServer{
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				origin := r.Header.Get("Origin")
				return origin == AllowedOrigin
			},
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
		clients: make(map[*Client]bool),
		logger:  log.New(os.Stdout, "[DREAMS] ", log.LstdFlags|log.Lshortfile),
	}
}

// ============================================================================
// HANDLER WEBSOCKET
// ============================================================================

func (gs *GameServer) handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := gs.upgrader.Upgrade(w, r, nil)
	if err != nil {
		gs.logger.Printf("❌ Erro ao fazer upgrade: %v\n", err)
		return
	}

	client := &Client{
		conn:   conn,
		server: gs,
		player: Player{X: 0, Y: 0},
		done:   make(chan struct{}),
	}

	gs.addClient(client)
	gs.logger.Println("✅ Novo cliente conectado")

	// Inicia processamento de mensagens e heartbeat
	go client.readMessages()
	go client.sendHeartbeat()
}

// ============================================================================
// GERENCIAMENTO DE CLIENTES
// ============================================================================

func (gs *GameServer) addClient(c *Client) {
	gs.mu.Lock()
	defer gs.mu.Unlock()
	gs.clients[c] = true
}

func (gs *GameServer) removeClient(c *Client) {
	gs.mu.Lock()
	defer gs.mu.Unlock()
	delete(gs.clients, c)
	gs.logger.Println("👋 Cliente desconectado")
}

// ============================================================================
// LÓGICA DO CLIENTE
// ============================================================================

func (client *Client) readMessages() {
	defer func() {
		client.close()
		client.server.removeClient(client)
	}()

	client.conn.SetReadDeadline(time.Now().Add(PingInterval + 5*time.Second))

	for {
		_, msg, err := client.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				client.server.logger.Printf("⚠️  Erro ao ler mensagem: %v\n", err)
			}
			return
		}

		// Validar e processar comando
		if err := client.processCommand(msg); err != nil {
			client.server.logger.Printf("⚠️  Comando inválido: %v\n", err)
			continue
		}

		// Enviar estado atualizado
		if err := client.sendState(); err != nil {
			client.server.logger.Printf("❌ Erro ao enviar estado: %v\n", err)
			return
		}
	}
}

func (client *Client) processCommand(msg []byte) error {
	var cmd Command
	if err := json.Unmarshal(msg, &cmd); err != nil {
		return fmt.Errorf("JSON inválido: %w", err)
	}

	if cmd.Key == "" {
		return errors.New("comando vazio")
	}

	// Aplicar movimento
	switch cmd.Key {
	case "up":
		if client.player.Y > 0 {
			client.player.Y -= PlayerMoveStep
		}
	case "down":
		if client.player.Y < MaxY {
			client.player.Y += PlayerMoveStep
		}
	case "left":
		if client.player.X > 0 {
			client.player.X -= PlayerMoveStep
		}
	case "right":
		if client.player.X < MaxX {
			client.player.X += PlayerMoveStep
		}
	default:
		return fmt.Errorf("comando desconhecido: %s", cmd.Key)
	}

	return nil
}

func (client *Client) sendState() error {
	client.conn.SetWriteDeadline(time.Now().Add(WriteTimeout))
	return client.conn.WriteJSON(client.player)
}

func (client *Client) sendHeartbeat() {
	ticker := time.NewTicker(PingInterval)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			client.conn.SetWriteDeadline(time.Now().Add(WriteTimeout))
			if err := client.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		case <-client.done:
			return
		}
	}
}

func (client *Client) close() {
	close(client.done)
	client.conn.Close()
}

// ============================================================================
// MAIN
// ============================================================================

func main() {
	gs := NewGameServer()

	http.HandleFunc("/ws", gs.handleWebSocket)
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"ok"}`)
	})

	server := &http.Server{
		Addr:         ServerPort,
		Handler:      http.DefaultServeMux,
		ReadTimeout:  ReadTimeout,
		WriteTimeout: WriteTimeout,
		IdleTimeout:  60 * time.Second,
	}

	gs.logger.Printf("🚀 Servidor rodando em ws://localhost:8080/ws\n")
	gs.logger.Printf("🏥 Health check em http://localhost:8080/health\n")

	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		gs.logger.Fatalf("❌ Erro ao iniciar servidor: %v\n", err)
	}
}
