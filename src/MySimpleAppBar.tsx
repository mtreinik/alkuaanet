import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Link }  from 'react-router-dom';

import Logo from './Logo';
import MyMenu from './MyMenu';
import NoteAudioPlayer from './NoteAudioPlayer.js';

interface Props {
  noteAudioPlayer: NoteAudioPlayer,
  playlist: number[],
  title:string
}

const MySimpleAppBar = (props:Props) =>
  <div>
    <AppBar position="fixed">
      <Toolbar>
        <Logo
          noteAudioPlayer={props.noteAudioPlayer}
          />
        <IconButton
            component={({innerRef,...innerProps}) => <Link {...innerProps}
            to={'/' + props.playlist.join(',')} />}>
          <Icon>arrow_back</Icon>
        </IconButton>
        {props.title}
        <div style={{flexGrow: 1}} />
        <MyMenu
          playlist={props.playlist}
          />
      </Toolbar>

    </AppBar>
    <Toolbar/>
  </div>;


export default MySimpleAppBar;
