import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  playArrow: {
    marginLeft: "1em"
  }
};

class SongItem extends React.Component {
  playNotes = (notes) => () => {
    this.props.noteAudioPlayer.playNotes(notes);
  }
  render () {
    const { classes } = this.props;
    const secondary = this.props.lyrics +
      (this.props.composer ? ` – <em>säv. ${this.props.composer}</em>` : '') +
      (this.props.poet ? `, <em>san. ${this.props.poet}</em>` : '');
    return <ListItem
        button
        onClick={this.playNotes(this.props.notes)}>
      <ListItemText
        button="true"
        primary={this.props.title}
        secondary={secondary}/>
      {this.props.notes}
      <ListItemIcon className={classes.playArrow}>
        <Icon>play_arrow</Icon>
      </ListItemIcon>
    </ListItem>;
  }
}

export default withStyles(styles)(SongItem);
