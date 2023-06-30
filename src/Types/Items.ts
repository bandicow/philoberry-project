// img 임시 타입 StaticImageData

export interface Items {
  id: string;
  name: string;
  category: string;
  color: string;
  stock: number;
  size: number | string;
  descritption: string;
  img: string;
  url: string;
}

export interface SaleItemProps {
  items: Items[];
}
