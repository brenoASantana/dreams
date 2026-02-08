import { useEffect, useState } from 'react';
import {
  ConnectionStatus,
  ErrorModal,
  GameContainer,
  IntroScreen,
} from './components';
import { GAME_STAGES, INTRO_DURATION, PLAYER_INITIAL_STATE, WEBSOCKET_STATES } from './constants';
import { useGameWebSocket, useKeyboardInput } from './hooks';

/**
 * Componente principal da aplicação Dreams
 * Gerencia o estado do jogo e coordena os componentes
 */
function App() {
  const [gameStage, setGameStage] = useState(GAME_STAGES.INTRO);
  const [playerData, setPlayerData] = useState(PLAYER_INITIAL_STATE);

  // Conexão WebSocket
  const { sendJsonMessage, lastMessage, readyState, error } = useGameWebSocket();

  // Input de teclado
  const isConnected = readyState === WEBSOCKET_STATES.OPEN;
  useKeyboardInput(sendJsonMessage, isConnected);

  // Atualizar posição do jogador quando receber mensagem do servidor
  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data = JSON.parse(lastMessage.data);
        setPlayerData({ x: data.x, y: data.y });
      } catch (e) {
        console.error('Erro ao parsear mensagem:', e);
      }
    }
  }, [lastMessage]);

  // Transição automática para tela de jogo
  useEffect(() => {
    const timer = setTimeout(() => {
      setGameStage(GAME_STAGES.PLAYING);
    }, INTRO_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <ErrorModal error={error} />
      <ConnectionStatus readyState={readyState} />
      {gameStage === GAME_STAGES.INTRO ? (
        <IntroScreen />
      ) : (
        <GameContainer playerData={playerData} />
      )}
    </div>
  );
}

export default App;