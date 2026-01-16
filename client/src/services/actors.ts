import type { Actor, ActorDetail } from '../shared/movieTypes';
import { get } from '../utils/fetchHelper';

export const actorsService = {
  getActors: async (): Promise<Actor[]> => {
    const response = await get<Actor[]>('/api/v1/actors');
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data || [];
  },

  getActorById: async (actorId: number): Promise<ActorDetail> => {
    const response = await get<ActorDetail>(`/api/v1/actors/${actorId}`);

    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data) {
      throw new Error('Actor not found');
    }

    return response.data;
  },
};

