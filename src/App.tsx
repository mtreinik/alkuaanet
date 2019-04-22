import React from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

import NoteAudioPlayer from './NoteAudioPlayer';
import SongSearchPage from './SongSearchPage';
import NewSongPage from './NewSongPage';
import AboutPage from './AboutPage';
import { Song } from './SongUtils';
import SongUtils from './SongUtils';
import NoteUtils from './NoteUtils';

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

interface SongJson {
  ID: number,
  nimi: string,
  "opus-aanet": string,
  alkusanat: string,
  sav: string,
  san: string
}

interface State {
  songs: Song[],
  songDataLoaded: boolean,
}

class App extends React.Component<RouteComponentProps, State> {

  constructor(props:RouteComponentProps) {
    super(props);
    this.state = {
      songs: [],
      songDataLoaded: false,
    };
  }

  componentDidMount() {
    const jsonUrl = window.location.origin + '/songdata.json';
    console.log('fetching from', jsonUrl);
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => this.setState({
          songDataLoaded: true,
          songs: data.map((song:SongJson) => {
            return {
              id: song.ID,
              title: song.nimi,
              notes: NoteUtils.convertBtoH(song["opus-aanet"]),
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
              path='/lista/:playlist?'
              render={props =>
                <SongSearchPage
                  songDataLoaded={this.state.songDataLoaded}
                  noteAudioPlayer={noteAudioPlayer}
                  songs={this.state.songs}
                  playlist={SongUtils.getPlayListFromUrlParam(props.match.params.playlist)}
                  showPlaylist={true}
                  />
              }/>
            <Route
              path='/uusi/:playlist?'
              render={props =>
                <NewSongPage
                  noteAudioPlayer={noteAudioPlayer}
                  playlist={SongUtils.getPlayListFromUrlParam(props.match.params.playlist)}
                  />
              }/>
            <Route
              path='/tietoja/:playlist?'
              render={props =>
                <AboutPage
                  noteAudioPlayer={noteAudioPlayer}
                  playlist={SongUtils.getPlayListFromUrlParam(props.match.params.playlist)}
                  />
              }/>
            <Route
              exact path='/:playlist?'
              render={props =>
                <SongSearchPage
                  songDataLoaded={this.state.songDataLoaded}
                  noteAudioPlayer={noteAudioPlayer}
                  songs={this.state.songs}
                  playlist={SongUtils.getPlayListFromUrlParam(props.match.params.playlist)}
                  showPlaylist={false}
                  />
              }/>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>;
  }
}

export default App;
