import React from 'react';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
  textfield: {
    marginTop: '0.5em',
    marginLeft: '1em',
    width: '8em'
  }
});

interface Props extends WithStyles<typeof styles> {
  handleFilterChange: (value: string) => void,
  value: string
}

class SearchField extends React.Component<Props> {

  handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.props.handleFilterChange(event.target.value);
  }

  render() {
    const { classes } = this.props;
    return <TextField
    id="search"
    type="search"
    placeholder="Hae lauluja"
    className={classes.textfield}
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

export default withStyles(styles)(SearchField);
