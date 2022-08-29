import { useState, useEffect } from 'react';
import L from 'leaflet';
import { useMap } from '@/map/MapProvider';
import { useAppStore } from '@/api/store';
import CharacterMarker from './CharacterMarker';

const CharacterLayer = () => {
  const context = useMap();
  const [layer] = useState<L.LayerGroup>(() => L.layerGroup([]));
  const characters = useAppStore((state) => state.characters);

  useEffect(() => {
    const { map } = context;
    map.addLayer(layer);
    return () => {
      map.removeLayer(layer);
    };
  }, []);

  return (
    <>
      {characters.map((character) => (
        <CharacterMarker
          layer={layer}
          key={character.cqi}
          character={character}
        />
      ))}
    </>
  );
};

export default CharacterLayer;
