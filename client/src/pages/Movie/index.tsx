import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store';
import PageLoader from '../../components/PageLoader';
import { fetchMovieById } from '../../store/slice/Movies';
import {
  Calendar,
  Clock,
  Star,
  User,
  Film,
  Users,
  ArrowLeft,
  Tag
} from 'lucide-react';
import { formatDuration } from '../../utils';

const MoviePage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMovie, movieDetailLoading, movieDetailError } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieById(Number(movieId)));
    }
  }, [dispatch, movieId]);

  if (movieDetailLoading) {
    return <PageLoader />;
  }

  if (movieDetailError || !selectedMovie) {
    return (
      <div className="fade-in-up flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-primary">Movie Not Found</h2>
        <p className="text-white/60 mb-6">{movieDetailError || 'The movie you are looking for does not exist.'}</p>
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-6 text-white/80 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Movies</span>
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-shrink-0">
          <div className="w-full lg:w-80 h-[500px] bg-background-card-light rounded-lg overflow-hidden shadow-2xl">
            {selectedMovie.poster_url ? (
              <img
                src={selectedMovie.poster_url}
                alt={selectedMovie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-background-card-light">
                <Film className="w-24 h-24 text-white/20" />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              {selectedMovie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              {selectedMovie.rating && (
                <div className="flex items-center gap-2 px-3 py-1 bg-background-card rounded-lg">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="font-semibold text-white">
                    {Number(selectedMovie.rating).toFixed(1)}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-4 h-4" />
                <span>{selectedMovie.release_year}</span>
              </div>

              {selectedMovie.duration_minutes && (
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(selectedMovie.duration_minutes)}</span>
                </div>
              )}
            </div>
          </div>

          {selectedMovie.description && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-white">Overview</h2>
              <p className="text-white/80 leading-relaxed">{selectedMovie.description}</p>
            </div>
          )}

          {selectedMovie.genres && selectedMovie.genres.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Genres
              </h2>
              <div className="flex flex-wrap gap-2">
                {selectedMovie.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genre/${genre.id}`}
                    className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-lg hover:bg-primary/30 transition-colors"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {selectedMovie.director && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                <User className="w-5 h-5" />
                Director
              </h2>
              <Link
                to={`/director/${selectedMovie.director.id}`}
                className="block px-4 py-3 bg-background-card rounded-lg hover:bg-background-card-light transition-colors"
              >
                <p className="text-white font-medium hover:text-primary transition-colors">{selectedMovie.director.name}</p>
                {selectedMovie.director.nationality && (
                  <p className="text-white/60 text-sm mt-1">
                    {selectedMovie.director.nationality}
                    {selectedMovie.director.birth_year && ` • Born ${selectedMovie.director.birth_year}`}
                  </p>
                )}
              </Link>
            </div>
          )}

          {selectedMovie.movie_actors && selectedMovie.movie_actors.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                Cast
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedMovie.movie_actors.map((movieActor) => (
                  <Link
                    key={`${movieActor.movie_id}-${movieActor.actor_id}`}
                    to={`/actor/${movieActor.actor_id}`}
                    className="block px-4 py-3 bg-background-card rounded-lg hover:bg-background-card-light transition-colors"
                  >
                    <p className="text-white font-medium hover:text-primary transition-colors">
                      {movieActor.actor?.name || 'Unknown Actor'}
                    </p>
                    {movieActor.role && (
                      <p className="text-white/60 text-sm mt-1">as {movieActor.role}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
