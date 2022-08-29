import NiceModal, { useModal, muiDialog } from '@ebay/nice-modal-react';
import { setRegionAbandoned } from '@/api/commands/set_region_abandoned';
import { Region } from '@/types';
import ConfirmationDialog from '../ConfirmationDialog';

export function regionAbandonDialog(region: Region) {
  NiceModal.show<void>(RegionAbandonModal, { region }).then(() => {
    setRegionAbandoned({ region: region.key });
  });
}

// Immediately sets the specified to be abandoned. Nothing will happen if an already-abandoned region is specified.
const RegionAbandonModal = NiceModal.create(() => {
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
    <ConfirmationDialog
      open={open}
      onClose={onClose}
      TransitionProps={{ onExited }}
      title="Abandon region"
      description="Are you sure you want to abandon this region?"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
});
