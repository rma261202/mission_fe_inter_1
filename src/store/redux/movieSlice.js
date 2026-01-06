import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  // Instruksi: Initial State berupa array kosong
  initialState: {
    movies: [], 
  },
  reducers: {
    // Reducer untuk menyimpan data API ke dalam state global
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovies } = movieSlice.actions;
export default movieSlice.reducer;