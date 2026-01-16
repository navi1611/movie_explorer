import type { Genre } from "../shared/movieTypes";
import { get } from "../utils/fetchHelper";

export const genresService = {
  getGenres: async (): Promise<Genre[]> => {
    const response = await get<Genre[]>("/api/v1/genres");
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data || [];
  },

};
