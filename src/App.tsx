import React, { useState, useEffect } from 'react';
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
  sov: string,
  san: string
}

const App = (routeComponentProps:RouteComponentProps) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [songDataLoaded, setSongDataLoaded] = useState(false);

  useEffect(() => {
    if (!songDataLoaded) {
      const jsonUrl = window.location.origin + '/songdata.json';
      console.log('fetching from', jsonUrl);
      fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            setSongDataLoaded(true);
            setSongs(data.map((song:SongJson) => {
              return {
                id: song.ID,
                title: song.nimi,
                notes: NoteUtils.convertBtoH(song["opus-aanet"]),
                lyrics: song.alkusanat,
                composer: song.sav,
                arranger: song.sov,
                poet: song.san
              };
            }));
          });
    }
  });

  return <div className="App">
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route
            path='/lista/:playlist?'
            render={props =>
              <SongSearchPage
                songDataLoaded={songDataLoaded}
                noteAudioPlayer={noteAudioPlayer}
                songs={songs}
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
                songDataLoaded={songDataLoaded}
                noteAudioPlayer={noteAudioPlayer}
                songs={songs}
                playlist={SongUtils.getPlayListFromUrlParam(props.match.params.playlist)}
                showPlaylist={false}
                />
            }/>
        </Switch>
      </Router>
    </MuiThemeProvider>
  </div>;
}

export default App;
