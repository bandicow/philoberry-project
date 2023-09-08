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

/**
 id,name.category,color,stock,size,descritption,img,url
 */
export interface SaleItemProps {
  items: Items[];
}

/**
 File은 웹 플랫폼에서 파일을 나타내는 내장 타입
 */
export interface onImageUploadProps {
  onImagesUpload: (file: File[]) => Promise<void>;
  inputRef?: React.RefObject<HTMLInputElement>;
}
