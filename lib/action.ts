import { NewProduct } from "@/src/Types/Product";
import { Artist, Artwork, PickArtist, Product } from "@prisma/client";
import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

type ProductInfo = Pick<
  Product,
  "name" | "category" | "price" | "color" | "size" | "details" | "stock" | "id"
>;

type NewArtist = Omit<Artist, "artist_id">;

//** 배경색 가져오기 */
export const getBackgroundColor = async () => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const response = await axios.get(`${serverUrl}/api/getBackgroundColor`);
    return response.data.backgroundColor;
  }
};

//** 배경색 설정하기 */
export async function setBackgroundColor(data: { backgroundColor: string }) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await axios.post(
        `${serverUrl}/api/setBackgroundColor`,
        data
      );
      console.log(response.data.backgroundColor);
      return response.data.backgroundColor;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

//** 제품 수정을 위한 정보 가져오기*/
export const getProduct = async () => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const response = await axios.get(`${serverUrl}/api/getEditProduct`);

    return { productsInfo: response.data };
  }
};

//** 작품 업로드를 위해 작가정보 가져오기 */
export const getArtist = async () => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const response = await axios.get(`${serverUrl}/api/getArtist`);

    return { artistInfo: response.data };
  }
};

//**모든 제품 정보 가져오기 */
export const getProducts = async () => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const response = await axios.get(`${serverUrl}/api/productLoad`);
    return { items: response.data };
  }
  return { items: [] };
};

//** 제품 상세 정보하기 (하나의 제품)*/
export const getProductDetail = async (id: number) => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const response = await axios.get(`${serverUrl}/api/productDetail/${id}`);
    return response.data;
  }
};

//**제품 수정을 위한 요청*/
export const editProduct = async (editData: ProductInfo) => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await axios.post(
        `${serverUrl}/api/postEditProduct`,
        editData
      );
      console.log(response);
    } catch (err) {
      console.log(err + "업데이트 에러");
    }
  }
};

//** 갤러리 작가 이름 가져오기*/
export async function getTodayArtist() {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const response = await axios.get(`${serverUrl}/api/getTodayArtist`);
    return response.data.artistName;
  }
}

//** 갤러리 작가 이름 가져오기*/
export async function getArtworks() {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const name = await getTodayArtist();
    if (!name) return []; // Add this line to prevent running the query before artist name is available.

    const response = await axios.get(`${serverUrl}/api/getArtwork/${name}`);
    return response.data;
  }
}

//**s3에 작가 이미지 업로드 */
export async function handleUpload(file: File, name: string) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await axios.post(`${serverUrl}/api/s3Upload`, {
        file: { name: file.name, type: file.type },
        name,
      });
      const { url, key } = response.data;

      // Create a new Blob instance
      const blob = new Blob([file], { type: file.type });

      //사전 서명된(presigned) URL을 사용하여 S3에 직접 파일을 업로드
      await axios.put(url, blob);

      return key;
    } catch (error) {
      console.error(error);
    }
  }
}

//** 작가 등록하기 */
export async function artistUploadHandler(artistData: NewArtist) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await axios.post(
        `${serverUrl}/api/artistupload`,
        artistData
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
}

//** 여러 이미지 등록하기 (제품) */
export async function handleMultipleUploads(
  files: File[],
  name: string
): Promise<string[]> {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const uploadPromises = files.map((file) => handleUpload(file, name));
      const keys = await Promise.all(uploadPromises);

      return keys;
    } catch (error) {
      console.log(error);

      // Return an empty array when error occurs.
      return [];
    }
  }
  return [];
}

//** 제품 등록하기 */
export async function addProductHandler(productData: NewProduct) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await axios.post(
        `${serverUrl}/api/productUpload`,
        productData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}

type UploadArtwork = Omit<Artwork, "artwork_id">;

//** 작품 등록하기 */
export async function postArtwork(artwork: UploadArtwork) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await axios.post(
        `${serverUrl}/api/postArtwork`,
        artwork
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

// admin 계정확인
export async function checkIsAdmin(email: string) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await axios.post(`${serverUrl}/api/checkIsAdmin`, {
        email,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

// 작가 선택하기 post로 todayArtist 변경
export async function postTodayArtist(artist: PickArtist) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await axios.post(
        `${serverUrl}/api/postTodayArtist`,
        artist
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
