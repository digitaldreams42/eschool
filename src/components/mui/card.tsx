'use client';

import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    transform: 'translateY(-2px)',
  },
}));

export function Card({ children, ...props }: MuiCardProps) {
  return <StyledCard {...props}>{children}</StyledCard>;
}
