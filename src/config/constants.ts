export const APP_NAME = 'Cat Gallery';
export const APP_VERSION = '1.0.0';

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.thecatapi.com/v1',
  API_KEY: import.meta.env.VITE_API_KEY || '',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

export const CACHE = {
  FAVORITES_KEY: 'cat_gallery_favorites',
  FAVORITES_VERSION: 1,
};

export const ANIMATION = {
  SPINNER_SIZE: 40,
};

export const IMAGE = {
  FALLBACK_URL: 'https://via.placeholder.com/400x300?text=No+Image',
  LOADING_PLACEHOLDER: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e0e0e0" width="400" height="300"/%3E%3C/svg%3E',
};
