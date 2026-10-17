'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

const FONT_SANS =
  '"Manrope", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';
const FONT_DISPLAY = '"Fraunces", ui-serif, Georgia, "Times New Roman", serif';

/**
 * eSchool brand palette — deep ink canvas + warm gold accent.
 * Exported as `zmpColors` for backwards compatibility with the
 * thin MUI wrappers in `src/components/mui/*`.
 */
export const zmpColors = {
  primary: '#E3B24D',
  secondary: '#F4D28A',
  cta: '#E3B24D',
  background: '#070A0E',
  text: '#F5F1EA',
  textMuted: '#9BA3AE',
  surface: '#0B0F14',
  border: 'rgba(255,255,255,0.09)',
  success: '#34D399',
  danger: '#EF4444',
  warning: '#F59E0B',
};

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: zmpColors.primary,
      light: zmpColors.secondary,
      dark: '#C8972B',
      contrastText: '#0A0E12',
    },
    secondary: {
      main: '#7FD1B9',
      light: '#A6E3D1',
      dark: '#4FAF94',
      contrastText: '#06120E',
    },
    error: {
      main: zmpColors.danger,
      light: '#F87171',
      dark: '#DC2626',
    },
    success: {
      main: zmpColors.success,
      light: '#6EE7B7',
      dark: '#059669',
    },
    warning: {
      main: zmpColors.warning,
      light: '#FBBF24',
      dark: '#D97706',
    },
    background: {
      default: zmpColors.background,
      paper: zmpColors.surface,
    },
    text: {
      primary: zmpColors.text,
      secondary: zmpColors.textMuted,
    },
    divider: zmpColors.border,
  },
  typography: {
    fontFamily: FONT_SANS,
    h1: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 600,
      fontSize: '2.75rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 600,
      fontSize: '2.1rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.12,
    },
    h3: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 600,
      fontSize: '1.6rem',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 600,
      fontSize: '1.3rem',
    },
    h5: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 600,
      fontSize: '1.125rem',
    },
    h6: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.55,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.9375rem',
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 6px 18px rgba(227,178,77,0.25)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
          border: `1px solid ${zmpColors.border}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9375rem',
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
