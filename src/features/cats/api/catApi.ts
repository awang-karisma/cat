import axios from 'axios';
import { catApiEndpoints } from '../../../config/endpoints';
import type { CatApiResponse, CatImage } from '../types/cat';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchCatImages(page: number = 1, limit: number = 20): Promise<CatImage[]> {
  try {
    const response = await api.get<CatApiResponse[]>(catApiEndpoints.IMAGES_SEARCH, {
      params: {
        page,
        limit,
        has_breeds: true,
      },
    });

    return response.data.map(item => ({
      id: item.id,
      url: item.url,
      width: item.width,
      height: item.height,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cat images');
    }
    throw error;
  }
}
