import { useEffect } from 'react';
import { useAppStore } from '../api/store';
import { CircularProgress } from '@mui/material';
import TooltipContainer from '@/components/tooltip/TooltipContainer';
import Scaffold from '@/components/scaffold/Scaffold';
import Map from '@/map/Map';

import '@/api/listeners';

const Layout = () => {
  const session = useAppStore((state) => state.session);
  const campaign = useAppStore((state) => state.campaign);
  const init = useAppStore((state) => state.init);

  useEffect(() => {
    if (!campaign) {
      const intervalId = setInterval(
        () => {
          init().then((r) => {
            if (r?.campaign) {
              clearInterval(intervalId);
            }
          });
        },
        3000,
        500
      );

      return () => clearInterval(intervalId);
    }
  }, [session]);

  if (!campaign) {
    return <CircularProgress />;
  }

  return (
    <Scaffold>
      <Map campaign={campaign} />
      <TooltipContainer />
    </Scaffold>
  );
};

export default Layout;
