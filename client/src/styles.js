import {
    COLORS,
    FONT_FAMILY,
    FONT_SIZES,
    SPACING,
} from './constants';

// ============================================================================
// CONTAINER
// ============================================================================
export const fullscreenContainer = {
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
};

export const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// ============================================================================
// TEXTO
// ============================================================================
export const heading1 = {
  fontSize: FONT_SIZES.xlarge,
  fontFamily: FONT_FAMILY.default,
  fontWeight: 'bold',
  color: COLORS.white,
  margin: 0,
};

export const heading2 = {
  fontSize: FONT_SIZES.large,
  fontFamily: FONT_FAMILY.default,
  fontWeight: 'bold',
  color: COLORS.white,
  textAlign: 'center',
  margin: 0,
  paddingTop: SPACING.lg,
  marginTop: SPACING.lg,
};

export const bodyText = {
  fontSize: FONT_SIZES.normal,
  color: COLORS.lightGray,
  fontFamily: FONT_FAMILY.default,
};

export const monoText = {
  fontSize: FONT_SIZES.small,
  fontFamily: FONT_FAMILY.monospace,
  color: COLORS.debugText,
};

// ============================================================================
// PAINEL
// ============================================================================
export const fixedPanel = {
  position: 'fixed',
  backgroundColor: COLORS.debugBg,
  color: COLORS.debugText,
  fontFamily: FONT_FAMILY.monospace,
  borderRadius: '4px',
  padding: SPACING.md,
};

export const statusBadge = {
  position: 'fixed',
  top: SPACING.md,
  right: SPACING.md,
  padding: `${SPACING.xs} ${SPACING.sm}`,
  color: COLORS.white,
  borderRadius: '4px',
  fontSize: FONT_SIZES.tiny,
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: SPACING.xs,
};

// ============================================================================
// MODAL
// ============================================================================
export const overlayModal = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: COLORS.error,
  color: COLORS.white,
  padding: SPACING.lg,
  borderRadius: '8px',
  zIndex: 1000,
  textAlign: 'center',
};

// ============================================================================
// JOGADOR
// ============================================================================
export const playerCharacter = {
  position: 'absolute',
  fontSize: FONT_SIZES.large,
  transition: 'all 0.05s linear',
};

// ============================================================================
// CONTROLES
// ============================================================================
export const controlsPanel = {
  position: 'fixed',
  bottom: SPACING.lg,
  right: SPACING.lg,
  color: COLORS.gray,
  fontFamily: FONT_FAMILY.monospace,
  fontSize: FONT_SIZES.tiny,
  textAlign: 'right',
  lineHeight: '1.6',
};

// ============================================================================
// INTRO
// ============================================================================
export const introContainer = {
  ...fullscreenContainer,
  backgroundColor: COLORS.introBg,
  ...flexCenter,
  flexDirection: 'column',
  color: COLORS.white,
};
