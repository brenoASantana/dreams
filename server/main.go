package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

type Player struct {
	X, Y int
}

type Command struct {
	Key string `json:"key"`
}

// Configura o "porteiro" que transforma HTTP em WebSocket
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Permite que qualquer um conecte (útil para dev)
	},
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	// 1. O Upgrade: Transforma a conexão HTTP em WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Erro ao conectar:", err)
		return
	}
	defer conn.Close() // Fecha a conexão quando a função acabar

	fmt.Println("Novo cliente conectado! 🔌")

	player := Player{0, 0}

	// 2. O Loop da Conversa (Onde o jogo acontece)
	for {
		// Lê mensagem do cliente (React)
		_, msg, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("Cliente desconectou.")
			break
		}

		fmt.Printf("Recebi do React: %s\n", msg)

		// 1. Criamos uma variável para guardar o comando
		var cmd Command
		// 2. "Traduzimos" o JSON recebido para a nossa struct
		err = json.Unmarshal(msg, &cmd)
		if err != nil {
			fmt.Println("Erro ao ler JSON:", err)
			continue
		}

		// 3. A Lógica de Movimento (O Ditador)
		switch cmd.Key {
		case "up":
			if player.Y > 0 {
				player.Y -= 10 // No computador, subtrair Y sobe a imagem
			}
		case "down":
			if player.Y < 600 {
				player.Y += 10
			}
		case "left":
			if player.X > 0 {
				player.X -= 10
			}
		case "right":
			if player.X < 800 { // Limite para não sair da tela
				player.X += 10
			}
		}

		// 4. Enviamos o player atualizado de volta para o React
		conn.WriteJSON(player)

	}
}

func main() {
	http.HandleFunc("/ws", handleWebSocket) // Nova rota "/ws"

	fmt.Println("Servidor de Sonhos rodando na porta 8080...")
	http.ListenAndServe(":8080", nil)
}
