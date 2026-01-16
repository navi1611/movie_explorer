import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { directorsService } from '../../../services/directors';
import type { Director, DirectorDetail } from '../../../shared/movieTypes';

interface DirectorsState {
  directors: Director[];
  selectedDirector: DirectorDetail | null;
  loading: boolean;
  directorDetailLoading: boolean;
  error: string | null;
  directorDetailError: string | null;
}

const initialState: DirectorsState = {
  directors: [],
  selectedDirector: null,
  loading: false,
  directorDetailLoading: false,
  error: null,
  directorDetailError: null,
};

export const fetchDirectors = createAsyncThunk(
  'directors/fetchDirectors',
  async (_, { rejectWithValue }) => {
    try {
      const directors = await directorsService.getDirectors();
      return directors;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch directors'
      );
    }
  }
);

export const fetchDirectorById = createAsyncThunk(
  'directors/fetchDirectorById',
  async (directorId: number, { rejectWithValue }) => {
    try {
      const director = await directorsService.getDirectorById(directorId);
      return director;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch director'
      );
    }
  }
);

const directorsSlice = createSlice({
  name: 'directors',
  initialState,
  reducers: {
    clearDirectors: (state) => {
      state.directors = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDirectors.fulfilled, (state, action: PayloadAction<Director[]>) => {
        state.loading = false;
        state.directors = action.payload;
      })
      .addCase(fetchDirectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load directors';
      })
      .addCase(fetchDirectorById.pending, (state) => {
        state.directorDetailLoading = true;
        state.directorDetailError = null;
      })
      .addCase(fetchDirectorById.fulfilled, (state, action: PayloadAction<DirectorDetail>) => {
        state.directorDetailLoading = false;
        state.selectedDirector = action.payload;
      })
      .addCase(fetchDirectorById.rejected, (state, action) => {
        state.directorDetailLoading = false;
        state.directorDetailError = action.payload as string || 'Failed to load director';
        state.selectedDirector = null;
      });
  },
});

export const { clearDirectors } = directorsSlice.actions;
export default directorsSlice.reducer;

