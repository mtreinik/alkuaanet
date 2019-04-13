import React from 'react';
import Button from '@material-ui/core/Button';
import logo from './img/aanirauta-32.png';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  playing: {
    width: 40,
    height: 'auto',
    transition: 'width 0.5s',
  },
  stopped: {
    width: 32,
    height: 'auto',
    transition: 'width 0.5s'
  }
};

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      playing: false
//    length: 0
    };
  }
  /*
  handleClickOpen = () => {
    this.props.noteAudioPlayer.playNote('A4');
  //  this.props.noteAudioPlayer.playNote('A4', true);
  //  this.setState({ open: true });
  };
  */
  handleClose = () => {
    this.setState({ open: false });
  };

  playNote = () => {
    this.props.noteAudioPlayer.playNotes('A4', this.startPlayback, this.endPlayback);
//    this.setState({length: this.state.length + 1});
  }
/*
  handleDeviceMotion = event => {
    const a = event.acceleration;
    let length = a.x * a.x + a.y * a.y + a.z * a.z;
    this.setState({length: length + this.state.length})
    if (length > 100.0) {
      this.playNote();
    }
  }
  componentDidMount() {
    window.addEventListener('devicemotion', this.handleDeviceMotion, true);
  }
  componentWillUnmount() {
    window.removeEventListener('devicemotion', this.handleDeviceMotion, true);
  }
*/

  startPlayback = () => {
    console.log('playing');
    this.setState({
      playing: true
    })
  }
  endPlayback = () => {
    console.log('stopping');
    this.setState({
      playing: false
    })
  }

  render () {
//    window.addEventListener('devicemotion', this.handleDeviceMotion);
    const { classes } = this.props;
    return <div>
      <Button onClick={this.playNote}>
        <img
          src={logo}
          alt="Äänirauta"
          className={ this.state.playing ? classes.playing : classes.stopped }
          />
      </Button>

    </div>
  }
}

export default withStyles(styles)(Logo);
