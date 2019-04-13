import React from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import NoteAudioPlayer from './NoteAudioPlayer.js';
import SongSearchPage from './SongSearchPage.js';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

function getPlayListFromUrlParam(param) {
  if (!param) {
    return [];
  }
  const params = param.split(',');
  const parsedInts = params.map(strParam => {
    return parseInt(strParam);
  });
  return parsedInts;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      songDataLoaded: false,
      playlist: []
    };
  }

  componentDidMount() {
    fetch('/songdata.json')
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
      <Router>
        <Switch>
          <Route
            exact path='/'
            render={props =>
              <SongSearchPage
                showPlaylist={false}
                songDataLoaded={this.state.songDataLoaded}
                playlist={this.state.playlist}
                noteAudioPlayer={noteAudioPlayer}
                songs={this.state.songs}
                />
            }/>          
          <Route
            path='/lista/:playlist?'
            render={props =>
              <SongSearchPage
                showPlaylist={true}
                songDataLoaded={this.state.songDataLoaded}
                playlist={getPlayListFromUrlParam(props.match.params.playlist)}
                noteAudioPlayer={noteAudioPlayer}
                songs={this.state.songs}
                />
            }/>
        </Switch>
        </Router>
      </MuiThemeProvider>
    </div>;
  }
}

export default App;
