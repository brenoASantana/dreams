import { useEffect } from 'react';
import { KEYBOARD_KEYS } from '../constants';

export function useKeyboardInput(sendJsonMessage, isConnected) {
  useEffect(() => {
    if (!isConnected) return;

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      let command = null;

      if (KEYBOARD_KEYS.UP.includes(key)) {
        command = 'up';
      } else if (KEYBOARD_KEYS.DOWN.includes(key)) {
        command = 'down';
      } else if (KEYBOARD_KEYS.LEFT.includes(key)) {
        command = 'left';
      } else if (KEYBOARD_KEYS.RIGHT.includes(key)) {
        command = 'right';
      } else {
        return;
      }

      event.preventDefault();
      sendJsonMessage({ key: command });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sendJsonMessage, isConnected]);
}
