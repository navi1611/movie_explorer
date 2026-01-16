import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store';
import PageLoader from '../../components/PageLoader';
import { fetchActorById } from '../../store/slice/Actors';
import {
  Calendar,
  User,
  Film,
  ArrowLeft,
  MapPin,
} from 'lucide-react';
import MovieCard from '../../components/MovieCard';
import EmptyMovie from '../../components/NoMovies';

const ActorPage: React.FC = () => {
  const { actorId } = useParams<{ actorId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedActor, actorDetailLoading, actorDetailError } = useSelector(
    (state: RootState) => state.actors
  );

  useEffect(() => {
    if (actorId) {
      dispatch(fetchActorById(Number(actorId)));
    }
  }, [dispatch, actorId]);

  if (actorDetailLoading) {
    return <PageLoader />;
  }

  if (actorDetailError || !selectedActor) {
    return (
      <div className="fade-in-up flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-primary">Actor Not Found</h2>
        <p className="text-white/60 mb-6">{actorDetailError || 'The actor you are looking for does not exist.'}</p>
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
              {selectedActor.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              {selectedActor.birth_year && (
                <div className="flex items-center gap-2 px-3 py-1 bg-background-card rounded-lg text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span>Born {selectedActor.birth_year}</span>
                </div>
              )}

              {selectedActor.nationality && (
                <div className="flex items-center gap-2 px-3 py-1 bg-background-card rounded-lg text-white/80">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedActor.nationality}</span>
                </div>
              )}
            </div>
          </div>

          {selectedActor.movie_actors && selectedActor.movie_actors.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                <Film className="w-5 h-5" />
                Filmography
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedActor.movie_actors.map((movieActor) => (
                  <Link
                    key={`${movieActor.movie_id}-${movieActor.actor_id}`}
                    to={`/movie/${movieActor.movie_id}`}
                    className="group"
                  >
                    {movieActor.movie && (
                      <div className='flex bg-background-card p-4 gap-1 rounded-lg'>
                        {movieActor.movie.poster_url ? (
                          <div className="w-full h-40 overflow-hidden">
                            <img
                              src={movieActor.movie.poster_url}
                              alt={movieActor.movie.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-64 flex items-center justify-center bg-background-card-light">
                            <Film className="w-16 h-16 text-white/20" />
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium group-hover:text-primary transition-colors">
                            {movieActor.movie.title}
                          </p>
                          <div className="items-center gap-2 mt-2 text-white/60 text-sm">
                            <div>
                              {movieActor.role && (
                                <>
                                  <span className="">{movieActor.role}</span>
                                </>
                              )}
                            </div>
                            <div>
                              {movieActor.movie.release_year && (
                                <span>{movieActor.movie.release_year}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </Link>
                ))}
              </div>
            </div>
          )}

          {(!selectedActor.movie_actors || selectedActor.movie_actors.length === 0) && (
            <EmptyMovie/>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActorPage;

