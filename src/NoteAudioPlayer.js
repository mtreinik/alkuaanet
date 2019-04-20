import audioFileAsharp2 from "./audio/Asharp2.mp3";
import audioFileAsharp3 from "./audio/Asharp3.mp3";
import audioFileAsharp4 from "./audio/Asharp4.mp3";
import audioFileA2 from "./audio/A2.mp3";
import audioFileA3 from "./audio/A3.mp3";
import audioFileA4 from "./audio/A4.mp3";
import audioFileB2 from "./audio/B2.mp3";
import audioFileB3 from "./audio/B3.mp3";
import audioFileB4 from "./audio/B4.mp3";
import audioFileCsharp2 from "./audio/Csharp2.mp3";
import audioFileCsharp3 from "./audio/Csharp3.mp3";
import audioFileCsharp4 from "./audio/Csharp4.mp3";
import audioFileC2 from "./audio/C2.mp3";
import audioFileC3 from "./audio/C3.mp3";
import audioFileC4 from "./audio/C4.mp3";
import audioFileDsharp2 from "./audio/Dsharp2.mp3";
import audioFileDsharp3 from "./audio/Dsharp3.mp3";
import audioFileDsharp4 from "./audio/Dsharp4.mp3";
import audioFileD2 from "./audio/D2.mp3";
import audioFileD3 from "./audio/D3.mp3";
import audioFileD4 from "./audio/D4.mp3";
import audioFileE2 from "./audio/E2.mp3";
import audioFileE3 from "./audio/E3.mp3";
import audioFileE4 from "./audio/E4.mp3";
import audioFileFsharp2 from "./audio/Fsharp2.mp3";
import audioFileFsharp3 from "./audio/Fsharp3.mp3";
import audioFileFsharp4 from "./audio/Fsharp4.mp3";
import audioFileF2 from "./audio/F2.mp3";
import audioFileF3 from "./audio/F3.mp3";
import audioFileF4 from "./audio/F4.mp3";
import audioFileGsharp2 from "./audio/Gsharp2.mp3";
import audioFileGsharp3 from "./audio/Gsharp3.mp3";
import audioFileGsharp4 from "./audio/Gsharp4.mp3";
import audioFileG2 from "./audio/G2.mp3";
import audioFileG3 from "./audio/G3.mp3";
import audioFileG4 from "./audio/G4.mp3";

const AUDIO_FILES = [
  { note: "A#2", audioFile: audioFileAsharp2 },
  { note: "A#3", audioFile: audioFileAsharp3 },
  { note: "A#4", audioFile: audioFileAsharp4 },
  { note: "A2", audioFile: audioFileA2 },
  { note: "A3", audioFile: audioFileA3 },
  { note: "A4", audioFile: audioFileA4 },
  { note: "H2", audioFile: audioFileB2 },
  { note: "H3", audioFile: audioFileB3 },
  { note: "H4", audioFile: audioFileB4 },
  { note: "C#2", audioFile: audioFileCsharp2 },
  { note: "C#3", audioFile: audioFileCsharp3 },
  { note: "C#4", audioFile: audioFileCsharp4 },
  { note: "C2", audioFile: audioFileC2 },
  { note: "C3", audioFile: audioFileC3 },
  { note: "C4", audioFile: audioFileC4 },
  { note: "D#2", audioFile: audioFileDsharp2 },
  { note: "D#3", audioFile: audioFileDsharp3 },
  { note: "D#4", audioFile: audioFileDsharp4 },
  { note: "D2", audioFile: audioFileD2 },
  { note: "D3", audioFile: audioFileD3 },
  { note: "D4", audioFile: audioFileD4 },
  { note: "E2", audioFile: audioFileE2 },
  { note: "E3", audioFile: audioFileE3 },
  { note: "E4", audioFile: audioFileE4 },
  { note: "F#2", audioFile: audioFileFsharp2 },
  { note: "F#3", audioFile: audioFileFsharp3 },
  { note: "F#4", audioFile: audioFileFsharp4 },
  { note: "F2", audioFile: audioFileF2 },
  { note: "F3", audioFile: audioFileF3 },
  { note: "F4", audioFile: audioFileF4 },
  { note: "G#2", audioFile: audioFileGsharp2 },
  { note: "G#3", audioFile: audioFileGsharp3 },
  { note: "G#4", audioFile: audioFileGsharp4 },
  { note: "G2", audioFile: audioFileG2 },
  { note: "G3", audioFile: audioFileG3 },
  { note: "G4", audioFile: audioFileG4 },
];

const DURATION=1100
const DELAY=400

function getFirstNote(notes) {
  return notes.replace(/-.*/, '');
}

function getRestOfNotes(notes) {
  if (notes.indexOf('-') > -1) {
    return notes.replace(/[^-]*-/, '');
  }
  return '';
}

function convertFlatsToSharps(originalNote) {
  const newNote = originalNote
    .replace(/B/, 'A#')
    .replace(/Ab/, 'G#')
    .replace(/Gb/, 'F#')
    .replace(/Eb/, 'D#')
    .replace(/Db/, 'C#');
  return newNote;
}

function playLoadedAudio(audio) {
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0;
  }
  audio.play();
}

function playLoadedAudios(audios) {
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
//  audios;
//  constructor () {
//    this.audios = [];
//  }

  playNotes(notes, handleStartPlayback, handleEndPlayback) {
    const loadedAudiosPromise = Promise.all(this.loadAudios(notes));
    loadedAudiosPromise
      .then((audios) => {
        if (handleStartPlayback && handleEndPlayback) {
          handleStartPlayback();
          setTimeout(
            handleEndPlayback,
            DURATION + (audios.length * DELAY));
        } else {
          console.log('no handler for starting and ending playback');
        }
        playLoadedAudios(audios);
      })
      .catch(alert);
  }

  loadAudios(notes) {
      if (notes.length > 0) {
        const firstNote = getFirstNote(notes);
        const loadedAudio = this.loadAudio(firstNote);
        return [loadedAudio, ...this.loadAudios(getRestOfNotes(notes))];
      } else {
        return [];
      }
  }

  loadAudio(originalNote) {
    const note = convertFlatsToSharps(originalNote);
    // const audio = this.audios[note];
    // if (!audio) {
      const mappedAudioFile = AUDIO_FILES.find(function (candidate) {
        return candidate.note === note;
      });
      if (!mappedAudioFile) {
        console.warn('could not find audio file for note ' + note);
        return Promise.reject(note);
      }
      const audioFile = mappedAudioFile.audioFile;
      const audio = new Audio(audioFile);
      // disabled recycling of audio media elements
      //this.audios[note] = audio;
      audio.load();
      const promise = new Promise((resolve) => {

        const canPlayThrough = (event) => {
          audio.removeEventListener('canplaythrough', canPlayThrough);
          resolve(audio);
        }

        audio.addEventListener('canplaythrough', canPlayThrough);

      });
      return promise;
    // } else {
    //   return Promise.resolve(audio);
    // }
  }
}
export default NoteAudioPlayer;
