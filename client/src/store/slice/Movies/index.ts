import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { moviesService } from '../../../services/movies';
import type { Movie, MovieDetail } from '../../../shared/movieTypes';

interface MoviesState {
  movies: Movie[];
  selectedMovie: MovieDetail | null;
  loading: boolean;
  movieDetailLoading: boolean;
  error: string | null;
  movieDetailError: string | null;
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  movieDetailLoading: false,
  error: null,
  movieDetailError: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (genreId?: number, { rejectWithValue }) => {
    try {
      const movies = await moviesService.getMovies(genreId);
      return movies;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch movies'
      );
    }
  }
);


export const fetchMoviesByGenre = createAsyncThunk<
  Movie[],
  number ,
  { rejectValue: string }
>(
  'movies/fetchMoviesByGenre',
  async (genreId, { rejectWithValue }) => {
    try {
      const movies = await moviesService.getMoviesByGenre(genreId);
      return movies;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to fetch movies by genre'
      );
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (movieId: number, { rejectWithValue }) => {
    try {
      const movie = await moviesService.getMovieById(movieId);
      return movie;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch movie'
      );
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.movies = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load movies';
      })
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action: PayloadAction< Movie[]>) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load movies by genre';
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.movieDetailLoading = true;
        state.movieDetailError = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action: PayloadAction<MovieDetail>) => {
        state.movieDetailLoading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.movieDetailLoading = false;
        state.movieDetailError = action.payload as string || 'Failed to load movie';
        state.selectedMovie = null;
      });
  },
});

export const { clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;

