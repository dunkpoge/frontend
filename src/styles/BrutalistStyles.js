// ============ BRUTALIST STYLE SYSTEM ============
// src/styles/BrutalistStyles.js

export const BrutalistColors = {
  // Primary colors - bold and contrasting
  black: '#000000',
  white: '#FFFFFF',
  neonGreen: '#00FF00',
  electricBlue: '#0066FF',
  hotPink: '#FF0066',
  yellow: '#FFFF00',
  orange: '#FF6600',
  purple: '#9933FF',
  cyan: '#00FFFF',
  
  // Background gradients for transparency demonstration
  transparencyGradient: 'linear-gradient(45deg, #FF0066 0%, #00FF00 25%, #0066FF 50%, #FFFF00 75%, #FF0066 100%)',
  checkerboard: `
    repeating-conic-gradient(#dddddd 0% 25%, #ffffff 0% 50%) 
    50% / 20px 20px
  `,
  animatedGradient: 'linear-gradient(-45deg, #FF0066, #0066FF, #00FF00, #FFFF00)',
};

export const BrutalistShadows = {
  // Offset block shadows - signature brutalist style
  small: '4px 4px 0 0 #000',
  medium: '8px 8px 0 0 #000',
  large: '12px 12px 0 0 #000',
  xlarge: '16px 16px 0 0 #000',
  
  // Colored offset shadows
  neonGreen: '8px 8px 0 0 #00FF00',
  electricBlue: '8px 8px 0 0 #0066FF',
  hotPink: '8px 8px 0 0 #FF0066',
  
  // Multiple offset shadows for depth
  stacked: '4px 4px 0 0 #000, 8px 8px 0 0 #00FF00',
  triple: '4px 4px 0 0 #FF0066, 8px 8px 0 0 #000, 12px 12px 0 0 #00FF00',
};

export const BrutalistBorders = {
  thick: '4px solid #000',
  thicker: '6px solid #000',
  thicc: '8px solid #000',
  
  // Colored borders
  neonGreen: '4px solid #00FF00',
  electricBlue: '4px solid #0066FF',
  hotPink: '4px solid #FF0066',
  white: '4px solid #FFF',
};

