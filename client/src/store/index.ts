import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../store/slice/Dashboard';
import moviesReducer from '../store/slice/Movies';
import genresReducer from '../store/slice/Genres';
import actorsReducer from '../store/slice/Actors';
import directorsReducer from '../store/slice/Directors';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    movies: moviesReducer,
    genres: genresReducer,
    actors: actorsReducer,
    directors: directorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
