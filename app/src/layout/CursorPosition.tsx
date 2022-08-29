import { Typography } from '@mui/material';
import { useAppStore } from '@/api/store';

const CursorPosition = () => {
  const [y, x] = useAppStore((state) => state.cursorPosition);
  return (
    <div>
      <Typography>cursor (x,y)</Typography>
      <Typography>{x}, {y}</Typography>
    </div>
  );
};

export default CursorPosition;
