package main

import (
	"fmt"
	"net/http"
	"github.com/gorilla/websocket"
)

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

	// 2. O Loop da Conversa (Onde o jogo acontece)
	for {
		// Lê mensagem do cliente (React)
		_, msg, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("Cliente desconectou.")
			break
		}

		fmt.Printf("Recebi do React: %s\n", msg)

		// Responde para o cliente
		err = conn.WriteMessage(websocket.TextMessage, []byte("Olá React, eu sou o Go!"))
		if err != nil {
			break
		}
	}
}

func main() {
	http.HandleFunc("/ws", handleWebSocket) // Nova rota "/ws"

	fmt.Println("Servidor de Sonhos rodando na porta 8080...")
	http.ListenAndServe(":8080", nil)
}