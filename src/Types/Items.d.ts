// img 임시 타입 StaticImageData

export interface Item {
  id: string;
  name: string;
  category: string;
  color: string;
  stock: number;
  size: number | string;
  description: string;
  img: string;
  url: string;
  isSold: boolean;
}

export interface SaleItemProps {
  item: Item; // SaleItem 컴포넌트가 사용할 props
}

export interface SaleListProps {
  items: Item[]; // SaleList 컴포넌트가 사용할 props
}

/**
 File은 웹 플랫폼에서 파일을 나타내는 내장 타입
 */
export interface onImageUploadProps {
  onImagesUpload: (file: File[]) => Promise<void>;
  inputRef?: React.RefObject<HTMLInputElement>;
}
