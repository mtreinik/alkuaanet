import AUDIO_FILES from './NoteAudioFiles';

const DURATION=1100
const DELAY=400

function getFirstNote(notes:string):string {
  return notes.replace(/-.*/, '');
}

function getRestOfNotes(notes:string):string {
  if (notes.indexOf('-') > -1) {
    return notes.replace(/[^-]*-/, '');
  }
  return '';
}

function convertFlatsToSharps(originalNote:string):string {
  const newNote = originalNote
    .replace(/B/, 'A#')
    .replace(/Ab/, 'G#')
    .replace(/Gb/, 'F#')
    .replace(/Eb/, 'D#')
    .replace(/Db/, 'C#');
  return newNote;
}

function playLoadedAudio(audio:HTMLAudioElement) {
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0;
  }
  audio.play();
}

function playLoadedAudios(audios:HTMLAudioElement[]) {
  if (audios.length === 0) {
    return;
  }
  const [firstAudio, ...restAudios] = audios;
  setTimeout(() => {
    playLoadedAudio(firstAudio);
    playLoadedAudios(restAudios);
  }, DELAY);
}

class NoteAudioPlayer {

  playNotes(notes:string, handleStartPlayback:() => void, handleEndPlayback:() => void):void {
    const loadedAudiosPromise:Promise<HTMLAudioElement[]> =
      Promise.all(this.loadAudios(notes));
    loadedAudiosPromise
      .then((audios:HTMLAudioElement[]) => {
        if (handleStartPlayback) {
          handleStartPlayback();
        }
        if (handleEndPlayback) {
          setTimeout(handleEndPlayback,
            DURATION + (audios.length * DELAY));
        }
        playLoadedAudios(audios);
      })
      .catch(alert);
  }

  loadAudios(notes:string):Promise<HTMLAudioElement>[] {
      if (notes.length > 0) {
        const firstNote = getFirstNote(notes);
        const loadedAudio = this.loadAudio(firstNote);
        return [loadedAudio, ...this.loadAudios(getRestOfNotes(notes))];
      } else {
        return [];
      }
  }

  loadAudio(originalNote:string):Promise<HTMLAudioElement> {
    const note = convertFlatsToSharps(originalNote);
    const mappedAudioFile = AUDIO_FILES.find(function (candidate) {
      return candidate.note === note;
    });
    if (!mappedAudioFile) {
      console.warn('could not find audio file for note ' + note);
      return Promise.reject(note);
    }
    const audioFile = mappedAudioFile.audioFile;
    const audio = new Audio(audioFile);
    audio.load();
    const promise = new Promise<HTMLAudioElement>((resolve) => {

      const canPlayThrough = () => {
        audio.removeEventListener('canplaythrough', canPlayThrough);
        resolve(audio);
      }

      audio.addEventListener('canplaythrough', canPlayThrough);

    });
    return promise;
  }
}

export default NoteAudioPlayer;
