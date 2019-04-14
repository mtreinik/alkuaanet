import React from 'react';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

const searchFieldStyle = {
  marginTop: '0.5em',
  marginLeft: '1em',
  width: '8em'
};

type Props = {
  handleFilterChange: (value: string) => void,
  value: string
}

class SearchField extends React.Component<Props> {

  handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.props.handleFilterChange(event.target.value);
  }

  render() {
    return <TextField
    id="search"
    type="search"
    placeholder="Hae lauluja"
    style={searchFieldStyle}
    onChange={this.handleChange}
    value={this.props.value}
    InputProps={{
      disableUnderline: true,
      startAdornment: (
        <Icon>search</Icon>
      ),
    }}
    />;
  }
}

export default SearchField;
