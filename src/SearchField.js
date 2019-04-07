import React from 'react';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

const searchFieldStyle = {
  marginLeft: "1em"
};

const SearchField = () =>
  <TextField
    id="search"
    type="search"
    placeholder="Hae kappaleita"
    style={searchFieldStyle}
    InputProps={{
      disableUnderline: true,
      startAdornment: (
        <Icon>search</Icon>
      ),
    }}
    />;

export default SearchField;
