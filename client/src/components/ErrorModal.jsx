import { bodyText, overlayModal } from '../styles';

export function ErrorModal({ error }) {
    if (!error) return null;

    return (
        <div style={overlayModal}>
            <p style={{ margin: 0, marginBottom: '10px' }}>{error}</p>
            <p
                style={{
                    ...bodyText,
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '12px',
                    margin: 0,
                }}
            >
                Tentando reconectar...
            </p>
        </div>
    );
}
