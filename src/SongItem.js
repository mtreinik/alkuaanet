import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  notes: {
    marginRight: "2em"
  },
  expand: {
    margin: "0.5em"
  },
  playing: {
    transform: "scale(1.8)",
    transition: "transform 0.5s"
  },
  stopped: {
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
  handleOpenClose = () => {
    this.props.handleOpenClose(this.props.id);
  }

  render () {
    const { classes } = this.props;
    const secondary = this.props.lyrics +
      (this.props.composer ? ` – säv. ${this.props.composer}` : '') +
      (this.props.poet ? `, san. ${this.props.poet}` : '');
    return <ListItem
        button
        alignItems="flex-start"
        onClick={this.playNotes(this.props.notes)}>
      <ListItemIcon
        className={ this.state.playing ? classes.playing : classes.stopped }>
        <Icon>music_note</Icon>
      </ListItemIcon>
      <ListItemText
        primary={this.props.title}
        secondary={secondary}/>
      <span className={classes.notes}>
        {this.props.notes}
      </span>
      <ListItemSecondaryAction>
        <Icon
          className={classes.expand}
          onClick={this.handleOpenClose}>
          {this.props.open ? "expand_less" : "expand_more" }
        </Icon>
      </ListItemSecondaryAction>
    </ListItem>;
  }
}

export default withStyles(styles)(SongItem);
