import React from 'react';
import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Logo from './Logo.js';
import Help from './Help.js';
import SearchField from './SearchField.js';
import SongList from './SongList.js';
import Playlist from './Playlist.js';
import NoteAudioPlayer from './NoteAudioPlayer.js';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: { main: '#f8f8f8' },
    secondary: { main: '#f0a000' }
  },
});

const noteAudioPlayer = new NoteAudioPlayer();

function getFilteredSongs(songs, filter) {
  const lowerCaseFilter = filter.toLowerCase();
  return songs.filter(song => {
    return song.title.toLowerCase().includes(lowerCaseFilter) ||
      song.lyrics.toLowerCase().includes(lowerCaseFilter);
  });
}

function getPlaylistSongs(songs, playlist) {
  const playlistSongs = playlist.map((songId) => {
    const songToAdd = songs.find((song) => {
      return song.id === songId;
    });
    return songToAdd;
  });
  return playlistSongs;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      songDataLoaded: false,
      filter: '',
      playlist: []
    };
  }

  handleFilterChange = (filter) => {
    this.setState({
      filter: filter
    });
  }

  handleAddToPlaylist = (songId) => {
    this.setState({
      playlist: [...this.state.playlist, songId]
    });
  }

  handleRemoveFromPlaylist = (songId) => {
    this.setState({
      playlist: this.state.playlist.filter((id) => {
        return id !== songId;
      })
    });
  }

  componentDidMount() {
    fetch('./songdata.json')
      .then(response => response.json())
      .then(data => this.setState({
          songDataLoaded: true,
          songs: data.map(song => {
            return {
              id: song.ID,
              title: song.nimi,
              notes: song["opus-aanet"],
              lyrics: song.alkusanat,
              composer: song.sav,
              poet: song.san
            };
          })
        }));
  }

  render() {
    return <div className="App">
      <MuiThemeProvider theme={theme}>

        <AppBar position="sticky">
          <Toolbar>
            <Logo
              noteAudioPlayer={noteAudioPlayer}
              />
            <SearchField handleFilterChange={this.handleFilterChange} />
            <div style={{flexGrow: 1}} />
            <Playlist
              songDataLoaded={this.state.songDataLoaded}
              playlistSongs={getPlaylistSongs(this.state.songs, this.state.playlist)}
              noteAudioPlayer={noteAudioPlayer}
              handleRemoveFromPlaylist={this.handleRemoveFromPlaylist}
              />
            <Help />
          </Toolbar>
        </AppBar>

        <SongList
          loaded={this.state.songDataLoaded}
          songs={getFilteredSongs(this.state.songs, this.state.filter)}
          handleAddToPlaylist={this.handleAddToPlaylist}
          noteAudioPlayer={noteAudioPlayer} />

      </MuiThemeProvider>
    </div>;
  }
}

export default App;
