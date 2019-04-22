import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import NoteAudioPlayer from './NoteAudioPlayer.js';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles, createStyles } from '@material-ui/core';
import { Song } from './SongUtils';

const styles = createStyles({
  add: {
//    marginRight: "0.5em"
  },
  notes: {
    textAlign: "right"
  },
  playing: {
    marginLeft: "1em",
    marginRight: "1.5em",
    transform: "scale(1.8)",
    transition: "transform 0.5s"
  },
  stopped: {
    marginLeft: "1em",
    marginRight: "1.5em",
    transform: "scale(1)",
    transition: "transform 0.5s"
  }
});

interface Props extends WithStyles<typeof styles> {
  index: number,
  song: Song,
  noteAudioPlayer: NoteAudioPlayer,
  handleAddToPlaylist: ((songId:number) => void) | null,
  handleRemoveFromPlaylist: ((songId:number, index:number) => void) | null
}

interface State {
  playing: boolean
}

class SongItem extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      playing: false
    };
  }

  playNotes = (notes:string) => () => {
    this.props.noteAudioPlayer.playNotes(
      notes, this.startPlayback, this.endPlayback);
  }
  startPlayback = () => {
    this.setState({
      playing: true
    });
  }
  endPlayback = () => {
    this.setState({
      playing: false
    });
  }
  addToPlaylist = () => {
    if (this.props.handleAddToPlaylist) {
      this.props.handleAddToPlaylist(this.props.song.id);
    }
  }
  removeFromPlaylist = () => {
    if (this.props.handleRemoveFromPlaylist) {
      this.props.handleRemoveFromPlaylist(this.props.song.id, this.props.index);
    }
  }

  render () {
    const { classes } = this.props;
    const song = this.props.song;
    const secondary = song.lyrics +
      (song.composer ? ` – säv. ${song.composer}` : '') +
      (song.poet ? `, san. ${song.poet}` : '');
    return <ListItem
        button
        onClick={this.playNotes(song.notes)}>
      <ListItemText
        primary={song.title}
        secondary={secondary}/>
      <div className={classes.notes}>{song.notes}</div>
      <ListItemIcon
        className={ this.state.playing ? classes.playing : classes.stopped }>
        <Icon>music_note</Icon>
      </ListItemIcon>
      { this.props.handleAddToPlaylist &&
        <ListItemSecondaryAction>
          <IconButton onClick={this.addToPlaylist}>
            <Icon className={classes.add}>playlist_add</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      }
      { this.props.handleRemoveFromPlaylist &&
        <ListItemSecondaryAction>
          <IconButton onClick={this.removeFromPlaylist}>
            <Icon className={classes.add}>delete</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      }
    </ListItem>;
  }
}

export default withStyles(styles)(SongItem);
