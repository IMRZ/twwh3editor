import { useState } from 'react';
import NiceModal, { useModal, muiDialog } from '@ebay/nice-modal-react';
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import { useAppStore } from '@/api/store';
import BaseDialogTitle from '../BaseDialogTitle';
import FactionAutocomplete from '../FactionAutocomplete';
import * as actions from '@/api/commands/diplomacy';
import { Faction } from '@/types';

export function manageDiplomacy() {
  NiceModal.show(ManageDiplomacyModal);
}

const ManageDiplomacyModal = NiceModal.create(() => {
  const modal = useModal();
  const { open, onClose, onExited } = muiDialog(modal);

  const playerFaction = useAppStore((state) => state.faction);
  const factions = useAppStore((state) => state.factions);
  const [options] = useState(() => {
    return Object.values(factions).sort((a, b) => a.name.localeCompare(b.name));
  });
  const [index, setIndex] = useState(0);
  const [factionA, setFactionA] = useState(
    () => options.find((f) => f.key === playerFaction) ?? options[0]
  );
  const [factionB, setFactionB] = useState(() => options[0]);

  const onCancel = () => {
    modal.hide();
  };

  const onSubmit = () => {
    diplomacyOptions[index]?.action(factionA, factionB);
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={onClose}
      TransitionProps={{ onExited }}
    >
      <BaseDialogTitle title="Diplomacy" onClickClose={onCancel} />
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            pt: 1,
          }}
        >
          <TextField
            label="Action"
            size="small"
            fullWidth
            select
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
            helperText={diplomacyOptions[index].description}
          >
            {diplomacyOptions.map((entry, index) => (
              <MenuItem key={index} value={index}>
                {entry.label}
              </MenuItem>
            ))}
          </TextField>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <FactionAutocomplete
              label="Proposing faction"
              value={factionA}
              options={options}
              onChange={(f) => setFactionA(f)}
              disableClearable
            />
            <FactionAutocomplete
              label="Target faction"
              value={factionB}
              options={options}
              onChange={(f) => setFactionB(f)}
              disableClearable
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Close
        </Button>
        <Button onClick={onSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
});

const diplomacyOptions = [
  {
    label: 'Force declare war',
    description: 'Forces one faction to declare war on another.',
    action: (a: Faction, b: Faction) => actions.forceDeclareWar({ a, b }),
  },
  {
    label: 'Force make vassal',
    description: 'Force one faction to vassalise another faction.',
    action: (a: Faction, b: Faction) => actions.forceMakeVassal({ a, b }),
  },
  {
    label: 'Force defensive alliance',
    description: 'Force two factions to become defensive allies.',
    action: (a: Faction, b: Faction) => actions.forceAlliance({ a, b, isMilitaryAlliance: false }),
  },
  {
    label: 'Force military alliance',
    description: 'Force two factions to become military allies.',
    action: (a: Faction, b: Faction) => actions.forceAlliance({ a, b, isMilitaryAlliance: true }),
  },
  {
    label: 'Force grant military access',
    description:
      'Force one faction to grant another faction military access to its territory.',
      action: (a: Faction, b: Faction) => actions.forceGrantMilitaryAccess({ a, b }),
  },
  {
    label: 'Force make peace',
    description: 'Forces peace between two warring factions.',
    action: (a: Faction, b: Faction) => actions.forceMakePeace({ a, b }),
  },
  {
    label: 'Force confederation',
    description:
      'Forces a proposing faction to subsume a target faction into its confederation.',
      action: (a: Faction, b: Faction) => actions.forceConfederation({ a, b }),
  },
  {
    label: 'Force make trade agreement',
    description:
      'Forces a trade agreement between two specified factions. If no agreement is possible then nothing will happen.',
      action: (a: Faction, b: Faction) => actions.forceMakeTradeAgreement({ a, b }),
  },
  {
    label: 'Make diplomacy available',
    description:
      'Makes diplomacy available between two factions, as if they had discovered each other on the campaign map.',
      action: (a: Faction, b: Faction) => actions.makeDiplomacyAvailable({ a, b }),
  },
  {
    label: 'Faction offers peace to other faction',
    description:
      "Compels one faction to offer peace to another faction that it's at war with. The target faction may decline.",
      action: (a: Faction, b: Faction) => actions.factionOffersPeaceToOtherFaction({ a, b }),
  },
];
