import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  playing: {
    marginLeft: "1em",
    transform: "scale(1.8)",
    transition: "transform 0.5s"
  },
  stopped: {
    marginLeft: "1em",
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
    this.props.noteAudioPlayer.playNotes(notes, this.startPlayback, this.endPlayback);
  }
  startPlayback = () => {
    this.setState({
      playing: true
    })
  }
  endPlayback = () => {
    this.setState({
      playing: false
    })
  }
  render () {
    const { classes } = this.props;
    const secondary = this.props.lyrics +
      (this.props.composer ? ` – <em>säv. ${this.props.composer}</em>` : '') +
      (this.props.poet ? `, <em>san. ${this.props.poet}</em>` : '');
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
    </ListItem>;
  }
}

export default withStyles(styles)(SongItem);
