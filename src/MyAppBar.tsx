import React from 'react';
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
import NoteAudioPlayer from './NoteAudioPlayer.js';
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

interface State {
  snackbarOpen: boolean
}

class MyAppBar extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      snackbarOpen: false
    };
  }

  openSnackbar = () => {
    this.setState({
      snackbarOpen: true
    });
  }

  closeSnackbar = () => {
    this.setState({
      snackbarOpen: false
    });
  }

  render () {
    const playlistPath = '/lista/' + this.props.playlist.join(',');
    const playlistUrl = SongUtils.getPlaylistUrl(this.props.playlist);
    const { classes } = this.props;
    return <div>
        <AppBar position="fixed">
          <Toolbar>
            <Logo
              noteAudioPlayer={this.props.noteAudioPlayer}
              />
            { this.props.showPlaylist &&
              <IconButton
                  component={
                    ({innerRef,...props}) => <Link {...props} to="/" />
                  }>
                <Icon>arrow_back</Icon>
              </IconButton>
            }
            <div>
              { this.props.showPlaylist ||
                <div>
                  <IconButton
                      component={
                        ({innerRef,...props}) =>
                          <Link {...props}
                            to={ this.props.showPlaylist ? '/' : playlistPath }/>
                      }>
                    <Badge color="secondary" badgeContent={this.props.playlist.length}>
                      <Icon>playlist_play</Icon>
                    </Badge>
                  </IconButton>
                  <SearchField
                    value={this.props.filter}
                    handleFilterChange={this.props.handleFilterChange} />
                </div>
              }
              { this.props.showPlaylist &&
                <div>
                  <CopyToClipboard
                      text={playlistUrl}
                      onCopy={this.openSnackbar}>
                    <Button
                        component={
                          ({innerRef,...props}) =>
                            <Link {...props} to={playlistPath} />
                        }>
                      <Icon className={classes.link}>link</Icon>
                      {this.props.playlist.length} {this.props.playlist.length === 1 ? 'laulu' : 'laulua'}
                    </Button>
                  </CopyToClipboard>
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={5000}
                    onClose={this.closeSnackbar}
                    ContentProps={{
                      'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Linkki kopioitu</span>}
                    action={[
                      <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.closeSnackbar}>
                        <Icon>close</Icon>
                      </IconButton>,
                    ]}/>

                </div>
              }
            </div>
            <div style={{flexGrow: 1}} />
            <MyMenu
              playlist={this.props.playlist}
              />
          </Toolbar>

        </AppBar>
        <Toolbar/>
      </div>;
  }
}

export default withStyles(styles)(MyAppBar);
