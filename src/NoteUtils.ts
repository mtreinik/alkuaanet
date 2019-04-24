
class NoteUtils {

  static convertBtoH(notes:string):string {
    return notes.replace(/B/g, 'H').replace(/Hb/g, 'B');
  }

  static convertHtoB(notes:string):string {
    return notes.replace(/B/g, 'Bb').replace(/H/g, 'B');
  }

}

export default NoteUtils;
