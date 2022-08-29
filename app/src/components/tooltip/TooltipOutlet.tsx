import React, { useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { styled } from '@mui/material';

const TooltipWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  pointerEvents: 'none',
  top: 0,
  left: 0,
  zIndex: 3000,

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const cusorOffset = 16;
const edgeMargin = cusorOffset * 2;

type TooltipOutletProps = {
  initialEvent: MouseEvent;
  component: React.ReactElement;
};

const TooltipOutlet = (props: TooltipOutletProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current!;
    let needRaf = true;

    const updateTooltipPosition = ({ x, y }: MouseEvent) => {
      needRaf = true;

      const newX =
        x + el.offsetWidth + edgeMargin >= window.innerWidth
          ? x - cusorOffset - el.offsetWidth
          : x + cusorOffset;

      const newY =
        y + el.offsetHeight + edgeMargin >= window.innerHeight
          ? y - cusorOffset - el.offsetHeight
          : y + cusorOffset;

      el.style.transform = `translate(${newX}px, ${newY}px)`;
    };

    const updateTooltip = (e: MouseEvent) => {
      if (needRaf) {
        needRaf = false;
        requestAnimationFrame(() => updateTooltipPosition(e));
      }
    };

    updateTooltip(props.initialEvent);

    document.addEventListener('mousemove', updateTooltip);
    return () => {
      document.removeEventListener('mousemove', updateTooltip);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ReactDOM.createPortal(
    <TooltipWrapper ref={ref}>{props.component}</TooltipWrapper>,
    document.getElementById('tooltip') ?? document.body,
    'tooltip',
  );
};

export default TooltipOutlet;
