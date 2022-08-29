import { useEffect, useState, memo, useRef } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { Character } from '@/types';
import { teleport } from '@/api/commands/teleport';
import styles from './CharacterMarker.module.css';
import CharacterMarkerLord from './CharacterMarkerLord';
import CharacterMarkerHero from './CharacterMarkerHero';
import { useAppStore } from '@/api/store';

type MapMarkerProps = {
  layer: L.LayerGroup;
  character: Character;
};

const CharacterMarker = (props: MapMarkerProps) => {
  const toImagePos = useAppStore((state) => state.toImagePos);
  const toGamePos = useAppStore((state) => state.toGamePos);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [element] = useState(() => {
    const element = document.createElement('div');
    element.className = styles.container;
    return element;
  });

  const [marker] = useState(() => {
    const { x, y } = props.character;
    const position = toImagePos([y, x]);

    const marker = L.marker(position, {
      zIndexOffset: 50,
      draggable: true,
      icon: L.divIcon({
        className: styles.icon,
        html: element,
      }),
      // @ts-ignore
      virtual: true,
    });

    return marker;
  });

  useEffect(() => {
    props.layer.addLayer(marker);

    return () => {
      props.layer.removeLayer(marker);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const { x, y } = props.character;
    const position = toImagePos([y, x]);
    marker.setLatLng(position);
  }, [props.character]);

  useEffect(() => {
    const { x, y } = props.character;
    const position = toImagePos([y, x]);

    marker.on('dragend', () => {
      const cqi = props.character.cqi;
      const { lat, lng } = marker.getLatLng();
      const [y, x] = toGamePos([Math.round(lat), Math.round(lng)]);

      teleport({ cqi, x, y })
        .then(() => {
          timeoutRef.current = setTimeout(() => {
            marker.setLatLng(position);
          }, 2000);
        })
        .catch(() => {
          marker.setLatLng(position);
        });
    });

    return () => {
      clearTimeout(timeoutRef.current);
      marker.off('dragend');
    };
  }, [props.character]);

  console.log('##')

  const component =
    props.character.type === 'general' ? (
      <CharacterMarkerLord character={props.character} />
    ) : (
      <CharacterMarkerHero character={props.character} />
    );

  return ReactDOM.createPortal(component, element);
};

export default memo(CharacterMarker, (prevProps, nextProps) => {
  return (
    prevProps.character.x === nextProps.character.x &&
    prevProps.character.y === nextProps.character.y &&
    prevProps.character.faction === nextProps.character.faction
  );
});
