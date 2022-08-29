import MapContainer from './MapContainer';
import MapImageLayer from './MapImageLayer';

import SettlementLayer from './SettlementLayer';
import CharacterLayer from './CharacterLayer';

// marker mixin
import './marker';

import { maps } from '@/data';

const Map = (props: any) => {
  // @ts-ignore
  const map = maps[props.campaign];

  return (
    <MapContainer bounds={[[0, 0], [map.image.height, map.image.width]]}>
      <MapImageLayer image={map.path} />
      <SettlementLayer />
      <CharacterLayer />
    </MapContainer>
  );
};

export default Map;
