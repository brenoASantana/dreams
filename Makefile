.PHONY: install build dev run clean help

help:
	@echo "Comandos disponíveis:"
	@echo "  make install    - Instala dependências do projeto"
	@echo "  make build      - Compila cliente e servidor"
	@echo "  make dev        - Inicia em modo desenvolvimento"
	@echo "  make client     - Inicia apenas o cliente"
	@echo "  make server     - Inicia apenas o servidor"
	@echo "  make clean      - Remove artefatos de compilação"

install:
	@echo "📦 Instalando dependências do cliente..."
	cd client && npm install
	@echo "✅ Cliente instalado!"

build: build-client build-server
	@echo "✅ Compilação completa!"

build-client:
	@echo "🏗️  Compilando cliente..."
	cd client && npm run build

build-server:
	@echo "🏗️  Compilando servidor..."
	cd server && go build -o dreams-server .

dev:
	@echo "🚀 Iniciando em modo desenvolvimento..."
	@echo "📱 Cliente: http://localhost:5173"
	@echo "🔌 Servidor WebSocket: ws://localhost:8080"
	@make server &
	@sleep 1
	@cd client && npm run dev

client:
	@echo "📱 Iniciando cliente..."
	cd client && npm run dev

server:
	@echo "🔌 Iniciando servidor..."
	cd server && go run main.go

clean:
	@echo "🧹 Limpando projeto..."
	rm -rf client/dist client/node_modules server/dreams-server
	@echo "✅ Limpo!"
