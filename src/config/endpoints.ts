import { API_CONFIG } from './constants';

const BASE_URL = API_CONFIG.BASE_URL;

export const catApiEndpoints = {
  IMAGES_SEARCH: `${BASE_URL}/images/search`,
  IMAGES_GET: `${BASE_URL}/images`,
  FAVOURITES_GET: `${BASE_URL}/favourites`,
  FAVOURITES_ADD: `${BASE_URL}/favourites`,
  FAVOURITES_DELETE: (id: string) => `${BASE_URL}/favourites/${id}`,
} as const;

export const imageMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;

export type ImageMimeType = (typeof imageMimeTypes)[number];
