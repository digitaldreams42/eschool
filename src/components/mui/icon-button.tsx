'use client';

import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledIconButton = styled(MuiIconButton)(({ theme }) => ({
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.08)',
    transform: 'scale(1.05)',
  },
}));

export function IconButton(props: MuiIconButtonProps) {
  return <StyledIconButton {...props} />;
}
