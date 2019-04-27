import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchField from './SearchField';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles, createStyles } from '@material-ui/core';

import CopyToClipboard from 'react-copy-to-clipboard';
import { Link }  from 'react-router-dom';

import Logo from './Logo';
import MyMenu from './MyMenu';
import NoteAudioPlayer from './NoteAudioPlayer';
import SongUtils from './SongUtils';

const styles = createStyles({
  link: {
    marginRight: '0.2em'
  }
});

interface Props extends WithStyles<typeof styles> {
  showPlaylist: boolean,
  noteAudioPlayer: NoteAudioPlayer,
  playlist: number[],
  filter: string,
  handleFilterChange: (filter:string) => void
}

const MyAppBar = (props:Props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const playlistPath = '/lista/' + props.playlist.join(',');
  const playlistUrl = SongUtils.getPlaylistUrl(props.playlist);

  const { classes } = props;

  return <div>
    <AppBar position="fixed">
      <Toolbar>
        <Logo
          noteAudioPlayer={props.noteAudioPlayer}
          />
        { props.showPlaylist &&
          <IconButton
              component={
                ({innerRef,...props}) => <Link {...props} to="/" />
              }>
            <Icon>arrow_back</Icon>
          </IconButton>
        }
        <div>
          { props.showPlaylist ||
            <div>
              <IconButton
                  component={
                    ({innerRef,...innerProps}) =>
                      <Link {...innerProps}
                        to={ props.showPlaylist ? '/' : playlistPath }/>
                  }>
                <Badge color="secondary" badgeContent={props.playlist.length}>
                  <Icon>playlist_play</Icon>
                </Badge>
              </IconButton>
              <SearchField
                value={props.filter}
                handleFilterChange={props.handleFilterChange} />
            </div>
          }
          { props.showPlaylist &&
            <div>
              <CopyToClipboard
                  text={playlistUrl}
                  onCopy={() => setSnackbarOpen(true)}>
                <Button
                    component={
                      ({innerRef,...innerProps}) =>
                        <Link {...innerProps} to={playlistPath} />
                    }>
                  <Icon className={classes.link}>link</Icon>
                  {props.playlist.length} {props.playlist.length === 1 ? 'laulu' : 'laulua'}
                </Button>
              </CopyToClipboard>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackbarOpen(false)}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Linkki kopioitu</span>}
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => setSnackbarOpen(false)}>
                    <Icon>close</Icon>
                  </IconButton>,
                ]}/>

            </div>
          }
        </div>
        <div style={{flexGrow: 1}} />
        <MyMenu
          playlist={props.playlist}
          />
      </Toolbar>

    </AppBar>
    <Toolbar/>
  </div>;
}

export default withStyles(styles)(MyAppBar);
