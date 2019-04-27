import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles, createStyles } from '@material-ui/core';

import NoteAudioPlayer from './NoteAudioPlayer.js';
import { Song } from './SongUtils';

const styles = createStyles({
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
  handleAddToPlaylist?: ((songId:number) => void),
  handleRemoveFromPlaylist?: ((songId:number, index:number) => void)
}

const SongItem = (props:Props) => {

  const [playing, setPlaying] = useState(false);

  const playNotes = (notes:string) => ():void => {
    props.noteAudioPlayer.playNotes(
      notes, () => setPlaying(true), () => setPlaying(false));
  }

  const addToPlaylist = ():void => {
    if (props.handleAddToPlaylist) {
      props.handleAddToPlaylist(props.song.id);
    }
  }
  const removeFromPlaylist = () => {
    if (props.handleRemoveFromPlaylist) {
      props.handleRemoveFromPlaylist(props.song.id, props.index);
    }
  }

  const { classes } = props;
  const song = props.song;
  const secondaryText = song.lyrics +
    (song.composer ? ` – säv. ${song.composer}` : '') +
    (song.arranger ? `, sov. ${song.arranger}` : '') +
    (song.poet ? `, san. ${song.poet}` : '');
  return <ListItem
      button
      onClick={playNotes(song.notes)}>
    <ListItemText
      primary={song.title}
      secondary={secondaryText}/>
    <div className={classes.notes}>{song.notes}</div>
    <ListItemIcon
      className={ playing ? classes.playing : classes.stopped }>
      <Icon>music_note</Icon>
    </ListItemIcon>
    { props.handleAddToPlaylist &&
      <ListItemSecondaryAction>
        <IconButton onClick={addToPlaylist}>
          <Icon>playlist_add</Icon>
        </IconButton>
      </ListItemSecondaryAction>
    }
    { props.handleRemoveFromPlaylist &&
      <ListItemSecondaryAction>
        <IconButton onClick={removeFromPlaylist}>
          <Icon>delete</Icon>
        </IconButton>
      </ListItemSecondaryAction>
    }
  </ListItem>;

}

export default withStyles(styles)(SongItem);
