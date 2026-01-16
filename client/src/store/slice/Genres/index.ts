import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { genresService } from '../../../services/genres';
import type { Genre, Movie } from '../../../shared/movieTypes';

interface GenresState {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

const initialState: GenresState = {
  genres: [],
  loading: false,
  error: null,
};

export const fetchGenres = createAsyncThunk(
  'genres/fetchGenres',
  async (_, { rejectWithValue }) => {
    try {
      const genres = await genresService.getGenres();
      return genres;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch genres'
      );
    }
  }
);

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    clearGenres: (state) => {
      state.genres = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action: PayloadAction<Genre[]>) => {
        state.loading = false;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load genres';
      });
  },
});

export const { clearGenres } = genresSlice.actions;
export default genresSlice.reducer;

