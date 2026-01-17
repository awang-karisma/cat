import axios from 'axios';
import { catApiEndpoints } from '../../../config/endpoints';
import type { CatApiResponse, CatImage } from '../types/cat';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

function mapApiResponseToCatImage(item: CatApiResponse): CatImage {
  return {
    id: item.id,
    url: item.url,
    width: item.width,
    height: item.height,
  };
}

export async function fetchCatImages(page: number = 1, limit: number = 20): Promise<CatImage[]> {
  try {
    const response = await api.get<CatApiResponse[]>(catApiEndpoints.IMAGES_SEARCH, {
      params: {
        page,
        limit,
        has_breeds: true,
      },
    });

    return response.data.map(mapApiResponseToCatImage);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cat images');
    }
    throw error;
  }
}

export async function fetchRandomCat(): Promise<CatImage> {
  try {
    const response = await api.get<CatApiResponse[]>(catApiEndpoints.IMAGES_SEARCH, {
      params: {
        limit: 1,
        has_breeds: true,
      },
    });

    if (response.data.length === 0) {
      throw new Error('No cat images found');
    }

    return mapApiResponseToCatImage(response.data[0]);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch random cat');
    }
    throw error;
  }
}
