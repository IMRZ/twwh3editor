import { styled, AppBar, Divider, Toolbar, Typography, Box } from '@mui/material';
import CursorPosition from '@/layout/CursorPosition';
import SideDrawer from './SideDrawer';
import { useAppStore } from '@/api/store';

import GlobalActionButton from './GlobalActionButton';

const Root = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled('main')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Scaffold = (props: any) => {
  const info = useAppStore((state) => ({ campaign: state.campaign, faction: state.faction }));

  return (
    <Root>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography>{info.campaign}</Typography>
            <Typography>{info.faction}</Typography>
          </Box>
          <CursorPosition />
        </Toolbar>
        <Divider />
      </AppBar>
      <Toolbar />
      <Main>
        {props.children}
        <GlobalActionButton />
      </Main>
      <SideDrawer />
    </Root>
  );
};

export default Scaffold;
