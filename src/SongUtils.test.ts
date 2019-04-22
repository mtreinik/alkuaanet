import SongUtils from './SongUtils';
import { Song } from './SongUtils';

const songs:Song[] = [
  {
    id: 1,
    title: 'Foo',
    lyrics: 'Foo faa fuu',
    notes: 'A4'
  },
  {
    id: 2,
    title: 'Bar',
    lyrics: 'Bii baa buu boo',
    notes: 'C4'
  },
  {
    id: 3,
    title: 'Foobar',
    lyrics: 'Xaa xuu',
    notes: 'C4'
  }
];

it('returns playlist songs', () => {
  expect(SongUtils.getPlaylistSongs(songs, 'Foo', [1, 2])).toEqual([
    {
      id: 1,
      title: 'Foo',
      lyrics: 'Foo faa fuu',
      notes: 'A4'
    }
  ]);
});

it('returns filtered songs', () => {
  expect(SongUtils.getFilteredSongs(songs, 'Foo')).toEqual([
    {
      id: 1,
      title: 'Foo',
      lyrics: 'Foo faa fuu',
      notes: 'A4'
    },
    {
        id: 3,
        title: 'Foobar',
        lyrics: 'Xaa xuu',
        notes: 'C4'
      }
  ]);
  expect(SongUtils.getFilteredSongs(songs, 'Baz')).toEqual([]);
});

it('returns playlist from url parameter', () => {
  expect(SongUtils.getPlayListFromUrlParam('')).toEqual([]);
  expect(SongUtils.getPlayListFromUrlParam('66')).toEqual([66]);
  expect(SongUtils.getPlayListFromUrlParam('1,5,7')).toEqual([1, 5, 7]);
  expect(SongUtils.getPlayListFromUrlParam('1,7,7,5,7')).toEqual([1, 7, 7, 5, 7]);
});

it('returns playlist path', () => {
  expect(SongUtils.getPlaylistPath([])).toEqual('');
  expect(SongUtils.getPlaylistPath([128])).toEqual('128');
  expect(SongUtils.getPlaylistPath([3, 9, 2])).toEqual('3,9,2');
  expect(SongUtils.getPlaylistPath([3, 3, 9, 2])).toEqual('3,3,9,2');
});

it('returns playlist url', () => {
  expect(SongUtils.getPlaylistUrl([])).toEqual(window.location.origin + '/lista/');
  expect(SongUtils.getPlaylistUrl([128])).toEqual(window.location.origin + '/lista/128');
  expect(SongUtils.getPlaylistUrl([3, 9, 2])).toEqual(window.location.origin + '/lista/3,9,2');
  expect(SongUtils.getPlaylistUrl([3, 3, 9, 2])).toEqual(window.location.origin + '/lista/3,3,9,2');
});
