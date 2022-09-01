import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import CloseButton from '@mui/icons-material/Close';
import { useAppStore } from '@/api/store';

import { killCharacterDialog } from './character/KillCharacter';

const InfoPanelCharacter = (props: { cqi: number }) => {
  const setSelectedItem = useAppStore((state) => state.setSelectedItem);
  const character = useAppStore((state) =>
    state.characters.find((c) => c.cqi === props.cqi)
  );
  const factions = useAppStore((state) => state.factions);
  const owner = useAppStore((state) => state.ownership[character?.faction ?? '']);
  const faction = factions[owner];

  if (!character) {
    setSelectedItem(undefined);
    return null;
  }

  const actions = [
    ['Kill character', () => killCharacterDialog(character)],
  ] as any[];

  return (
    <>
      <Box px={2} py={1} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Character</Typography>
        <IconButton onClick={() => setSelectedItem(undefined)}>
          <CloseButton />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {actions.map(([label, action]) => (
          <ListItem key={label} button onClick={action}>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default InfoPanelCharacter;
