"use client";

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
  const productResult = await getProduct();

  if (!productResult) {
    console.error("Failed to get product");
    return <div> 데이터 불러오기 실패</div>;
  }

  const { productsInfo }: editProductsProps = productResult;

  return (
    <div>
      <EditProducts productsInfo={productsInfo} />
    </div>
  );
};

export default editProduct;
