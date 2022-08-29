import { styled } from '@mui/material';

const ScrollArea = styled('div')(({ theme }) => ({
  height: '100%',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  '&::-webkit-scrollbar-thumb:vertical': {
    width: '6px',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
}));

export default ScrollArea;
