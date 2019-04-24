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

const SearchField = (props:Props) => {

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
    props.handleFilterChange(event.target.value);
  }

  const { classes } = props;
  return <TextField
  id="search"
  type="search"
  placeholder="Hae lauluja"
  className={classes.textfield}
  onChange={handleChange}
  value={props.value}
  InputProps={{
    disableUnderline: true,
    startAdornment: (
      <Icon>search</Icon>
    ),
  }}
  />;

}

export default withStyles(styles)(SearchField);
