import { useState } from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material';
import NiceModal, { useModal, muiDialog } from '@ebay/nice-modal-react';
import { Region } from '@/types';
import { instantlySetSettlementPrimarySlotLevel } from '@/api/commands/instantly_set_settlement_primary_slot_level';
import BaseDialogTitle from '../BaseDialogTitle';

export function regionSettlementSetLevelDialog(region: Region) {
  NiceModal.show<number>(RegionSettlementSetLevel, { region }).then(
    (level: number) => {
      console.log({ region: region.key, level });
      instantlySetSettlementPrimarySlotLevel({ region: region.key, level });
    }
  );
}

type RegionSettlementSetLevelDialogProps = {
  region: Region;
  level: number;
};

export const RegionSettlementSetLevel =
  NiceModal.create<RegionSettlementSetLevelDialogProps>((props) => {
    const modal = useModal();
    const { open, onClose, onExited } = muiDialog(modal);
    const [level, setLevel] = useState(5);

    const onCancel = () => {
      modal.hide();
    };

    const onConfirm = () => {
      modal.resolve(level);
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
        <BaseDialogTitle title="Set settlement level" onClickClose={onCancel} />
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2" gutterBottom>
              Instantly sets the primary slot level of the supplied settlement.
              The supplied level will be clamped to the maximum level of the
              chain.
            </Typography>
            <Typography variant="overline">{props.region.name}</Typography>
          </DialogContentText>
          <Box py={2}>
            <TextField
              select
              fullWidth
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </TextField>
          </Box>
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
  });
