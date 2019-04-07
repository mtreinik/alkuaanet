import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Logo from './Logo.js';
import SearchField from './SearchField.js';
import SongList from './SongList.js';
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

const songs = [
  {
    id: 1,
    title: "Aikainen aamu",
    lyrics: "Me astumme yöhön kasteiseen",
    composer: "Erik Bergman",
    poet: "Lauri Viljanen",
    notes: "C3-F2"
  },
  {
    id: 2,
    title: "Annin laulu",
    composer: "P. J. Hannikainen",
    lyrics: "Kulkeissani vainiolla",
    notes: "C4-Ab3-Eb3-Ab2"
  },
  {
    id: 3,
    title: "Auringon lapset",
    composer: "Georg Malmstén",
    lyrics: "Missä meren aallot",
    notes: "F#3-E3"
  }
];

const noteAudioPlayer = new NoteAudioPlayer();

const App = () =>
  <div className="App">
    <MuiThemeProvider theme={theme}>

      <AppBar position="static">
        <Toolbar>
          <Logo noteAudioPlayer={noteAudioPlayer}/>
          <SearchField />
          <div style={{flexGrow: 1}} />
          <Icon>menu</Icon>
        </Toolbar>
      </AppBar>

     <SongList songs={songs} noteAudioPlayer={noteAudioPlayer} />

    </MuiThemeProvider>
  </div>

export default App;
