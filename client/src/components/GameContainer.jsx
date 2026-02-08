import { COLORS } from '../constants';
import { Controls } from './Controls';
import { DebugPanel } from './DebugPanel';
import { Player } from './Player';

export function GameContainer({ playerData }) {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                backgroundColor: COLORS.darkBg,
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Título */}
            <h1
                style={{
                    color: COLORS.white,
                    textAlign: 'center',
                    margin: 0,
                    paddingTop: '20px',
                }}
            >
                Dreams Architect 🌙
            </h1>

            {/* Jogador */}
            <Player x={playerData.x} y={playerData.y} />

            {/* Debug Panel */}
            <DebugPanel x={playerData.x} y={playerData.y} />

            {/* Controles */}
            <Controls />
        </div>
    );
}
