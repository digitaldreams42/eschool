'use client';

import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: theme.palette.background.paper,
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
}));

export function TextField(props: MuiTextFieldProps) {
  return <StyledTextField {...props} />;
}
