import NiceModal, { useModal, muiDialog } from '@ebay/nice-modal-react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type BaseDialogProps = {};

const BaseDialog = NiceModal.create<BaseDialogProps>((props) => {
  const modal = useModal();
  const { open, onClose, onExited } = muiDialog(modal);

  const onCancel = () => {
    modal.hide();
  };

  const onConfirm = () => {
    modal.resolve();
    modal.hide();
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={onClose}
      TransitionProps={{ onExited }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          BaseDialog
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default BaseDialog;
