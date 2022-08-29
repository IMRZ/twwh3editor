import { useAppStore } from '@/api/store';
import InfoPanelSettlement from './InfoPanelSettlement';
import InfoPanelCharacter from './InfoPanelCharacter';

const InfoPanel = () => {
  const selectedItem = useAppStore((state) => state.selectedItem);

  if (!selectedItem) {
    return null;
  }

  switch (selectedItem.type) {
    case 'settlement':
      return <InfoPanelSettlement cqi={selectedItem.cqi} />;
    case 'character':
      return <InfoPanelCharacter cqi={selectedItem.cqi} />
    default:
      return null;
  }
};

export default InfoPanel;
