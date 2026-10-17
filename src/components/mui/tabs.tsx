'use client';

import { Tabs as MuiTabs, Tab as MuiTab, TabsProps as MuiTabsProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.9375rem',
    minHeight: 48,
  },
  '& .Mui-selected': {
    color: theme.palette.primary.main,
  },
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '3px 3px 0 0',
  },
}));

export function Tabs(props: MuiTabsProps) {
  return <StyledTabs {...props} />;
}

export { MuiTab as Tab };
