import { styled, Typography } from '@mui/material';
import Tooltip from '@/components/tooltip/Tooltip';
import { Character, Faction } from '@/types';

const TooltipRoot = styled('div')(({ theme }) => ({
  minWidth: 180,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  color: 'rgba(255, 255, 255, 0.75)',
  padding: theme.spacing(1, 2),
}));

type CharacterTooltipProps = {
  character: Character;
  faction: Faction;
  children: React.ReactElement;
};

const CharacterTooltip = (props: CharacterTooltipProps) => {
  return (
    <Tooltip
      component={
        <TooltipComponent character={props.character} faction={props.faction} />
      }
    >
      {props.children}
    </Tooltip>
  );
};

const TooltipComponent = (props: {
  character: Character;
  faction: Faction;
}) => {
  const name = [props.character.forename, props.character.surname]
    .filter((s) => s)
    .join(' ');

  return (
    <TooltipRoot>
      <Typography variant="subtitle1">Character</Typography>
      <Typography variant="body1">
        Name: {name}
      </Typography>
      <Typography variant="body1" gutterBottom>Faction: {props.faction.name}</Typography>

      <Typography variant="body1">
        {props.character.x}, {props.character.y}
      </Typography>
      <Typography variant="body1">{props.character.type}</Typography>
      <Typography variant="body1">{props.character.subtype}</Typography>
    </TooltipRoot>
  );
};

export default CharacterTooltip;
