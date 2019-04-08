import React from 'react';
import List from '@material-ui/core/List';
import SongItem from './SongItem.js';
import CircularProgress from '@material-ui/core/CircularProgress';

const SongList = props =>
  <div>
    { props.loaded || (
        <CircularProgress color="secondary" style={{margin: "1em"}}/>
      )
    }
    <List>
      {props.songs.map(song => (
        <SongItem
          key={song.id}
          noteAudioPlayer={props.noteAudioPlayer}
          {...song}
          />
      ))}
    </List>
  </div>

export default SongList;
