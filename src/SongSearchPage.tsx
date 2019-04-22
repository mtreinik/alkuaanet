import React from 'react';

import NoteAudioPlayer from './NoteAudioPlayer';
import SongList from './SongList';
import MyAppBar from './MyAppBar';
import { Song } from './SongUtils';
import SongUtils from './SongUtils';

interface Props {
  noteAudioPlayer: NoteAudioPlayer
  showPlaylist: boolean,
  songDataLoaded: boolean,
  songs: Song[],
  playlist: number[]
}

interface State {
  playlist: number[],
  filter: string
}

class SongSearchPage extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      filter: '',
      playlist: props.playlist
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
      playlist: newPlaylist
    });
  }

  handleRemoveFromPlaylist = (songId:number, index:number) => {
    // TODO use index instead of songId
    const newPlaylist = this.state.playlist.filter((id) => {
      return id !== songId;
    });
    this.setState({
      playlist: newPlaylist
    });
  }

  render () {
    return <div>
      <MyAppBar
        noteAudioPlayer={this.props.noteAudioPlayer}
        showPlaylist={this.props.showPlaylist}
        filter={this.state.filter}
        playlist={this.state.playlist}
        handleFilterChange={this.handleFilterChange}
        />
      <SongList
        loaded={this.props.songDataLoaded}
        songs={ this.props.showPlaylist ?
          SongUtils.getPlaylistSongs(this.props.songs, '', this.state.playlist) :
          SongUtils.getFilteredSongs(this.props.songs, this.state.filter) }
        handleAddToPlaylist={ this.props.showPlaylist ? undefined : this.handleAddToPlaylist }
        handleRemoveFromPlaylist={ this.props.showPlaylist ? this.handleRemoveFromPlaylist : undefined }
        noteAudioPlayer={this.props.noteAudioPlayer} />
    </div>
  }
}

export default SongSearchPage;
