import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { Link }  from 'react-router-dom';

interface Props {
  playlist: number[]
}

const Logo = (props:Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const playlistPath = '/lista/' + props.playlist.join(',');
  const newSongPagePath = '/uusi/' + props.playlist.join(',');
  const aboutPagePath = '/tietoja/' + props.playlist.join(',');

  return <div>
    <IconButton
      aria-owns={ anchorEl ? 'simple-menu' : undefined }
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget)
      }>
      <Icon>menu</Icon>
    </IconButton>
    <Menu
      id='simple-menu'
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}>
      <MenuItem
        onClick={() => setAnchorEl(null)}
        component={
          ({innerRef,...innerProps}) => <Link {...innerProps} to="/" />
        }>
        <ListItemIcon>
          <Icon>search</Icon>
        </ListItemIcon>
        <ListItemText>Hae lauluja</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => setAnchorEl(null)}
        component={
          ({innerRef,...innerProps}) => <Link {...innerProps} to={playlistPath} />
        }>
        <ListItemIcon>
          <Badge color="secondary" badgeContent={props.playlist.length}>
            <Icon>playlist_play</Icon>
          </Badge>
        </ListItemIcon>
        <ListItemText>Näytä soittolista</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => setAnchorEl(null)}
        component={
          ({innerRef,...innerProps}) => <Link {...innerProps} to={newSongPagePath} />
        }>
        <ListItemIcon>
          <Icon>add</Icon>
        </ListItemIcon>
        <ListItemText>Ehdota uutta laulua</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => setAnchorEl(null)}
        component={
          ({innerRef,...innerProps}) => <Link {...innerProps} to={aboutPagePath} />
        }>
        <ListItemIcon>
        <Icon>help</Icon>
        </ListItemIcon>
        <ListItemText>Tietoja sovelluksesta</ListItemText>
      </MenuItem>
    </Menu>
  </div>
}

export default Logo;
