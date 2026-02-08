import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

function App() {
  const [messageHistory, setMessageHistory] = useState([]);

  // 1. A Mágica: Conecta no WebSocket do Go
  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8080/ws');

  // 2. Sempre que chegar uma mensagem nova do Go, salvamos na lista
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => [...prev, lastMessage.data]);
    }
  }, [lastMessage]);

  // Função para enviar dados para o Go quando clicamos no botão
  const handleClick = () => {
    sendMessage('Olá Go, aqui é o React!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dreams Architect 🌙</h1>

      <p>Status da Conexão: {readyState === 1 ? '🟢 Conectado' : '🔴 Desconectado'}</p>

      <button onClick={handleClick} style={{ fontSize: '16px', padding: '10px' }}>
        Enviar 'Oi' para o Servidor
      </button>

      <h3>O que o servidor respondeu:</h3>
      <ul>
        {messageHistory.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;