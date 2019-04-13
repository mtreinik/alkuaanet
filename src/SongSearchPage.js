import React from 'react';
import SongList from './SongList.js';
import MyAppBar from './MyAppBar.js';

function getPlaylistPath(playlist) {
  const playlistPath = '/lista/' + playlist.join(',');
  return playlistPath;
}
function getPlaylistUrl(playlist) {
  const playlistUrl = window.location.origin + getPlaylistPath(playlist);
  return playlistUrl;
}

function getFilteredSongs(songs, filter) {
  const lowerCaseFilter = filter.toLowerCase();
  const filteredSongs = songs.filter(song => {
    return song.title.toLowerCase().includes(lowerCaseFilter) ||
      song.lyrics.toLowerCase().includes(lowerCaseFilter);
  });
  return filteredSongs;
}

function getPlaylistSongs(songs, filter, playlist) {
  if (!playlist) {
    return [];
  }
  const filteredSongs = getFilteredSongs(songs, filter);
  const playlistSongs = playlist.reduce((playlistSongs, songId) => {
    const songToAdd = filteredSongs.find((song) => {

      return song.id === songId;
    });
    return songToAdd ? [...playlistSongs, songToAdd] : playlistSongs;
  }, []);
  return playlistSongs;
}

class SongSearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playlist: props.playlist,
      playlistPath: getPlaylistPath(props.playlist),
      playlistUrl: getPlaylistUrl(props.playlist),
      filter: ''
    };
  }

  handleFilterChange = (filter) => {
    this.setState({
      filter: filter
    });
  }

  handleAddToPlaylist = (songId) => {
    const newPlaylist = [...this.state.playlist, songId];
    this.setState({
      playlist: newPlaylist,
      playlistPath: getPlaylistPath(newPlaylist),
      playlistUrl: getPlaylistUrl(newPlaylist)
    });
  }

  handleRemoveFromPlaylist = (songId) => {
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
