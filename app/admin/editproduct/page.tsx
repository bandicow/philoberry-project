import { Product } from "@prisma/client";
import { EditProducts } from "../../../src/components/AdminSettings/EditProducts";
import { getProduct } from "../../../lib/action";

type ProductInfo = Pick<
  Product,
  "name" | "category" | "price" | "color" | "size" | "details" | "stock" | "id"
>;

interface editProductsProps {
  productsInfo: ProductInfo[];
}

const editProduct = async () => {
  const { productsInfo }: editProductsProps = await getProduct();
  return (
    <div>
      <EditProducts productsInfo={productsInfo} />
    </div>
  );
};

export default editProduct;
