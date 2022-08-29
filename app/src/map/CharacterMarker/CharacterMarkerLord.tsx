import { styled } from '@mui/material';
import { Character } from '@/types';
import army_schematic_frame from '@/assets/army_schematic_frame.webp';
import { useAppStore } from '@/api/store';
import CharacterTooltip from './CharacterTooltip';
import { getFlag64 } from '@/assets';

const MarkerWrapper = styled('div')`
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(120%) drop-shadow(0 0 8px rgba(0, 0, 0, 0.8));
  }
`;

const ArmyIcon = styled('img')`
  position: absolute;
  transform: 'translateY(-27px)';
  width: 46px;
  height: 54px;
`;

const FlagIcon = styled('img')`
  position: absolute;
  margin-top: 12px;
  width: 32px;
  height: 32px;
`;

const CharacterMarkerLord = (props: { character: Character }) => {
  const factions = useAppStore((state) => state.factions);
  const faction = factions[props.character.faction];
  const image = getFlag64(faction);

  const setSelectedItem = useAppStore((state) => state.setSelectedItem);
  const onClick = () =>
    setSelectedItem({ type: 'character', cqi: props.character.cqi });

  return (
    <CharacterTooltip character={props.character} faction={faction}>
      <MarkerWrapper onClick={onClick}>
        <ArmyIcon src={army_schematic_frame} alt="" />
        <FlagIcon src={image} alt="" />
      </MarkerWrapper>
    </CharacterTooltip>
  );
};

export default CharacterMarkerLord;
