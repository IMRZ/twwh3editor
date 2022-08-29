import { styled, SpeedDial, SpeedDialAction } from '@mui/material';
import { useAppStore } from '@/api/store';

import { manageShroud } from './global/ManageShroud';
import { manageDiplomacy } from './global/ManageDiplomacy';

import LanguageIcon from '@mui/icons-material/Language';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlagIcon from '@mui/icons-material/Flag';

const GlobalSpeedDial = styled(SpeedDial, {
  shouldForwardProp: (prop) => prop !== 'shift',
})<{ shift: boolean }>(({ theme, shift }) => ({
  zIndex: 1000,
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  marginRight: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...(shift && {
    marginRight: 320,
  }),
}));

const GlobalActionButton = () => {
  const selectedItem = useAppStore((state) => state.selectedItem);

  const actions = [
    { icon: <VisibilityIcon />, name: 'Shroud', onClick: manageShroud },
    { icon: <FlagIcon />, name: 'Diplomacy', onClick: manageDiplomacy },
  ];

  return (
    <GlobalSpeedDial
      ariaLabel="Global actions"
      icon={<LanguageIcon />}
      shift={!!selectedItem}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </GlobalSpeedDial>
  );
};

export default GlobalActionButton;
