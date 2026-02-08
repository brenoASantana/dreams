import { playerCharacter } from '../styles';

export function Player({ x, y }) {
    return (
        <div
            style={{
                ...playerCharacter,
                left: `${x}px`,
                top: `${y}px`,
            }}
        >
            🧙‍♂️
        </div>
    );
}
