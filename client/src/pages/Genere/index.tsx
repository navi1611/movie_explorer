import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import MovieCard from '../../components/MovieCard';
import PageLoader from '../../components/PageLoader';
import { fetchMoviesByGenre } from '../../store/slice/Movies';
import { Link, useParams } from 'react-router-dom';
import EmptyMovie from '../../components/NoMovies';

const GenereMovies: React.FC = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { movies, loading, error } = useSelector((state: RootState) => {
    return state.movies;
  });


  const { genres } = useSelector((state: RootState) => {
    return state.genres;
  });

  const genreName = useMemo(() => {
    if (!genreId) return '';
    return genres.find((g) => g.id === Number(genreId))?.name ?? '';
  }, [genres, genreId]);

  useEffect(() => {
    if (!genreId || genres.length === 0) return;


    dispatch(fetchMoviesByGenre(Number(genreId)));
  }, [dispatch, genreId, genres]);

  if (loading) {
    return (
      <PageLoader />
    );
  }

  if (error) {
    return (
      <div className="fade-in-up">
        <h1 className="text-4xl font-bold mb-4"> {genreName} Movies</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <h1 className="text-4xl font-bold mb-4">{genreName} Movies</h1>
      {movies?.length === 0 ? (
        <EmptyMovie/>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies?.map((movie) => (
            <Link
              key={`${movie.id}`}
              to={`/movie/${movie.id}`}
              className="group"
            >
              <MovieCard
                key={movie.id}
                title={movie.title}
                description={movie.description || ''}
                rating={movie.rating ? Number(movie.rating) : 0}
                releaseDate={movie.release_year.toString()}
                genre={genreName}
                image={movie.poster_url || undefined}
              />

            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenereMovies;
