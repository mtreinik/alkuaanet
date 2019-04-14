import React from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchField from './SearchField.js';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

import Logo from './Logo.js';
import Help from './Help.js';

const styles = {
  link: {
    marginRight: '0.2em'
  }
}

class MyAppBar extends React.Component {

  constructor(props) {
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
    const { classes } = this.props;
    return <div>
        <AppBar position="sticky">
          <Toolbar>
            <Logo
              noteAudioPlayer={this.props.noteAudioPlayer}
              />
            { this.props.showPlaylist &&
              <IconButton component={Link} to='/'>
                <Icon>arrow_back</Icon>
              </IconButton>
            }
            <div>
              { this.props.showPlaylist ||
                <div>
                  <IconButton
                      component={Link}
                      to={ this.props.showPlaylist ? '/' : this.props.playlistPath }>

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
                      text={this.props.playlistUrl}
                      onCopy={this.openSnackbar}>
                    <Button component={Link} to={this.props.playlistPath}>
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
            <Help />
          </Toolbar>

        </AppBar>
      </div>;
  }
}

export default withStyles(styles)(MyAppBar);
