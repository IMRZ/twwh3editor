import { useState } from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import NiceModal, { useModal, muiDialog } from '@ebay/nice-modal-react';
import { Region } from '@/types';
import { useAppStore } from '@/api/store';
import BaseDialogTitle from '../BaseDialogTitle';
import FactionAutocomplete from '../FactionAutocomplete';
import { transferRegion } from '@/api/commands/transfer_region';

export function regionTransferDialog(region: Region) {
  NiceModal.show<string>(RegionTransferModal, { region }).then(
    (faction: string) => {
      transferRegion({ region: region.key, faction });
    }
  );
}

type RegionTransferDialogProps = {
  region: Region;
};

export const RegionTransferModal = NiceModal.create<RegionTransferDialogProps>(
  (props) => {
    const modal = useModal();
    const { open, onClose, onExited } = muiDialog(modal);

    const playerFaction = useAppStore((state) => state.faction);
    const factions = useAppStore((state) => state.factions);
    const [options] = useState(() => {
      return Object.values(factions).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
    const [value, setValue] = useState(
      () => options.find((f) => f.key === playerFaction) ?? options[0]
    );

    const onCancel = () => {
      modal.hide();
    };

    const onConfirm = () => {
      modal.resolve(value.key);
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
        <BaseDialogTitle title="Transfer region" onClickClose={onCancel} />
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2" gutterBottom>
              Immediately transfers ownership of the specified region to the
              specified faction.
            </Typography>
            <Typography variant="body2" gutterBottom>
              Also heals the garrison army in the specified region back to full
              health.
            </Typography>
            <Typography variant="overline">{props.region.name}</Typography>
          </DialogContentText>
          <Box py={2}>
            <FactionAutocomplete
              label="Faction"
              value={value}
              options={options}
              onChange={(f) => setValue(f)}
              disableClearable
            />
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
  }
);
