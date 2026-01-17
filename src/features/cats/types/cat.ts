export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: Breed[];
  favourite?: {
    id: number;
    image_id: string;
    sub_id: string;
    created_at: string;
  };
}

export interface Breed {
  id: string;
  name: string;
  temperament?: string;
  description?: string;
  origin?: string;
  life_span?: string;
  weight?: {
    imperial: string;
    metric: string;
  };
  reference_image_id?: string;
}

export interface CatApiResponse {
  id: string;
  url: string;
  width: number;
  height: number;
}
