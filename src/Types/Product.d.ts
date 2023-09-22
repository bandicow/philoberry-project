export interface ProductData {
  id?: number;
  name: string;
  category: string;
  price: number;
  material: string;
  color: string;
  size: string;
  details: string;
  precautions: string;
  url: string;
  seller: string;
  isFavorited: number;
  stock: number;
  images: string[];
}

export interface ImageData {
  id?: number;
  url: string;
  productId: number;
}
