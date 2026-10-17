'use client';

import { Dialog as MuiDialog, DialogProps as MuiDialogProps, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    padding: theme.spacing(2),
  },
}));

interface DialogProps extends Omit<MuiDialogProps, 'onClose'> {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function Dialog({ onClose, title, children, actions, ...props }: DialogProps) {
  return (
    <StyledDialog onClose={onClose} {...props}>
      {title && (
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {title}
          <IconButton onClick={onClose} size="small" sx={{ mr: -1 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions sx={{ px: 3, pb: 2 }}>{actions}</DialogActions>}
    </StyledDialog>
  );
}
