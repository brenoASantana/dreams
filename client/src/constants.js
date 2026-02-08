// ============================================================================
// SERVIDOR
// ============================================================================
export const WS_URL = 'ws://localhost:8080/ws';
export const RECONNECT_INTERVAL = 3000;

// ============================================================================
// GAME
// ============================================================================
export const GAME_STAGES = {
  INTRO: 0,
  PLAYING: 1,
};

export const INTRO_DURATION = 3000; // 3 segundos

export const PLAYER_INITIAL_STATE = {
  x: 0,
  y: 0,
};

export const GAME_BOUNDS = {
  maxX: 800,
  maxY: 600,
};

// ============================================================================
// CONTROLES
// ============================================================================
export const KEYBOARD_KEYS = {
  UP: ['arrowup', 'w'],
  DOWN: ['arrowdown', 's'],
  LEFT: ['arrowleft', 'a'],
  RIGHT: ['arrowright', 'd'],
};

// ============================================================================
// CORES
// ============================================================================
export const COLORS = {
  darkBg: '#222',
  introBg: '#1a1a2e',
  debugText: '#0f0',
  debugBg: 'rgba(0,0,0,0.7)',
  white: '#ffffff',
  gray: '#999',
  lightGray: '#aaa',
  error: '#f44336',
  success: '#4caf50',
  warning: '#ff9800',
};

// ============================================================================
// TIPOGRAFIA
// ============================================================================
export const FONT_SIZES = {
  tiny: '12px',
  small: '14px',
  normal: '18px',
  large: '40px',
  xlarge: '48px',
};

export const FONT_FAMILY = {
  monospace: 'monospace',
  default: 'system-ui, -apple-system, sans-serif',
};

// ============================================================================
// ESPAÇAMENTO
// ============================================================================
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '10px',
  lg: '20px',
  xl: '50px',
};

// ============================================================================
// CONEXÃO WEBSOCKET
// ============================================================================
export const WEBSOCKET_STATES = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

export const CONNECTION_MESSAGES = {
  0: 'Conectando...',
  1: 'Conectado',
  2: 'Desconectando...',
  3: 'Desconectado',
};

export const CONNECTION_COLORS = {
  0: '#ff9800',
  1: '#4caf50',
  2: '#ff9800',
  3: '#f44336',
};
