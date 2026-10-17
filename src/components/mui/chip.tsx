'use client';

import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledChip = styled(MuiChip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 500,
  fontSize: '0.8125rem',
}));

export function Chip(props: MuiChipProps) {
  return <StyledChip {...props} />;
}
