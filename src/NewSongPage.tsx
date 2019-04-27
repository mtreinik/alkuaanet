import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import MySimpleAppBar from './MySimpleAppBar';
import NoteAudioPlayer from './NoteAudioPlayer';
import NoteUtils from './NoteUtils';

enum FormStatus {
  WaitingForInput,
  Sending,
  Sent,
  Error
}

interface Props {
  noteAudioPlayer: NoteAudioPlayer,
  playlist: number[]
}

interface FormContentState {
  title: string,
  composer: string,
  arranger: string,
  poet: string,
  lyrics: string,
  notes: string,
}

interface State extends FormContentState {
  formStatus: FormStatus,
  message: string,
  errorMessage: string
}

function getEmptyState():State {
  return {
    title: '',
    composer: '',
    arranger: '',
    poet: '',
    lyrics: '',
    notes: '',
    formStatus: FormStatus.WaitingForInput,
    message: '',
    errorMessage: '',
  }
}

class NewSongPage extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = getEmptyState();
  }

  clearForm = ():void => {
    this.setState(getEmptyState());
  }

  sendSong = ():void => {
    if (this.isInvalidForm()) {
      this.setState({
        formStatus: FormStatus.Error,
        errorMessage: 'Ole hyvä ja täytä kaikki pakolliset tiedot.'
      })
    } else {
      this.setState({
        formStatus: FormStatus.Sending,
        message: 'Odota, tietoja lähetetään...'
      }, () => {
        console.log('sending song suggestion');
        const host = process.env.NODE_ENV === 'production' ? window.location.origin : 'https://alkuaa.net';
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('lyrics', this.state.lyrics);
        formData.append('notes', NoteUtils.convertHtoB(this.state.notes));
        formData.append('composer', this.state.composer);
        formData.append('arranger', this.state.arranger);
        formData.append('poet', this.state.poet);
        fetch(host + '/addsong.fcgi', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            console.log('song suggestion sent, data=',data);
            this.setState({
              formStatus: FormStatus.Sent,
              message: 'Ehdotus lähetetty. Kiitos!'
            });
          })
          .catch(error => {
            console.error(error);
            this.setState({
              formStatus: FormStatus.Error,
              errorMessage: 'Virhe lähetyksessä: ' + JSON.stringify(error)
            });
          })
      });
    }
  };

  handleChange = (name: keyof FormContentState) => (event: React.ChangeEvent<HTMLInputElement>):void => {
    this.setState({ [name]: event.target.value } as Pick<State, keyof FormContentState>);
  };

  isInvalidForm = ():boolean => {
    const requiredFields:(keyof FormContentState)[] = ['title', 'lyrics', 'notes'];
    return requiredFields.some((name: keyof FormContentState) => {
      return this.isInvalidRequiredField(name);
    });
  }

  isInvalidRequiredField = (name: keyof FormContentState):boolean => {
    return this.state[name] === '';
  }

  render() {
    return <div>
      <MySimpleAppBar
        noteAudioPlayer={this.props.noteAudioPlayer}
        playlist={this.props.playlist}
        title="Lisää uusi laulu"
        />
      <Paper style={{margin: "1em", padding: "1em"}}>
        <div>
          <h1>Lisää uusi laulu</h1>
          { this.state.formStatus !== FormStatus.Sending &&
            this.state.formStatus !== FormStatus.Sent &&
            <form>
              <TextField
                label="Laulun nimi"
                placeholder="esim. Metsänhartaus"
                required
                error={this.state.formStatus === FormStatus.Error && this.isInvalidRequiredField('title')}
                fullWidth
                margin="normal"
                value={this.state.title}
                onChange={this.handleChange('title')}
                />
              <TextField
                label="Alkusanat"
                placeholder="Alkusanat, esim. Mä metsän vihreen helmassa"
                required
                error={this.state.formStatus === FormStatus.Error && this.isInvalidRequiredField('lyrics')}
                fullWidth
                margin="normal"
                value={this.state.lyrics}
                onChange={this.handleChange('lyrics')}
                    />
              <TextField
                label="Alkuäänet"
                placeholder="Alkuäänet, esim. C4-Ab3-Eb3-Ab2"
                helperText={
                  `Koneluettava versio alkuäänistä.
                   Muoto on C4-Ab3-Eb3-Ab2, missä C4=pianon keski-C (tenoriavaimen ensimmäinen ala-apuviiva).
                   Ylennykset merkitään esim. F#3, alennukset esim. Ab4.
                   Suoraan C4:n alapuolella on H3 ja sen alla B3.`
                }
                required
                error={this.state.formStatus === FormStatus.Error && this.isInvalidRequiredField('notes')}
                fullWidth
                margin="normal"
                value={this.state.notes}
                onChange={this.handleChange('notes')}
                />
              <TextField
                label="Säveltäjä"
                placeholder="Säveltäjä, esim. Emil Genetz"
                fullWidth
                margin="normal"
                value={this.state.composer}
                onChange={this.handleChange('composer')}
                />
              <TextField
                label="Sovittaja"
                placeholder="Sovittaja, esim. Esko Kallio"
                fullWidth
                margin="normal"
                value={this.state.arranger}
                onChange={this.handleChange('arranger')}
                />
              <TextField
                label="Sanoittaja"
                placeholder="Sanoittaja, esim. P. J. Hannikainen"
                fullWidth
                margin="normal"
                value={this.state.poet}
                onChange={this.handleChange('poet')}
                />
              <p>
                Voit ehdottaa uuden laulun lisäämistä alkuäänilistalle.
                Kaikki ehdotukset tarkistetaan manuaalisesti ennen kuin ne lisätään näkyville.
              </p>
              { this.state.formStatus === FormStatus.Error &&
                <div style={{color: "red"}}>
                  {this.state.errorMessage}
                </div>
              }
              <Fab
                  variant="extended"
                  onClick={this.sendSong}>
                <Icon>send</Icon>
                Lähetä ehdotus
              </Fab>
            </form>
          }
          { this.state.message !== '' &&
            <div>
              <p style={{color: "green"}}>
                {this.state.message}
              </p>
              <Button
                variant="outlined"
                disabled={ this.state.formStatus === FormStatus.Sending }
                onClick={this.clearForm}>
                Ehdota uutta laulua
              </Button>
            </div>
          }
        </div>
      </Paper>
    </div>
  }
}

export default NewSongPage;
