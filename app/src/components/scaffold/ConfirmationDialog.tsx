import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
} from '@mui/material';
import BaseDialogTitle from './BaseDialogTitle';

type ConfirmationDialogProps = DialogProps & {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  description,
  onCancel,
  onConfirm,
  ...props
}) => (
  <Dialog {...props}>
    <BaseDialogTitle title={title} onClickClose={onCancel} />
    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog;
