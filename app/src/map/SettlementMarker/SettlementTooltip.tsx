import { styled, Typography } from '@mui/material';
import Tooltip from '@/components/tooltip/Tooltip';
import { Region, Faction } from '@/types';

const TooltipRoot = styled('div')(({ theme }) => ({
  minWidth: 180,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  color: 'rgba(255, 255, 255, 0.75)',
  padding: theme.spacing(1, 2),
}));

type SettlementTooltipProps = {
  region: Region;
  faction: Faction;
  children: React.ReactElement;
};

const SettlementTooltip = (props: SettlementTooltipProps) => {
  return (
    <Tooltip
      component={
        <TooltipComponent region={props.region} faction={props.faction} />
      }
    >
      {props.children}
    </Tooltip>
  );
};

const TooltipComponent = (props: { region: Region; faction: Faction }) => {
  return (
    <TooltipRoot>
      <Typography variant="subtitle1">Settlement</Typography>
      <Typography variant="body1">Region: {props.region.name}</Typography>
      <Typography variant="body1">
        Province: {props.region.province.name}
      </Typography>
      {props.faction && (
        <Typography variant="body1">Owner: {props.faction.name}</Typography>
      )}
    </TooltipRoot>
  );
};

export default SettlementTooltip;
