export interface FavoriteItem {
  id: string;
  imageId: string;
  imageUrl: string;
  addedAt: number;
}

export interface FavoritesStorage {
  version: number;
  items: FavoriteItem[];
}
