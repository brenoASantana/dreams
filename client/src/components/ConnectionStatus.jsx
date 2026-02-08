import { CONNECTION_COLORS, CONNECTION_MESSAGES } from '../constants';
import { statusBadge } from '../styles';

export function ConnectionStatus({ readyState }) {
    const message = CONNECTION_MESSAGES[readyState];
    const color = CONNECTION_COLORS[readyState];

    return (
        <div
            style={{
                ...statusBadge,
                backgroundColor: color,
            }}
        >
            ● {message}
        </div>
    );
}
