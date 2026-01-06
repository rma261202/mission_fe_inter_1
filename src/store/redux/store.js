import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice'; // 1. Import reducer yang baru dibuat

export const store = configureStore({
  reducer: {
    movies: movieReducer, // 2. Daftarkan reducer di sini
  },
});