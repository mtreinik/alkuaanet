import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import SongList from './SongList.js';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  close: {
    margin: '0.5em'
  },
  toolbar: theme.mixins.toolbar,
});

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Playlist extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render () {
    const { classes } = this.props;
    return <div>
        <Button onClick={this.handleClickOpen}>
          <Badge color="secondary" badgeContent={this.props.playlistSongs.length}>
            <Icon>playlist_play</Icon>
            </Badge>
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}>
          <Toolbar>
            <div style={{flexGrow: 1}} />
            <Fab className={classes.close} onClick={this.handleClose}>
              <Icon>close</Icon>
            </Fab>
          </Toolbar>
          <SongList
            loaded={this.props.songDataLoaded}
            songs={this.props.playlistSongs}
            handleRemoveFromPlaylist={this.props.handleRemoveFromPlaylist}
            noteAudioPlayer={this.props.noteAudioPlayer} />
      </Dialog>
      </div>
  }
}

export default withStyles(styles)(Playlist);
