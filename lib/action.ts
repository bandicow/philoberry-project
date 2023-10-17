import { Product } from "@prisma/client";
import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

type ProductInfo = Pick<
  Product,
  "name" | "category" | "price" | "color" | "size" | "details" | "stock" | "id"
>;

//** 배경색 가져오기 */
export const getBackgroundColor = async () => {
  const response = await axios.get(`${serverUrl}/api/getBackgroundColor`);
  return response.data.backgroundColor;
};

//** 배경색 설정하기 */
export async function setBackgroundColor(data: { backgroundColor: string }) {
  try {
    const response = await axios.post("/api/setBackgroundColor", data);
    console.log(response.data.backgroundColor);
    return response.data.backgroundColor;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//** 제품 수정을 위한 정보 가져오기*/
export const getProduct = async () => {
  const response = await axios.get(`${serverUrl}/api/getEditProduct`);

  return { productsInfo: response.data };
};

//** 작품 업로드를 위해 작가정보 가져오기 */
export const getArtist = async () => {
  const response = await axios.get(`${serverUrl}/api/getArtist`);

  return { artistInfo: response.data };
};

//**모든 제품 정보 가져오기 */
export const getProducts = async () => {
  const response = await axios.get(`${serverUrl}/api/productLoad`);
  return { items: response.data };
};

//** 제품 상세 정보하기 (하나의 제품)*/
export const getProductDetail = async (id: number) => {
  const response = await axios.get(`${serverUrl}/api/productDetail/${id}`);
  return response.data;
};

//**제품 수정을 위한 요청*/
export const editProduct = async (editData: ProductInfo) => {
  try {
    const response = await axios.post(
      `${serverUrl}/api/postEditProduct`,
      editData
    );
    console.log(response);
  } catch (err) {
    console.log(err + "업데이트 에러");
  }
};

//** 갤러리 작가 이름 가져오기*/
export async function getTodayArtist() {
  const response = await axios.get(`${serverUrl}/api/getTodayArtist`);

  return response.data.artistName;
}
//** 갤러리 작가 이름 가져오기*/
export async function getArtworks() {
  const name = await getTodayArtist();
  if (!name) return []; // Add this line to prevent running the query before artist name is available.

  const response = await axios.get(`${serverUrl}/api/getArtwork/${name}`);
  return response.data;
}
