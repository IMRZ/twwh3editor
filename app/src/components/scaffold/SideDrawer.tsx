import { Drawer, Toolbar } from '@mui/material';
import { useAppStore } from '@/api/store';
import InfoPanel from './InfoPanel';

const SideDrawer = () => {
  const selectedItem = useAppStore((state) => state.selectedItem);

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={!!selectedItem}
      sx={{
        width: 320,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 320,
          boxSizing: 'border-box',
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Toolbar />
      <InfoPanel />
    </Drawer>
  );
};

export default SideDrawer;
