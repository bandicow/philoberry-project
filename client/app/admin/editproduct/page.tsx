"use client";
import React, { useEffect, useState } from "react";
import { Product } from "/@prisma/client";
import { EditProducts } from "../../../src/components/AdminSettings/EditProducts";
import { getProduct } from "../../../lib/action";

type ProductInfo = Pick<
  Product,
  "name" | "category" | "price" | "color" | "size" | "details" | "stock" | "id"
>;

interface EditProductsProps {
  productsInfo: ProductInfo[];
}

const EditProductPage = () => {
  const [productsInfo, setProductsInfo] = useState<ProductInfo[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productResult = await getProduct();

      if (!productResult) {
        console.error("Failed to get product");
        return;
      }

      const { productsInfo }: EditProductsProps = productResult;
      setProductsInfo(productsInfo);
    };

    fetchProducts();
  }, []);

  if (!productsInfo) {
    return <div> 데이터 불러오기 실패</div>;
  }

  return (
    <div>
      <EditProducts productsInfo={productsInfo} />
    </div>
  );
};

export default EditProductPage;
