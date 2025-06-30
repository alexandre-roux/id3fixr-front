import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OriginalTags {
  title: string;
  artist: string[];
  album: string;
  genre: string[];
  year: string;
  track: { no: number; of: number };
  picture: { format: string; data: number[] }[];
}

interface FileState {
  originalFile: File | null;
  originalTags: OriginalTags | null;
  newTitle: string;
  newArtist: string;
  newAlbum: string;
  newGenre: string;
  newYear: string;
  newTrack: string;
  newImage: string;
  displayResults: boolean;
}

const initialState: FileState = {
  originalFile: null,
  originalTags: null,
  newTitle: '',
  newArtist: '',
  newAlbum: '',
  newGenre: '',
  newYear: '',
  newTrack: '',
  newImage: 'https://www.chordie.com/images/no-cover.png',
  displayResults: true,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setOriginalFile(state, action: PayloadAction<File | null>) {
      state.originalFile = action.payload;
    },
    setOriginalTags(state, action: PayloadAction<OriginalTags | null>) {
      state.originalTags = action.payload;
    },
    setNewTitle(state, action: PayloadAction<string>) {
      state.newTitle = action.payload;
    },
    setNewArtist(state, action: PayloadAction<string>) {
      state.newArtist = action.payload;
    },
    setNewAlbum(state, action: PayloadAction<string>) {
      state.newAlbum = action.payload;
    },
    setNewGenre(state, action: PayloadAction<string>) {
      state.newGenre = action.payload;
    },
    setNewYear(state, action: PayloadAction<string>) {
      state.newYear = action.payload;
    },
    setNewTrack(state, action: PayloadAction<string>) {
      state.newTrack = action.payload;
    },
    setNewImage(state, action: PayloadAction<string>) {
      state.newImage = action.payload;
    },
    setDisplayResults(state, action: PayloadAction<boolean>) {
      state.displayResults = action.payload;
    },
    resetNewTags(state) {
      state.newTitle = '';
      state.newArtist = '';
      state.newAlbum = '';
      state.newGenre = '';
      state.newYear = '';
      state.newTrack = '';
      state.newImage = 'https://www.chordie.com/images/no-cover.png';
      state.originalTags = null;
    },
  },
});

export const {
  setOriginalFile,
  setOriginalTags,
  setNewTitle,
  setNewArtist,
  setNewAlbum,
  setNewGenre,
  setNewYear,
  setNewTrack,
  setNewImage,
  setDisplayResults,
  resetNewTags,
} = fileSlice.actions;

export default fileSlice.reducer;
export type { OriginalTags as Tags, FileState }; 