import { useEffect, useState } from 'react';
import L from 'leaflet';
import { useMap } from './MapProvider';

type MapImageLayerProps = {
  image: string;
};

const MapImageLayer = (props: MapImageLayerProps) => {
  const context = useMap();

  const [layer] = useState(() => {
    const { bounds } = context;
    return L.imageOverlay(props.image, bounds);
  });

  useEffect(() => {
    const { map } = context;
    map.addLayer(layer);
    return () => {
      map.removeLayer(layer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default MapImageLayer;
