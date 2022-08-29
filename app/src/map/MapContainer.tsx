import { useState, useCallback } from 'react';
import { styled } from '@mui/material';
import MapProvider from './MapProvider';
import { useAppStore } from '@/api/store';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapRoot = styled('div')`
  flex: 1;
  display: flex;
  background-color: rgba(255, 255, 255, 0.12);

  & *:focus {
    outline: none;
  }
`;

type MapContainerProps = {
  bounds: L.LatLngBoundsLiteral;
  children: React.ReactNode;
};

const MapContainer = (props: MapContainerProps) => {
  const [map, setMap] = useState<L.Map>();
  const setCursorPosition = useAppStore((state) => state.setCursorPosition);
  const toGamePos = useAppStore((state) => state.toGamePos);

  const mapEl = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      const map = L.map(el, {
        crs: L.CRS.Simple,
        maxBounds: L.latLngBounds(props.bounds).pad(0.1),
        zoomControl: false,
        attributionControl: false,
        doubleClickZoom: false,
        minZoom: -2,
        maxZoom: 1,
      });

      map.fitBounds(props.bounds);

      map.on('mousemove', (e) => {
        const { lat, lng } = e.latlng;
        const cursorPosition = toGamePos([lat, lng]);
        setCursorPosition(cursorPosition);
      });

      setMap(map);
    } else {
      map?.off();
      map?.remove();
      setMap(undefined);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MapRoot ref={mapEl}>
      {map && (
        <MapProvider map={map} bounds={props.bounds}>
          {props.children}
        </MapProvider>
      )}
    </MapRoot>
  );
};

export default MapContainer;
