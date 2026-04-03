// src/utils/brutalistUtils.js
import { 
  BrutalistColors, 
  BrutalistShadows, 
  BrutalistBorders,
  ButtonPrimary,
  ButtonSecondary,
  ButtonDanger,
  BrutalistCard,
  BrutalistBadge,
  combineStyles
} from '../styles/BrutalistStyles';

export const brutalist = {
  colors: BrutalistColors,
  shadows: BrutalistShadows,
  borders: BrutalistBorders,
  buttons: {
    primary: ButtonPrimary,
    secondary: ButtonSecondary,
    danger: ButtonDanger
  },
  cards: BrutalistCard,
  badges: BrutalistBadge,
  combine: combineStyles
};

// Common style presets
export const presets = {
  page: {
    background: BrutalistColors.black,
    color: BrutalistColors.white,
    fontFamily: 'monospace',
    minHeight: '100vh'
  },
  header: {
    borderBottom: BrutalistBorders.thick,
    background: BrutalistColors.black,
    padding: '16px'
  },
  card: (variant = 'base') => combineStyles(
    BrutalistCard[variant],
    { marginBottom: '24px' }
  ),
  button: (variant = 'primary', size = 'medium') => {
    const base = brutalist.buttons[variant] || ButtonPrimary;
    const sizes = {
      small: { padding: '8px 16px', fontSize: '14px' },
      medium: { padding: '12px 24px', fontSize: '16px' },
      large: { padding: '16px 32px', fontSize: '20px' }
    };
    return combineStyles(base, sizes[size] || sizes.medium);
  }
};