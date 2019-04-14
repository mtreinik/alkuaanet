import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link';

function Transition(props:Props) {
  return <Slide direction="down" {...props} />;
}

interface Props {
}

interface State {
  open: boolean
}

class Logo extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };

  render () {
    return <div>
      <IconButton onClick={this.handleClickOpen}>
        <Icon>help</Icon>
      </IconButton>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}>
        <Button
          onClick={this.handleClose}
          style={{
            marginLeft: "auto"
          }}>
          <Icon>close</Icon>
        </Button>
        <div style={{margin: "1em"}}>
          <h2>alkuaa.net</h2>
          <p>Alkuäänet mieskuorokappaleisiin.</p>
          <p>Tekijä: Mikko Reinikainen</p>
          <Link color="inherit"
            href="https://github.com/mtreinik/alkuaanet/">
            github.com/mtreinik/alkuaanet
          </Link>
        </div>
      </Dialog>
    </div>
  }
}

export default Logo;
