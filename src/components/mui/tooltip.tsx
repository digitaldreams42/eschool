'use client';

import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTooltip = styled(MuiTooltip)(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.text.primary,
    fontSize: '0.8125rem',
    fontWeight: 500,
    borderRadius: 8,
    padding: '6px 12px',
  },
}));

export function Tooltip(props: MuiTooltipProps) {
  return <StyledTooltip {...props} />;
}
