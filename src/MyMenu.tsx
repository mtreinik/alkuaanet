import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Link }  from 'react-router-dom';

interface Props {
  playlist: number[]
}

interface State {
  anchorEl: HTMLElement | null
}

class Logo extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render () {
    const newSongPagePath = '/uusi/' + this.props.playlist.join(',');
    const aboutPagePath = '/tietoja/' + this.props.playlist.join(',');
    return <div>
      <IconButton
        aria-owns={ this.state.anchorEl ? 'simple-menu' : undefined }
        onClick={this.handleClickOpen}>
        <Icon>menu</Icon>
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={this.state.anchorEl}
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}>
        <MenuItem
          onClick={this.handleClose}
          component={
            ({innerRef,...props}) => <Link {...props} to={newSongPagePath} />
          }>
          <ListItemIcon>
            <Icon>add</Icon>
          </ListItemIcon>
          <ListItemText>Ehdota uutta laulua</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={this.handleClose}
          component={
            ({innerRef,...props}) => <Link {...props} to={aboutPagePath} />
          }>
          <ListItemIcon>
          <Icon>help</Icon>
          </ListItemIcon>
          <ListItemText>Tietoja sovelluksesta</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  }
}

export default Logo;
