import { SPACING } from '../constants';
import { fixedPanel, monoText } from '../styles';

export function DebugPanel({ x, y }) {
    return (
        <div
            style={{
                ...fixedPanel,
                bottom: SPACING.lg,
                left: SPACING.lg,
            }}
        >
            <div style={monoText}>X: {x}</div>
            <div style={monoText}>Y: {y}</div>
        </div>
    );
}
