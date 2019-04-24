import React from 'react';
import Paper from '@material-ui/core/Paper';

import NoteAudioPlayer from './NoteAudioPlayer.js';
import MySimpleAppBar from './MySimpleAppBar';
import Link from '@material-ui/core/Link';

interface Props {
  noteAudioPlayer: NoteAudioPlayer,
  playlist: number[]
}

const AboutPage = (props:Props) => {
  return <div>
    <MySimpleAppBar
      noteAudioPlayer={props.noteAudioPlayer}
      playlist={props.playlist}
      title="Tietoja sovelluksesta"
      />
    <Paper style={{margin: "1em", padding: "1em"}}>
      <h1>alkuaa.net</h1>
      <p>Alkuäänet mieskuorokappaleisiin.</p>
      <p>Tekijä: Mikko Reinikainen</p>
      <p>
        <Link color="inherit"
          href="https://github.com/mtreinik/alkuaanet/">
          github.com/mtreinik/alkuaanet
        </Link>
      </p>
    </Paper>
  </div>
}

export default AboutPage;
