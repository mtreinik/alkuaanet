import React from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import NoteAudioPlayer from './NoteAudioPlayer';
import SongSearchPage from './SongSearchPage';
import { Song } from './SongItem';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

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

function getPlayListFromUrlParam(param:string) {
  if (!param) {
    return [];
  }
  const params = param.split(',');
  const parsedInts = params.map(strParam => {
    return parseInt(strParam);
  });
  return parsedInts;
}


interface SongJson {
  ID: number,
  nimi: string,
  "opus-aanet": string,
  alkusanat: string,
  alkuaanet: string,
  sav: string,
  san: string
}

interface State {
  songs: Song[],
  songDataLoaded: boolean,
  playlist: number[]
}

class App extends React.Component<RouteComponentProps, State> {

  constructor(props:RouteComponentProps) {
    super(props);
    this.state = {
      songs: [],
      songDataLoaded: false,
      playlist: []
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
            render={() =>
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
