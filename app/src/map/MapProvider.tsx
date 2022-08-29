import { useRef, useContext, createContext } from 'react';
import L from 'leaflet';

export interface MapState {
  map: L.Map;
  bounds: L.LatLngBoundsExpression;
}

const MapContext = createContext<MapState | undefined>(undefined);

type MapProviderProps = {
  children?: React.ReactNode;
  map: L.Map;
  bounds: L.LatLngBoundsExpression;
};

const MapProvider = (props: MapProviderProps) => {
  const state = useRef({
    map: props.map,
    bounds: props.bounds,
  }).current;

  return (
    <MapContext.Provider value={state}>
      {props.children}
    </MapContext.Provider>
  );
};

export function useMap() {
  const state = useContext(MapContext);

  if (state === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }

  return state;
}

export default MapProvider;
