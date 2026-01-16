import type { Director, DirectorDetail } from '../shared/movieTypes';
import { get } from '../utils/fetchHelper';

export const directorsService = {
  getDirectors: async (): Promise<Director[]> => {
    const response = await get<Director[]>('/api/v1/directors');
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data || [];
  },

  getDirectorById: async (directorId: number): Promise<DirectorDetail> => {
    const response = await get<DirectorDetail>(`/api/v1/directors/${directorId}`);

    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data) {
      throw new Error('Director not found');
    }

    return response.data;
  },
};

