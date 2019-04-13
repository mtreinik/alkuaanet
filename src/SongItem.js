import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  add: {
//    marginRight: "0.5em"
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
};

class SongItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
  }

  playNotes = (notes) => () => {
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
    console.log('adding ' + this.props.id);
    this.props.handleAddToPlaylist(this.props.id);
  }
  removeFromPlaylist = () =>{
    console.log('removing ' + this.props.id);
    this.props.handleRemoveFromPlaylist(this.props.id);
  }
  render () {
    const { classes } = this.props;
    const secondary = this.props.lyrics +
      (this.props.composer ? ` – säv. ${this.props.composer}` : '') +
      (this.props.poet ? `, san. ${this.props.poet}` : '');
    return <ListItem
        button
        onClick={this.playNotes(this.props.notes)}>
      <ListItemText
        button="true"
        primary={this.props.title}
        secondary={secondary}/>
      {this.props.notes}
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
