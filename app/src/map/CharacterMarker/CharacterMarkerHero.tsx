import { styled } from '@mui/material';
import { Character } from '@/types';
import { useAppStore } from '@/api/store';
import CharacterTooltip from './CharacterTooltip';
import { getFlag64 } from '@/assets';

const FlagIcon = styled('img')`
  flex-shrink: 0;
  width: 24px;
  height: 24px;

  &:hover {
    filter: brightness(120%) drop-shadow(0 0 8px rgba(0, 0, 0, 0.8));
  }
`;

const CharacterMarkerHero = (props: { character: Character }) => {
  const factions = useAppStore((state) => state.factions);
  const faction = factions[props.character.faction];
  const image = getFlag64(faction);

  const setSelectedItem = useAppStore((state) => state.setSelectedItem);
  const onClick = () =>
    setSelectedItem({ type: 'character', cqi: props.character.cqi });

  return (
    <CharacterTooltip character={props.character} faction={faction}>
      <FlagIcon onClick={onClick} src={image} alt="" />
    </CharacterTooltip>
  );
};

export default CharacterMarkerHero;
