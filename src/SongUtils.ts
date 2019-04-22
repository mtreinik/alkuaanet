// Song utils

export interface Song {
  id: number,
  title: string,
  lyrics: string,
  notes: string
  composer?: string,
  poet?: string,
}

class SongUtils {

  static getPlaylistSongs(songs:Song[], filter:string, playlist:number[]) {
    if (!playlist) {
      return [];
    }
    const filteredSongs = SongUtils.getFilteredSongs(songs, filter);
    const playlistSongs = playlist.reduce((playlistSongs: Song[], songId: number) => {
      const songToAdd = filteredSongs.find((song) => {
        return song.id === songId;
      });
      return songToAdd ? [...playlistSongs, songToAdd] : playlistSongs;
    }, []);
    return playlistSongs;
  }

  static getFilteredSongs(songs:Song[], filter:string):Song[] {
    const lowerCaseFilter = filter.toLowerCase();
    const filteredSongs = songs.filter(song => {
      return song.title.toLowerCase().includes(lowerCaseFilter) ||
        song.lyrics.toLowerCase().includes(lowerCaseFilter);
    });
    return filteredSongs;
  }

  static getPlayListFromUrlParam(param:string) {
    if (!param) {
      return [];
    }
    const params = param.split(',');
    const parsedInts = params.map(strParam => {
      return parseInt(strParam);
    });
    return parsedInts;
  }

  static getPlaylistPath(playlist:number[]) {
    const playlistPath = playlist.join(',');
    return playlistPath;
  }
  static getPlaylistUrl(playlist:number[]) {
    const playlistUrl = window.location.origin + '/lista/' + SongUtils.getPlaylistPath(playlist);
    return playlistUrl;
  }

}

export default SongUtils;
