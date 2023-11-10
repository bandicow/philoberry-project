import { NewProduct } from "@/src/Types/Product";
import { Artist, Artwork, PickArtist, Product } from "@prisma/client";

const isProduction = process.env.NODE_ENV === "production";

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:8000";

type ProductInfo = Pick<
  Product,
  "name" | "category" | "price" | "color" | "size" | "details" | "stock" | "id"
>;

type NewArtist = Omit<Artist, "artist_id">;

//######################## 배경색 ##########################

//** 배경색 가져오기 */ OK
export const getBackgroundColor = async () => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const response = await fetch(`${serverUrl}/api/getBackgroundColor`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.backgroundColor;
  }
};

//** 배경색 설정하기 */ OK
export async function setBackgroundColor(data: { backgroundColor: string }) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await fetch(`${serverUrl}/api/setBackgroundColor`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      return responseData.backgroundColor;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

//########################## 작품 ##########################
//** 작품 업로드를 위해 작가정보 가져오기 */ OK
export const getArtist = async () => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const response = await fetch(`${serverUrl}/api/getArtist`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return { artistInfo: data };
  }
};

//** url 만료 확인 */
async function isUrlExpired(url: string) {
  const response = await fetch(url, { method: "HEAD" }); // HEAD request to get only the headers
  return response.status === 403; // Change this to the status code that your server returns for expired URLs
}

//** 작품 가져오기*/ OK
export async function getArtworks() {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    let name = await getTodayArtist();
    if (!name) return [];

    let response = await fetch(`${serverUrl}/api/getArtwork/${name}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();

    // Check if any URL is expired
    for (const artwork of data) {
      if (await isUrlExpired(artwork.s3key)) {
        // If expired, request a new URL
        response = await fetch(`${serverUrl}/api/getArtwork/${name}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json();
        break;
      }
    }

    return data;
  }
}

//** 작품 등록하기 */ OK
export async function postArtwork(artwork: UploadArtwork) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await fetch(`${serverUrl}/api/postArtwork`, {
        method: "POST",
        body: JSON.stringify(artwork),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

//########################## 작가 ##########################
//** 작가 이름 가져오기*/ OK
export const getTodayArtist = async () => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const response = await fetch(`${serverUrl}/api/getTodayArtist`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.artistName;
  }
};

//** 작가 등록하기 */ OK
export async function artistUploadHandler(artistData: NewArtist) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await fetch(`${serverUrl}/api/postArtist`, {
        method: "POST",
        body: JSON.stringify(artistData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

//########################## 제품 ##########################
//** 제품 등록하기 */ OK
export async function addProductHandler(productData: NewProduct) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await fetch(`${serverUrl}/api/postProduct`, {
        method: "POST",
        body: JSON.stringify(productData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

type UploadArtwork = Omit<Artwork, "artwork_id">;

//**모든 제품 정보 가져오기 */ OK
export const getProducts = async () => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const response = await fetch(`${serverUrl}/api/getProducts`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return { items: data };
  }
  return { items: [] };
};

//** 제품 상세 정보하기 (하나의 제품)*/ OK
export const getProductDetail = async (id: number) => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const response = await fetch(`${serverUrl}/api/getProductDetail/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  }
};

//** 제품 수정을 위한 정보 가져오기*/ OK
export const getProduct = async () => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    const response = await fetch(`${serverUrl}/api/getEditProduct`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return { productsInfo: data };
  }
};

//**제품 수정을 위한 요청*/ OK
export const editProduct = async (editData: ProductInfo) => {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await fetch(`${serverUrl}/api/postEditProduct`, {
        method: "POST",
        body: JSON.stringify(editData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(await response.json());
    } catch (err) {
      console.log(err + "업데이트 에러");
    }
  }
};

//########################## s3 ##########################

//**s3에 이미지 업로드 */ OK
export async function handleUpload(file: File, name: string) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await fetch(`${serverUrl}/api/postS3Image`, {
        method: "POST",
        body: JSON.stringify({
          file: { name: file.name, type: file.type },
          name,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { url, key } = await response.json();

      // Create a new Blob instance
      const blob = new Blob([file], { type: file.type });

      //사전 서명된(presigned) URL을 사용하여 S3에 직접 파일을 업로드
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: blob,
      });

      if (!uploadResponse.ok) {
        throw new Error(`HTTP error! status: ${uploadResponse.status}`);
      }

      return key;
    } catch (error) {
      console.error(error);
    }
  }
}

//** 여러 이미지 등록하기 (제품) */ OK
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

//####################### 로그인 ##########################
// admin 계정확인 (임시) OK
export async function checkIsAdmin(email: string) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await fetch(`${serverUrl}/api/checkIsAdmin`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

// 작가 선택하기 post로 todayArtist 변경 OK
export async function postTodayArtist(artist: PickArtist) {
  if (process.env.NEXT_PUBLIC_BUILDING_IMAGE !== "true") {
    try {
      const response = await fetch(`${serverUrl}/api/postPickArtist`, {
        method: "POST",
        body: JSON.stringify(artist),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
