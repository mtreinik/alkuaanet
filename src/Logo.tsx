import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import logo from './img/aanirauta-32.png';
import NoteAudioPlayer from './NoteAudioPlayer.js';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
  playing: {
    width: 40,
    height: 'auto',
    transition: 'width 0.5s',
  },
  stopped: {
    width: 32,
    height: 'auto',
    transition: 'width 0.5s'
  }
});

interface Props extends WithStyles<typeof styles> {
  noteAudioPlayer: NoteAudioPlayer
}

interface State {
  open: boolean,
  playing: boolean
}

class Logo extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      open: false,
      playing: false
    };
  }

  playNote = () => {
    this.props.noteAudioPlayer.playNotes('A4', this.startPlayback, this.endPlayback);
  }

  startPlayback = () => {
    console.log('playing');
    this.setState({
      playing: true
    })
  }
  endPlayback = () => {
    console.log('stopping');
    this.setState({
      playing: false
    })
  }

  render () {
    const { classes } = this.props;
    return <div>
      <IconButton onClick={this.playNote}>
        <img
          src={logo}
          alt="Äänirauta"
          className={ this.state.playing ? classes.playing : classes.stopped }
          />
      </IconButton>

    </div>
  }
}

export default withStyles(styles)(Logo);