// Base button styles
export const BrutalistButton = {
  base: {
    fontFamily: 'monospace',
    fontWeight: '900',
    fontSize: '16px',
    padding: '12px 24px',
    border: BrutalistBorders.thick,
    background: BrutalistColors.neonGreen,
    color: BrutalistColors.black,
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  hover: {
    transform: 'translate(2px, 2px)',
    boxShadow: '4px 4px 0 0 #000',
  },
  active: {
    transform: 'translate(4px, 4px)',
    boxShadow: 'none',
  },
  disabled: {
    background: '#999',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
};

// Primary button (green)
export const ButtonPrimary = {
  ...BrutalistButton.base,
  background: BrutalistColors.neonGreen,
  boxShadow: BrutalistShadows.medium,
};

// Secondary button (blue)
export const ButtonSecondary = {
  ...BrutalistButton.base,
  background: BrutalistColors.electricBlue,
  color: BrutalistColors.white,
  boxShadow: BrutalistShadows.medium,
};

// Danger button (pink/red)
export const ButtonDanger = {
  ...BrutalistButton.base,
  background: BrutalistColors.hotPink,
  color: BrutalistColors.white,
  boxShadow: BrutalistShadows.medium,
};

// Card/Panel styles
export const BrutalistCard = {
  base: {
    border: BrutalistBorders.thick,
    background: BrutalistColors.white,
    boxShadow: BrutalistShadows.large,
    padding: '24px',
  },
  dark: {
    border: BrutalistBorders.thick,
    background: BrutalistColors.black,
    color: BrutalistColors.white,
    boxShadow: BrutalistShadows.neonGreen,
    padding: '24px',
  },
  highlighted: {
    border: BrutalistBorders.thicc,
    background: BrutalistColors.yellow,
    boxShadow: BrutalistShadows.triple,
    padding: '24px',
  },
};

// NFT Display Container - Shows transparency clearly
export const NFTContainer = {
  base: {
    border: BrutalistBorders.thick,
    boxShadow: BrutalistShadows.large,
    position: 'relative',
    overflow: 'hidden',
  },
  // Animated gradient background to show SVG transparency
  backgroundAnimated: {
    background: BrutalistColors.animatedGradient,
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
  },
  // Static gradient
  backgroundGradient: {
    background: BrutalistColors.transparencyGradient,
  },
  // Checkerboard pattern (classic transparency indicator)
  backgroundChecker: {
    background: BrutalistColors.checkerboard,
  },
};

// Badge/Tag styles
export const BrutalistBadge = {
  success: {
    background: BrutalistColors.neonGreen,
    color: BrutalistColors.black,
    border: BrutalistBorders.thick,
    padding: '4px 12px',
    fontWeight: '900',
    fontSize: '12px',
    textTransform: 'uppercase',
    boxShadow: BrutalistShadows.small,
  },
  warning: {
    background: BrutalistColors.yellow,
    color: BrutalistColors.black,
    border: BrutalistBorders.thick,
    padding: '4px 12px',
    fontWeight: '900',
    fontSize: '12px',
    textTransform: 'uppercase',
    boxShadow: BrutalistShadows.small,
  },
  danger: {
    background: BrutalistColors.hotPink,
    color: BrutalistColors.white,
    border: BrutalistBorders.thick,
    padding: '4px 12px',
    fontWeight: '900',
    fontSize: '12px',
    textTransform: 'uppercase',
    boxShadow: BrutalistShadows.small,
  },
  info: {
    background: BrutalistColors.electricBlue,
    color: BrutalistColors.white,
    border: BrutalistBorders.thick,
    padding: '4px 12px',
    fontWeight: '900',
    fontSize: '12px',
    textTransform: 'uppercase',
    boxShadow: BrutalistShadows.small,
  },
};

// Input styles
export const BrutalistInput = {
  base: {
    fontFamily: 'monospace',
    fontSize: '18px',
    fontWeight: '700',
    padding: '12px 16px',
    border: BrutalistBorders.thick,
    background: BrutalistColors.white,
    color: BrutalistColors.black,
    outline: 'none',
  },
  focus: {
    boxShadow: BrutalistShadows.small,
  },
};

// Header styles
export const BrutalistHeader = {
  h1: {
    fontFamily: 'monospace',
    fontSize: '64px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '-2px',
    color: BrutalistColors.black,
    textShadow: `4px 4px 0 ${BrutalistColors.neonGreen}`,
    lineHeight: '1',
  },
  h2: {
    fontFamily: 'monospace',
    fontSize: '48px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '-1px',
    color: BrutalistColors.black,
    textShadow: `3px 3px 0 ${BrutalistColors.electricBlue}`,
    lineHeight: '1.1',
  },
  h3: {
    fontFamily: 'monospace',
    fontSize: '32px',
    fontWeight: '900',
    textTransform: 'uppercase',
    color: BrutalistColors.black,
    lineHeight: '1.2',
  },
};

// CSS for animated gradient (add to global styles)
export const GlobalBrutalistCSS = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes brutalistPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

@keyframes brutalistShake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}

/* Brutalist scrollbar */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: #fff;
  border: 2px solid #000;
}

::-webkit-scrollbar-thumb {
  background: #00FF00;
  border: 2px solid #000;
}

::-webkit-scrollbar-thumb:hover {
  background: #0066FF;
}

/* Selection */
::selection {
  background: #00FF00;
  color: #000;
}

::-moz-selection {
  background: #00FF00;
  color: #000;
}
`;

// Utility function to combine styles
export const combineStyles = (...styles) => {
  return Object.assign({}, ...styles);
};

// Responsive breakpoints
export const Breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};

// Layout spacing
export const Spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
};