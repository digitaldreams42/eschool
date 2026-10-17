'use client';

import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { zmpColors } from '@/theme/mui-theme';

interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
  const muiVariant: 'contained' | 'outlined' | 'text' = variant === 'primary' || variant === 'secondary' || variant === 'danger' ? 'contained' : variant === 'outline' ? 'outlined' : 'text';
  const muiSize: 'small' | 'medium' | 'large' = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium';

  const sx: Record<string, unknown> = {
    borderRadius: 12,
    fontWeight: 600,
    textTransform: 'none',
    transition: 'all 0.2s ease',
    ...(size === 'sm' && { px: 3.5, py: 1.5, fontSize: '0.8125rem' }),
    ...(size === 'md' && { px: 5, py: 2.5, fontSize: '0.9375rem' }),
    ...(size === 'lg' && { px: 7, py: 3.5, fontSize: '1rem' }),
    ...(variant === 'primary' && {
      backgroundColor: zmpColors.primary,
      color: '#FFFFFF',
      '&:hover': { backgroundColor: '#2563EB', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' },
    }),
    ...(variant === 'secondary' && {
      backgroundColor: zmpColors.cta,
      color: '#FFFFFF',
      '&:hover': { backgroundColor: '#EA580C', boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)' },
    }),
    ...(variant === 'outline' && {
      backgroundColor: 'transparent',
      color: zmpColors.primary,
      border: `1.5px solid ${zmpColors.primary}`,
      '&:hover': { backgroundColor: `${zmpColors.primary}08` },
    }),
    ...(variant === 'ghost' && {
      backgroundColor: 'transparent',
      color: zmpColors.text,
      '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
    }),
    ...(variant === 'danger' && {
      backgroundColor: zmpColors.danger,
      color: '#FFFFFF',
      '&:hover': { backgroundColor: '#DC2626', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' },
    }),
  };

  return (
    <MuiButton variant={muiVariant} size={muiSize} sx={sx} {...props}>
      {children}
    </MuiButton>
  );
}
