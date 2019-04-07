import React from 'react';
import List from '@material-ui/core/List';
import SongItem from './SongItem.js';

const SongList = props =>
  <List>
    {props.songs.map(song => (
      <SongItem
        key={song.id} 
        noteAudioPlayer={props.noteAudioPlayer}
        {...song}
        />
    ))}
  </List>

export default SongList;
