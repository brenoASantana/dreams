import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

function App() {
  const [messageHistory, setMessageHistory] = useState([]);
  // Substitua o useState antigo por este:
const [playerData, setPlayerData] = useState({ X: 0, Y: 0 });

  // 1. A Mágica: Conecta no WebSocket do Go
  const { sendMessage, sendJsonMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8080/ws');

  // 2. Sempre que chegar uma mensagem nova do Go, salvamos na lista
  useEffect(() => {
    if (lastMessage !== null) {
      setPlayerData(JSON.parse(lastMessage.data));
    }
  }, [lastMessage]);

  // Função para enviar dados para o Go quando clicamos no botão
  const handleClick = () => {
    sendMessage('Olá Go, aqui é o React!');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // O switch verifica o valor de event.key
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          sendJsonMessage({key: 'up'});
          // Aqui enviaremos o comando para o Go
          break;
        case 'ArrowDown':
        case 's':
          sendJsonMessage({key: 'down'});
          break;
        case 'ArrowLeft':
        case 'a':
          sendJsonMessage({key: 'left'});
          break;
        case 'ArrowRight':
        case 'd':
          sendJsonMessage({key: 'right'});
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sendMessage]); // Lembre-se de incluir sendMessage nas dependências

return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#222', overflow: 'hidden' }}>
      {/* Título fixo no fundo */}
      <h1 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
        Dreams Architect 🌙
      </h1>

      {/* O Nosso Jogador */}
      <div style={{
          position: 'absolute',
          left: playerData.X,
          top: playerData.Y,
          fontSize: '40px' // Aumenta o tamanho do emoji
      }}>
        🧙‍♂️
      </div>

      {/* Painel de Debug (Opcional, para ver os números mudando) */}
      <div style={{ position: 'fixed', bottom: 10, left: 10, color: '#0f0', fontFamily: 'monospace' }}>
        X: {playerData.X}, Y: {playerData.Y}
      </div>
    </div>
  );
}

export default App;