import React, { useCallback, useState } from 'react';
import TooltipOutlet from './TooltipOutlet';

type TooltipProps = {
  children: React.ReactElement;
  component: React.ReactElement;
};

const Tooltip = (props: TooltipProps) => {
  const child = React.Children.only(props.children);
  const [initialEvent, setInitialEvent] = useState<React.MouseEvent>();

  const onMouseEnter = useCallback((e: React.MouseEvent) => {
    setInitialEvent(e);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onMouseLeave = useCallback(() => {
    setInitialEvent(undefined);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {initialEvent && (
        <TooltipOutlet
          component={props.component}
          initialEvent={initialEvent.nativeEvent}
        />
      )}
      {React.cloneElement(child, {
        onMouseEnter,
        onMouseLeave,
      })}
    </>
  );
};

export default Tooltip;
