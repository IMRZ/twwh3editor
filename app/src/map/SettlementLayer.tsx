import { useState, useEffect } from 'react';
import L from 'leaflet';
import { useAppStore } from '@/api/store';
import { useMap } from './MapProvider';
import SettlementMarker from './SettlementMarker';

const SettlementLayer = () => {
  const context = useMap();
  const [layer] = useState<L.LayerGroup>(() => L.layerGroup([]));
  const regions = useAppStore((state) => state.regions);

  useEffect(() => {
    const { map } = context;
    map.addLayer(layer);
    return () => {
      map.removeLayer(layer);
    };
  }, []);

  return (
    <>
      {regions.map((region) => (
        <SettlementMarker
          layer={layer}
          key={region.cqi}
          region={region}
        />
      ))}
    </>
  );
};

export default SettlementLayer;
