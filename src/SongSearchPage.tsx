import React, { useState } from 'react';

import NoteAudioPlayer from './NoteAudioPlayer';
import SongList from './SongList';
import MyAppBar from './MyAppBar';
import { Song } from './SongUtils';
import SongUtils from './SongUtils';

interface Props {
  noteAudioPlayer: NoteAudioPlayer
  showPlaylist: boolean,
  songDataLoaded: boolean,
  songs: Song[],
  playlist: number[]
}

const SongSearchPage = (props:Props) => {

  const [playlist, setPlaylist] = useState(props.playlist);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (newFilter:string):void => {
    setFilter(newFilter);
  }

  const handleAddToPlaylist = (songId:number):void => {
    const newPlaylist = [...playlist, songId];
    setPlaylist(newPlaylist);
  }

  const handleRemoveFromPlaylist = (songId:number, index:number):void => {
    // TODO use index instead of songId
    const newPlaylist = playlist.filter((id) => {
      return id !== songId;
    });
    setPlaylist(newPlaylist);
  }

  return <div>
    <MyAppBar
      noteAudioPlayer={props.noteAudioPlayer}
      showPlaylist={props.showPlaylist}
      filter={filter}
      playlist={playlist}
      handleFilterChange={handleFilterChange}
      />
    <SongList
      loaded={props.songDataLoaded}
      songs={ props.showPlaylist ?
        SongUtils.getPlaylistSongs(props.songs, '', playlist) :
        SongUtils.getFilteredSongs(props.songs, filter) }
      handleAddToPlaylist={ props.showPlaylist ? undefined : handleAddToPlaylist }
      handleRemoveFromPlaylist={ props.showPlaylist ? handleRemoveFromPlaylist : undefined }
      noteAudioPlayer={props.noteAudioPlayer} />
  </div>

}

export default SongSearchPage;
