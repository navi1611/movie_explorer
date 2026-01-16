import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { actorsService } from '../../../services/actors';
import type { Actor, ActorDetail } from '../../../shared/movieTypes';

interface ActorsState {
  actors: Actor[];
  selectedActor: ActorDetail | null;
  loading: boolean;
  actorDetailLoading: boolean;
  error: string | null;
  actorDetailError: string | null;
}

const initialState: ActorsState = {
  actors: [],
  selectedActor: null,
  loading: false,
  actorDetailLoading: false,
  error: null,
  actorDetailError: null,
};

export const fetchActors = createAsyncThunk(
  'actors/fetchActors',
  async (_, { rejectWithValue }) => {
    try {
      const actors = await actorsService.getActors();
      return actors;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch actors'
      );
    }
  }
);

export const fetchActorById = createAsyncThunk(
  'actors/fetchActorById',
  async (actorId: number, { rejectWithValue }) => {
    try {
      const actor = await actorsService.getActorById(actorId);
      return actor;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch actor'
      );
    }
  }
);

const actorsSlice = createSlice({
  name: 'actors',
  initialState,
  reducers: {
    clearActors: (state) => {
      state.actors = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActors.fulfilled, (state, action: PayloadAction<Actor[]>) => {
        state.loading = false;
        state.actors = action.payload;
      })
      .addCase(fetchActors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load actors';
      })
      .addCase(fetchActorById.pending, (state) => {
        state.actorDetailLoading = true;
        state.actorDetailError = null;
      })
      .addCase(fetchActorById.fulfilled, (state, action: PayloadAction<ActorDetail>) => {
        state.actorDetailLoading = false;
        state.selectedActor = action.payload;
      })
      .addCase(fetchActorById.rejected, (state, action) => {
        state.actorDetailLoading = false;
        state.actorDetailError = action.payload as string || 'Failed to load actor';
        state.selectedActor = null;
      });
  },
});

export const { clearActors } = actorsSlice.actions;
export default actorsSlice.reducer;

