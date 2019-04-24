import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles, createStyles } from '@material-ui/core';

import NoteAudioPlayer from './NoteAudioPlayer.js';
import logo from './img/aanirauta-32.png';

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

const Logo = (props:Props) => {

  const [playing, setPlaying] = useState(false);

  const playNote = () => {
    props.noteAudioPlayer.playNotes(
      'A4', () => setPlaying(true), () => setPlaying(false));
  }

  const { classes } = props;
  return <div>
    <IconButton onClick={playNote}>
      <img
        src={logo}
        alt="Äänirauta"
        className={ playing ? classes.playing : classes.stopped }
        />
    </IconButton>
  </div>
}

export default withStyles(styles)(Logo);
