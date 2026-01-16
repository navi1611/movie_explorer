export interface Movie {
  id: number;
  title: string;
  release_year: number;
  duration_minutes?: number | null;
  director_id?: number | null;
  rating?: number | null;
  description?: string | null;
  poster_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Director {
  id: number;
  name: string;
  birth_year?: number | null;
  nationality?: string | null;
  created_at: string;
}

export interface DirectorDetail extends Director {
  movies: Movie[];
}

export interface MovieActor {
  movie_id: number;
  actor_id: number;
  role?: string | null;
  actor?: Actor;
}

export interface Actor {
  id: number;
  name: string;
  birth_year?: number | null;
  nationality?: string | null;
  created_at: string;
}

export interface MovieActorWithMovie extends MovieActor {
  movie?: Movie | null;
}

export interface ActorDetail extends Actor {
  movie_actors: MovieActorWithMovie[];
}

export interface MovieDetail extends Movie {
  director?: Director | null;
  genres: Genre[];
  movie_actors: MovieActor[];
}

export interface Genre {
  id: number;
  name: string;
  created_at: string;
}
