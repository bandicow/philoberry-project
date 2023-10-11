import axios from "axios";
import { Product } from "@prisma/client";
import { EditProducts } from "../../../src/components/AdminSettings/EditProducts";

type ProductInfo = Pick<
  Product,
  "name" | "category" | "price" | "color" | "size" | "details" | "stock" | "id"
>;

interface editProductsProps {
  productsInfo: ProductInfo[];
}

const getProduct = async () => {
  const response = await axios.get(
    `${process.env.SITE_URL}/api/getEditProduct`
  );

  return { productsInfo: response.data };
};

const editProduct = async () => {
  const { productsInfo }: editProductsProps = await getProduct();
  return (
    <div>
      <EditProducts productsInfo={productsInfo} />
    </div>
  );
};

export default editProduct;
