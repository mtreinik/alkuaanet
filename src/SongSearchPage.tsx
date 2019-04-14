import React from 'react';
import SongList from './SongList';
import MyAppBar from './MyAppBar';
import { Song } from './SongItem';
import NoteAudioPlayer from './NoteAudioPlayer';

function getPlaylistPath(playlist:number[]) {
  const playlistPath = '/lista/' + playlist.join(',');
  return playlistPath;
}
function getPlaylistUrl(playlist:number[]) {
  const playlistUrl = window.location.origin + getPlaylistPath(playlist);
  return playlistUrl;
}

function getFilteredSongs(songs:Song[], filter:string):Song[] {
  const lowerCaseFilter = filter.toLowerCase();
  const filteredSongs = songs.filter(song => {
    return song.title.toLowerCase().includes(lowerCaseFilter) ||
      song.lyrics.toLowerCase().includes(lowerCaseFilter);
  });
  return filteredSongs;
}

function getPlaylistSongs(songs:Song[], filter:string, playlist:number[]) {
  if (!playlist) {
    return [];
  }
  const filteredSongs = getFilteredSongs(songs, filter);
  const playlistSongs = playlist.reduce((playlistSongs: Song[], songId: number) => {
    const songToAdd = filteredSongs.find((song) => {
      return song.id === songId;
    });
    return songToAdd ? [...playlistSongs, songToAdd] : playlistSongs;
  }, []);
  return playlistSongs;
}

interface Props {
  noteAudioPlayer: NoteAudioPlayer
  showPlaylist: boolean,
  songDataLoaded: boolean,
  songs: Song[],
  playlist: number[]
}

interface State {
  playlist: number[],
  playlistPath: string,
  playlistUrl: string,
  filter: string
}

class SongSearchPage extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      playlist: props.playlist,
      playlistPath: getPlaylistPath(props.playlist),
      playlistUrl: getPlaylistUrl(props.playlist),
      filter: ''
    };
  }

  handleFilterChange = (filter:string) => {
    this.setState({
      filter: filter
    });
  }

  handleAddToPlaylist = (songId:number) => {
    const newPlaylist = [...this.state.playlist, songId];
    this.setState({
      playlist: newPlaylist,
      playlistPath: getPlaylistPath(newPlaylist),
      playlistUrl: getPlaylistUrl(newPlaylist)
    });
  }

  handleRemoveFromPlaylist = (songId:number, index:number) => {
    // TODO use index instead of songId
    const newPlaylist = this.state.playlist.filter((id) => {
      return id !== songId;
    });
    this.setState({
      playlist: newPlaylist,
      playlistPath: getPlaylistPath(newPlaylist),
      playlistUrl: getPlaylistUrl(newPlaylist)
    });
  }

  render () {
    return <div>
      <MyAppBar
        noteAudioPlayer={this.props.noteAudioPlayer}
        showPlaylist={this.props.showPlaylist}
        filter={this.state.filter}
        playlistPath={this.state.playlistPath}
        playlistUrl={this.state.playlistUrl}
        playlist={this.state.playlist}
        handleFilterChange={this.handleFilterChange}
        />
      <SongList
        loaded={this.props.songDataLoaded}
        songs={ this.props.showPlaylist ?
          getPlaylistSongs(this.props.songs, '', this.state.playlist) :
          getFilteredSongs(this.props.songs, this.state.filter) }
        handleAddToPlaylist={ this.props.showPlaylist ? null : this.handleAddToPlaylist }
        handleRemoveFromPlaylist={ this.props.showPlaylist ? this.handleRemoveFromPlaylist : null }
        noteAudioPlayer={this.props.noteAudioPlayer} />
    </div>
  }
}

export default SongSearchPage;
