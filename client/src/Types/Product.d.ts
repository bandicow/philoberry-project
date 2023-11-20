import { Product, ProductImage } from "@/prismaType";

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

type NewProduct = Omit<Product, "id" | "createdAt"> & {
  productImages: string[];
};

interface NewProductFormProps {
  onAddProduct: (productData: NewProduct) => void;
}

type ProductInfo = Pick<
  Product,
  "name" | "category" | "price" | "color" | "size" | "details" | "stock" | "id"
>;

type EditProductState = {
  editProduct: ProductInfo | null;
  setEditProduct: (product: ProductInfo | null) => void;
};
