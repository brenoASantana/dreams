import { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { RECONNECT_INTERVAL, WS_URL } from '../constants';

export function useGameWebSocket() {
  const [error, setError] = useState(null);
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('✅ Conectado ao servidor');
      setError(null);
    },
    onClose: () => {
      console.log('👋 Desconectado do servidor');
    },
    onError: (e) => {
      console.error('❌ Erro WebSocket:', e);
      setError('Erro ao conectar ao servidor');
    },
    shouldReconnect: () => true,
    reconnectInterval: RECONNECT_INTERVAL,
  });

  return { sendJsonMessage, lastMessage, readyState, error };
}
