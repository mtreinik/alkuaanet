import React from 'react';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import NoteAudioPlayer from './NoteAudioPlayer';
import SongItem from './SongItem';
import { Song } from './SongItem';

type Props = {
  loaded: boolean,
  songs: Song[],
  noteAudioPlayer: NoteAudioPlayer,
  handleAddToPlaylist: ((songId:number) => void) | null,
  handleRemoveFromPlaylist: ((songId:number, index:number) => void) | null
}

const SongList = (props:Props) =>
  <div>
    { props.loaded || (
        <CircularProgress color="secondary" style={{margin: "1em"}}/>
      )
    }
    <List>
      {props.songs.map((song, index) => (
        <SongItem
          key={song.id + '-' + index}
          index={index}
          noteAudioPlayer={props.noteAudioPlayer}
          handleAddToPlaylist={props.handleAddToPlaylist}
          handleRemoveFromPlaylist={props.handleRemoveFromPlaylist}
          song={song}
          />
      ))}
    </List>
  </div>

export default SongList;
