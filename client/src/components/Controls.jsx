import { controlsPanel } from '../styles';

export function Controls() {
    return (
        <div style={controlsPanel}>
            <div>↑ W ou ↑ Arrow</div>
            <div>↓ S ou ↓ Arrow</div>
            <div>← A ou ← Arrow</div>
            <div>→ D ou → Arrow</div>
        </div>
    );
}
