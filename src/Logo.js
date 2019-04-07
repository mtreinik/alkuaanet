import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import logo from './img/aanirauta-32.png';
import tuningFork from './img/aanirauta.png';

const tuningForkStyle = {
  maxWidth: "95%",
  display: "block",
  margin: "auto"
}

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Logo extends React.Component {
  state = {
    open: false,
//    length: 0
  };
  handleClickOpen = () => {
    this.props.noteAudioPlayer.playNote('A4', true);
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  playNote = () => {
    this.props.noteAudioPlayer.playNote('A4');
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
  render () {
//    window.addEventListener('devicemotion', this.handleDeviceMotion);

    return <div>
      <Button>
        <img
          src={logo}
          alt="Äänirauta"
          onClick={this.handleClickOpen}
          />
      </Button>
      <Dialog
        fullScreen
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}>
        <Fab onClick={this.handleClose} style={{margin: "0.5em"}}>
          <Icon>close</Icon>
        </Fab>
        <img
          src={tuningFork}
          alt="Äänirauta"
          style={tuningForkStyle}
          onClick={this.playNote}
          />
      </Dialog>
    </div>
  }
}

export default Logo;
