import type { Movie, MovieDetail } from '../shared/movieTypes';
import { get } from '../utils/fetchHelper';

export const moviesService = {
  getMovies: async (genreId?: number): Promise<Movie[]> => {
    const params = genreId ? { genre_id: genreId } : undefined;
    const response = await get<Movie[]>('/api/v1/movies', params);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data || [];
  },

  getMoviesByGenre: async (genreId: number): Promise<Movie[]> => {
    const response = await get<Movie[]>(`/api/v1/movie-genres/genre/${genreId}/movies`);

    if (response.error) {
      throw new Error(response.error);
    }

    return response.data ?? [];
  },

  getMovieById: async (movieId: number): Promise<MovieDetail> => {
    const response = await get<MovieDetail>(`/api/v1/movies/${movieId}`);

    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data) {
      throw new Error('Movie not found');
    }

    return response.data;
  },


};

