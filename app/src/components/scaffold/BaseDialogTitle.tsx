import { Box, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type BaseDialogTitleProps = {
  title: string;
  onClickClose: () => void;
};

const BaseDialogTitle = (props: BaseDialogTitleProps) => {
  return (
    <DialogTitle>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {props.title}
        <IconButton onClick={props.onClickClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </DialogTitle>
  );
};

export default BaseDialogTitle;
