import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import NiceModal, { useModal, muiDialog } from '@ebay/nice-modal-react';
import { Character } from '@/types';
import BaseDialogTitle from '../BaseDialogTitle';
import {
  killCharacter,
  KillCharacterArgs,
} from '@/api/commands/kill_character';

export function killCharacterDialog(character: Character) {
  NiceModal.show<KillCharacterArgs>(KillCharacterModal, { character }).then(
    (result) => {
      killCharacter(result);
    }
  );
}

type KillCharacterDialogProps = {
  character: Character;
};

export const KillCharacterModal = NiceModal.create<KillCharacterDialogProps>(
  (props) => {
    const modal = useModal();
    const { open, onClose, onExited } = muiDialog(modal);

    const name = [props.character.forename, props.character.surname]
      .filter((s) => s)
      .join(' ');

    const onCancel = () => {
      modal.hide();
    };

    const onConfirm = () => {
      modal.resolve({
        cqi: props.character.cqi,
        destroyForce: true,
      });
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
        <BaseDialogTitle title="Kill character" onClickClose={onCancel} />
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2" gutterBottom>
              Kills the specified character, and also the entire military force
              they command.
            </Typography>
            <Typography variant="overline">{name}</Typography>
          </DialogContentText>
        </DialogContent>
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
  }
);
