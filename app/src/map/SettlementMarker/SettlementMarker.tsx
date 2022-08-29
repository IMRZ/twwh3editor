import { useEffect, useState, memo } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { styled } from '@mui/material';
import { Region } from '@/types';
import styles from './SettlementMarker.module.css';
import city_schem_frame_major from '@/assets/city_schem_frame_major.webp';
import { useAppStore } from '@/api/store';
import SettlementTooltip from './SettlementTooltip';
import { getFlagRotated } from '@/assets';

type SettlementMarkerProps = {
  layer: L.LayerGroup;
  region: Region;
};

const SettlementMarker = (props: SettlementMarkerProps) => {
  const [element] = useState(() => {
    const element = document.createElement('div');
    element.className = styles.container;
    return element;
  });

  const { x, y } = props.region.settlement;
  const toImagePos = useAppStore((state) => state.toImagePos);
  const position = toImagePos([y, x]);

  const [marker] = useState(() => {
    const marker = L.marker(position, {
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
  }, []);

  return ReactDOM.createPortal(<Marker region={props.region} />, element);
};

export default memo(SettlementMarker, (prevProps: any, nextProps: any) => {
  return (
    prevProps.region.x === nextProps.region.x &&
    prevProps.region.y === nextProps.region.y
  );
});

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

const SettlementIcon = styled('img')`
  position: absolute;
  width: 72px;
  height: 58px;
`;

const FlagIcon = styled('img')`
  position: absolute;
  width: 112px;
  height: 90px;
  transform: scale(0.75);
`;

const Marker = (props: { region: Region }) => {
  const region = props.region.key;
  const factions = useAppStore((state) => state.factions);
  const owner = useAppStore((state) => state.ownership[region]);
  const faction = factions[owner];
  const image = getFlagRotated(faction);

  const setSelectedItem = useAppStore((state) => state.setSelectedItem);
  const onClick = () =>
    setSelectedItem({ type: 'settlement', cqi: props.region.cqi });

  return (
    <SettlementTooltip region={props.region} faction={faction}>
      <MarkerWrapper onClick={onClick}>
        <SettlementIcon src={city_schem_frame_major} alt="" />
        <FlagIcon src={image} alt="" />
      </MarkerWrapper>
    </SettlementTooltip>
  );
};
