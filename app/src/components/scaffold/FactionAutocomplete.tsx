import {
  Autocomplete,
  TextField,
  Typography,
} from '@mui/material';
import { Faction } from '@/types';

type FactionAutocompleteProps = {
  value: Faction | null;
  onChange?: (faction: Faction) => void;
  options: Faction[];
  label: string;
  placeholder?: string;
  disableClearable?: boolean;
};

const FactionAutocomplete = (props: FactionAutocompleteProps) => {
  return (
    <Autocomplete
      fullWidth
      value={props.value}
      options={props.options}
      disableClearable={props.disableClearable}
      onChange={(e, newValue) => {
        if (newValue) {
          props.onChange?.(newValue);
        }
      }}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => {
        return option.key === value.key;
      }}
      renderOption={(optionProps, option) => (
        <li {...optionProps} key={option.key}>
          <Typography noWrap>{option.name}</Typography>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          size="small"
          variant="outlined"
          placeholder={props.placeholder}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
};

export default FactionAutocomplete;
