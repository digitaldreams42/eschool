'use client';

import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(MuiBadge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    fontWeight: 600,
    fontSize: '0.75rem',
  },
}));

export function Badge(props: MuiBadgeProps) {
  return <StyledBadge {...props} />;
}
