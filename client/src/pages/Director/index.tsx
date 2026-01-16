import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store';
import PageLoader from '../../components/PageLoader';
import { fetchDirectorById } from '../../store/slice/Directors';
import {
  Calendar,
  User,
  Film,
  ArrowLeft,
  MapPin,
  Star,
} from 'lucide-react';
import MovieCard from '../../components/MovieCard';
import EmptyMovie from '../../components/NoMovies';

const DirectorPage: React.FC = () => {
  const { directorId } = useParams<{ directorId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedDirector, directorDetailLoading, directorDetailError } = useSelector(
    (state: RootState) => state.directors
  );

  useEffect(() => {
    if (directorId) {
      dispatch(fetchDirectorById(Number(directorId)));
    }
  }, [dispatch, directorId]);

  if (directorDetailLoading) {
    return <PageLoader />;
  }

  if (directorDetailError || !selectedDirector) {
    return (
      <div className="fade-in-up flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-primary">Director Not Found</h2>
        <p className="text-white/60 mb-6">{directorDetailError || 'The director you are looking for does not exist.'}</p>
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
        <span>Back to Home</span>
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-shrink-0">
          <div className="w-full lg:w-80 h-[500px] bg-background-card-light rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
            <User className="w-32 h-32 text-white/20" />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              {selectedDirector.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              {selectedDirector.birth_year && (
                <div className="flex items-center gap-2 px-3 py-1 bg-background-card rounded-lg text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span>Born {selectedDirector.birth_year}</span>
                </div>
              )}

              {selectedDirector.nationality && (
                <div className="flex items-center gap-2 px-3 py-1 bg-background-card rounded-lg text-white/80">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedDirector.nationality}</span>
                </div>
              )}
            </div>
          </div>

          {selectedDirector.movies && selectedDirector.movies.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                <Film className="w-5 h-5" />
                Directed Movies ({selectedDirector.movies.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedDirector.movies.map((movie) => (
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
            </div>
          )}

          {(!selectedDirector.movies || selectedDirector.movies.length === 0) && (
            <EmptyMovie/>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectorPage;

