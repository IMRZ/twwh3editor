import { styled } from '@mui/material';

const TooltipRoot = styled('div')(() => ({
  zIndex: 3000,
  transition: 'opacity 0.2s',
  opacity: 0,

  '&:not(:empty)': {
    opacity: 1,
  },
}));

const TooltipContainer = () => {
  return <TooltipRoot id="tooltip" />;
};

export default TooltipContainer;
