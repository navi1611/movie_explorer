import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { fetchMovies } from '../../store/slice/Movies';
import MovieCard from '../../components/MovieCard';
import PageLoader from '../../components/PageLoader';
import EmptyMovie from '../../components/NoMovies';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) {
    return (
      <PageLoader/>
    );
  }

  if (error) {
    return (
      <div className="fade-in-up">
        <h1 className="text-4xl font-bold mb-4">Top Movies</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <h1 className="text-4xl font-bold mb-4">Top Movies</h1>
      {movies.length === 0 ? (
        <EmptyMovie/>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              description={movie.description || ''}
              rating={movie.rating ? Number(movie.rating) : 0}
              releaseDate={movie.release_year.toString()}
              image={movie.poster_url || undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
