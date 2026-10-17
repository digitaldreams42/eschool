'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

const roboto = {
  style: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
};

const ibmPlexSans = {
  style: {
    fontFamily: '"IBM Plex Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  },
};

// ZMP Tech palette (from Zolemba app_theme.dart)
const zmpColors = {
  primary: '#3B82F6',
  secondary: '#60A5FA',
  cta: '#F97316',
  background: '#F8FAFC',
  text: '#1E293B',
  textMuted: '#64748B',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#F59E0B',
};

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: zmpColors.primary,
      light: zmpColors.secondary,
      dark: '#2563EB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: zmpColors.cta,
      light: '#FB923C',
      dark: '#EA580C',
      contrastText: '#FFFFFF',
    },
    error: {
      main: zmpColors.danger,
      light: '#F87171',
      dark: '#DC2626',
    },
    success: {
      main: zmpColors.success,
      light: '#4ADE80',
      dark: '#16A34A',
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
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontFamily: ibmPlexSans.style.fontFamily,
      fontWeight: 600,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: ibmPlexSans.style.fontFamily,
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: ibmPlexSans.style.fontFamily,
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: ibmPlexSans.style.fontFamily,
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h5: {
      fontFamily: ibmPlexSans.style.fontFamily,
      fontWeight: 600,
      fontSize: '1.125rem',
    },
    h6: {
      fontFamily: ibmPlexSans.style.fontFamily,
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.9375rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
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
export { zmpColors };
