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

import { regionAbandonDialog } from './region/RegionAbandon';
import { regionTransferDialog } from './region/RegionTransfer';

const InfoPanelSettlement = (props: { cqi: number }) => {
  const setSelectedItem = useAppStore((state) => state.setSelectedItem);
  const region = useAppStore((state) =>
    state.regions.find((r) => r.cqi === props.cqi)
  );
  const factions = useAppStore((state) => state.factions);
  const owner = useAppStore((state) => state.ownership[region?.key ?? '']);
  const faction = factions[owner];

  if (!region) {
    setSelectedItem(undefined);
    return null;
  }

  const fields = [
    ['Name', `${region.name}, ${region.province.name}`],
    ['Faction', faction ? faction.name : '--'],
    ['Region key', region.key],
    [
      'Logical position settlement (x, y)',
      `${region.settlement.x}, ${region.settlement.y}`,
    ],
    ['CQI', region.cqi],
  ];

  const actions = [
    ['Transfer region', () => regionTransferDialog(region)],
    ['Abandon region', () => regionAbandonDialog(region)],
  ] as any[];

  return (
    <>
      <Box px={2} py={1} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Settlement</Typography>
        <IconButton onClick={() => setSelectedItem(undefined)}>
          <CloseButton />
        </IconButton>
      </Box>
      <List dense>
        {fields.map(([label, value]) => (
          <ListItem key={label}>
            <ListItemText primary={label} secondary={value} />
          </ListItem>
        ))}
      </List>
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

export default InfoPanelSettlement;
