'use client';

import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAvatar = styled(MuiAvatar)(({ theme }) => ({
  fontWeight: 600,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export function Avatar({ src, alt, children, ...props }: MuiAvatarProps) {
  return (
    <StyledAvatar src={src} alt={alt} {...props}>
      {children}
    </StyledAvatar>
  );
}
