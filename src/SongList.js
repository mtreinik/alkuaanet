import React from 'react';
import List from '@material-ui/core/List';
import SongItem from './SongItem.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openItemId: null
    };
  }

  handleOpenClose = (itemId) => {
    this.setState({
      openItemId: this.state.openItemId === itemId ? null : itemId
    });
  }

  render () {

    return <div>
      { this.props.loaded || (
          <CircularProgress color="secondary" style={{margin: "1em"}}/>
        )
      }
      <List>
        {this.props.songs.map(song => (
          <SongItem
            key={song.id}
            id={song.id}
            open={this.state.openItemId === song.id ? true : false}
            handleOpenClose={this.handleOpenClose}
            noteAudioPlayer={this.props.noteAudioPlayer}
            {...song}
            />
        ))}
      </List>
    </div>;
  }
}

export default SongList;
