import NiceModal, { useModal, muiDialog } from '@ebay/nice-modal-react';
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import BaseDialogTitle from '../BaseDialogTitle';
import {
  showShroud,
  takeShroudSnapshot,
  restoreShroudFromSnapshot,
} from '@/api/commands/shroud';

export function manageShroud() {
  NiceModal.show(ManageShroudModal);
}

const ManageShroudModal = NiceModal.create(() => {
  const modal = useModal();
  const { open, onClose, onExited } = muiDialog(modal);

  const onCancel = () => {
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
      <BaseDialogTitle title="Shroud" onClickClose={onCancel} />
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2" gutterBottom>
            The shroud is the fog of war covering areas on the campaign map that
            have yet to be seen.
          </Typography>
          <Typography variant="body2" gutterBottom>
            The following functions allow some manipulation of the shroud. In
            all cases, the shroud is recalculated during the end-turn sequence,
            so modifications to the shroud are lost and have to re-applied at
            the start of the round or player's turn.
          </Typography>
        </DialogContentText>
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'row',
            gap: theme.spacing(2),
            pt: theme.spacing(2),
          })}
        >
          <Button variant="outlined" fullWidth onClick={() => showShroud(true)}>
            Enable shroud
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => showShroud(false)}
          >
            Disable shroud
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => takeShroudSnapshot()}
          >
            Take shroud snapshot
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => restoreShroudFromSnapshot()}
          >
            Restore shroud from snapshot
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
});
