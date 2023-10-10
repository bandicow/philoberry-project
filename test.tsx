// //#################################### 더미
// // const DUMMY_ARTIST = {
// //   artist_id: 1,
// //   artist_image: "https://example.com/artist_image.jpg",
// //   name: "홍길동",
// //   nationality: "한국",
// //   profile: "저는 홍길동이며, 다양한 예술 작품을 만들고 있습니다.",
// //   website_url: "https://example.com/artist_website",
// // };

// // const DUMMY_ARTWORK = {
// //   artwork_id: 1,
// //   artist_id: DUMMY_ARTIST.artist_id,
// //   title: "나의 첫 번째 작품",
// //   image_url: "https://example.com/artwork_image.jpg",
// //   descripton:
// //     "이 작품은 나의 첫 번째 작품으로, 자연의 아름다움을 표현하고자 했습니다.",
// //   createdAt: new Date(),
// //   medium: "유화",
// //   dimensions: "30cm x 40cm",
// //   price: null,
// //   isSold: false,
// // };

// // DUMMY_ARTIST.artworks = [DUMMY_ARTWORK];

// // ### s3 rds api
// typescript

// async function handleUpload(file: File) {
//   try {
//     const response = await axios.post("/api/s3Upload", {
//       file: { name: file.name, type: file.type },
//       name: 'unique-name',// 여기에 고유한 이름을 설정하세요.
//     });
//     ...
//   } catch (error) {
//     console.error(error);
//   }
// }

// typescript

// async function handleUpload(file: File) {
//   try {
//     const response = await axios.post("/api/s3Upload", {
//       file: { name: file.name, type: file.type },
//       name: `${Date.now()}-${file.name}`,// 원래 파일 이름에 타임스탬프 추가
//     });
//     ...
//   } catch (error) {
//     console.error(error);
//   }
// }

///333
// if (req.method === "GET") {
//   // GET 요청 처리
//   const allProducts = await prisma.product.findMany();

//   const updatedProducts = await Promise.all(
//     allProducts.map(async (product) => {
//       if (product.mainImageUrl) {
//         // mainImageUrl이 있는 경우, 해당 이미지에 대한 Presigned URL 생성
//         const objectKey = product.mainImageUrl.split("/").pop(); // S3 객체 키 추출

//         if (!objectKey) return product; // 객체 키가 없는 경우 원래 제품 데이터 반환

//         const signedUrlParams = {
//           Bucket: process.env.S3_BUCKET || "",
//           Key: objectKey,
//         };
//         const presignedUrl = await s3.getSignedUrlPromise(
//           "getObject",
//           signedUrlParams
//         );

//         return { ...product, mainImageUrl: presignedUrl }; // 제품 데이터에 Presigned URL 적용
//       } else {
//         return product; // mainImageUrl이 없는 경우 원래 제품 데이터 반환
//       }
//     })
//   );

//   console.log(updatedProducts, "S3세일에서 받아오는 url");

//   // Disconnect from the database
//   await prisma.$disconnect();

//   return res.status(200).json(updatedProducts);
// }

////333333333333333333async function handleMultipleUploads(files: File[]) {
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

interface ProductFormProps {
  product: Product;
  onSubmit: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const [name, setName] = useState(product.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...product, name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

const ProductsPage: React.FC<ProductListProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleProductUpdate = async (updatedProduct: Product) => {
    try {
      await axios.put(`/api/products/${updatedProduct.id}`, updatedProduct);
      setSelectedProduct(null); // Clear selection after update
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id} onClick={() => handleProductSelect(product)}>
          {product.name}
        </div>
      ))}
      {selectedProduct && (
        <ProductForm product={selectedProduct} onSubmit={handleProductUpdate} />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany();

  return {
    props: {
      products,
    },
  };
};

export default ProductsPage;

import axios from "axios";
import { Product } from "@prisma/client";
import { EditProducts } from "../../../src/components/AdminSettings/EditProducts";

interface editProductsProps {
  productsInfo: Pick<
    Product,
    "name" | "category" | "price" | "color" | "size" | "details" | "stock"
  >[];
}

export const getServerSideProps = async () => {
  const response = await axios.get(`${process.env.SITE_URL}/api/editProducts`);
  return { props: { productsInfo: response.data } };
};

const EditProductPage = ({ productsInfo }: editProductsProps) => {
  return (
    <div>
      <EditProducts productsInfo={productsInfo} />
    </div>
  );
};

export default EditProductPage;
