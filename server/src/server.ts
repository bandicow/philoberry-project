import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import prisma from "./lib/prisma";
import cors from "cors";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import getProductDetail from "./routes/getProductDetail";
import getArtwork from "./routes/getArtwork";
import { Artist, Setting } from "@prisma/client";

// .env 파일을 읽어서 process.env로 설정합니다.
dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY ?? "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
  },
});

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares 적용
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(
//   cors({
//     origin: process.env.NEXT_PUBLIC_SERVER_URL,
//   })
// );
app.use(express.json());

//#################### aws 헬스체크 ####################//
//** aws 헬스체크 */
app.get("/healthcheck", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Server is running" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//################## s3 이미지 업로드 ###################//
//** s3 이미지 업로드 */
app.post("/express/postS3Image", async (req: Request, res: Response) => {
  try {
    const productImage = req.body;
    const file = productImage.file;
    const category = productImage.category;

    const fileName = `${category}/${productImage.name}/${file.name}`;
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      ContentType: file.type,
    };

    const uploadURL = await getSignedUrl(
      s3Client,
      new PutObjectCommand(params)
    );

    res.status(200).json({ url: uploadURL, key: fileName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

//################## s3 삭제 ###################//
//** s3 제품 이미지 삭제 */
const deleteS3Objects = async (folder: string) => {
  const listParams = {
    Bucket: process.env.S3_BUCKET as string,
    Prefix: folder,
  };
  try {
    const nullData = await s3Client.send(new ListObjectsV2Command(listParams));
    console.log(nullData);
    if (!nullData.Contents || nullData.Contents.length === 0) return;

    const deleteParams = {
      Bucket: process.env.S3_BUCKET as string,
      Delete: { Objects: [] as Array<{ Key: string }> },
    };
    console.log(deleteParams);
    nullData.Contents.forEach(({ Key }) => {
      if (Key) {
        deleteParams.Delete.Objects.push({ Key });
      }
    });
    await s3Client.send(new DeleteObjectsCommand(deleteParams));
  } catch (err) {
    console.log("S3 이미지 삭제 실패", err);
  }
};

//@@@@@@@@@@@@@@@@@@@@@@@ API @@@@@@@@@@@@@@@@@@//

//################## 배경색 ##################//
//** 배경색 설정하기 */
app.post("/express/setBackgroundColor", async (req: Request, res: Response) => {
  const { backgroundColor }: Setting = req.body;

  try {
    // 색상 정보를 파일에 저장합니다.
    await prisma.setting.update({
      where: { id: 1 },
      data: { backgroundColor },
    });

    await prisma.$disconnect();

    return res.status(200).json({ backgroundColor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ color: "Internal Server Error" });
  }
});

//** 배경색 가져오기 */
app.get("/express/getBackgroundColor", async (req: Request, res: Response) => {
  try {
    const bgColor = await prisma.setting.findFirst();
    if (bgColor) {
      return res.json({ backgroundColor: bgColor.backgroundColor });
    } else {
      return res.json({ backgroundColor: "#FFFFFF" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ color: "No settings found" });
  }
});

//#################### 작가 ####################//

//** 작가 등록하기 */
app.post("/express/postArtist", async (req: Request, res: Response) => {
  const artistData = req.body;
  try {
    // S3 이미지 업로드 후 Key받아오기(null 일때 s3 막 업로드된거 delete, create X)
    const newArtist = await prisma.artist.create({
      data: {
        name: artistData.name,
        major: artistData.major,
        profile: artistData.profile,
        website_url: artistData.website_url,
        artist_image: artistData.artist_image,
      },
    });

    return res.status(201).json(newArtist);
  } catch (e) {
    console.error(e);
    if (artistData && artistData.artist_name) {
      const folder = `${artistData.artist_name}`;
      await deleteS3Objects(folder);
      console.log({ message: "Images deleted successfully from S3" });
    }
  }
  return res.status(500).json({ message: "Server Error" });
});

//** 콜라보 작가 정보 가져오기 */
app.get(
  "/express/getCollaboArtist/:name",
  async (req: Request, res: Response) => {
    try {
      const artistName = req.params.name;
      const collaboArtist = await prisma.artist.findUnique({
        where: {
          name: artistName,
        },
      });

      const s3_key = collaboArtist?.artist_image;

      if (!s3_key) return collaboArtist;

      const artistImage = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET || "",
        Key: s3_key,
      });

      let presignedUrl;

      try {
        presignedUrl = await getSignedUrl(s3Client, artistImage, {
          expiresIn: 3600 * 24,
        });
      } catch (err) {
        console.log("Error creating presigned URL", err);
      }

      const data = { ...collaboArtist, artist_image: presignedUrl };

      return res.status(200).json(data);
    } catch (error) {
      console.log(error, "서버 에러");
      return res.status(404).json({ message: "아티스트 정보 가져오기 실패" });
    }
  }
);

//** 모든 작가 이름 가져오기 */
app.get("/express/getArtist", async (req: Request, res: Response) => {
  try {
    const artistInfo = await prisma.artist.findMany({
      select: {
        artist_id: true,
        name: true,
      },
    });
    return res.status(200).json(artistInfo);
  } catch (error) {
    console.log(error, "서버 에러");
    return res.status(404).json({ message: "아티스트 이름 불러오기 실패" });
  }
});

//** 콜라보 작가 이름 가져오기 */
app.get("/express/getTodayArtist", async (req: Request, res: Response) => {
  try {
    const todayArtist = await prisma.pickArtist.findFirst();
    if (todayArtist) {
      return res.json({ artistName: todayArtist.artist_name });
    } else {
      return res.json({ artistName: "???" });
    }
  } catch (error) {
    console.log(error, "서버 에러");
    return res.status(404).json({ message: "아티스트 이름 불러오기 실패" });
  }
});

//** 작가 선택하기 */
app.post("/express/postPickArtist", async (req: Request, res: Response) => {
  try {
    const { artist_name } = req.body;

    const todayArtist = await prisma.pickArtist.update({
      where: {
        id: 100,
      },
      data: {
        artist_name: artist_name,
      },
    });

    return res.status(201).json({ artistName: todayArtist.artist_name });
  } catch (error) {
    console.log(error, "서버 에러");
    return res.status(404).json({ message: "아티스트 이름 변경 실패" });
  }
});

//################# 작품 ###################//

//** 작품 등록하기 */
app.post("/express/postArtwork", async (req: Request, res: Response) => {
  const artworkData = req.body;

  const uploadedImageUrls = artworkData.artworkImages;

  try {
    const artworkInfo = await prisma.artwork.create({
      data: {
        title: artworkData.title,
        description: artworkData.description,
        material: artworkData.material,
        size: artworkData.size,
        price: artworkData.price,
        isSold: artworkData.isSold,
        createdAt: artworkData.createdAt,
        order: artworkData.order,
        mainImage:
          artworkData.mainImage && artworkData.mainImage.length > 0
            ? artworkData.mainImage
            : console.log("mainImage 없음"),
        Artist: {
          connect: {
            name: artworkData.artist_name,
          },
        },
      },
    });

    // 각각의 이미지 URL을 ArtworkImage 테이블에 저장합니다.
    if (uploadedImageUrls && uploadedImageUrls.length > 0) {
      for (let imageUrl of uploadedImageUrls) {
        await prisma.artworkImage.create({
          data: {
            s3key: imageUrl,
            artworkId: artworkInfo.artwork_id,
          },
        });
      }
    }

    return res.status(201).json(artworkInfo);
  } catch (err) {
    console.log(err);
    if (artworkData && artworkData.artist_name) {
      const folder = `"작품"/${artworkData.artist_name}/`;
      await deleteS3Objects(folder);
      console.log({ message: "Images deleted successfully from S3" });
    }

    return res.status(500).json({ message: "작품 업로드 요청 실패" });
  }
});

//** 작품 불러오기*/
app.use("/express/getArtwork", getArtwork);

//################ 제품 ##################//
//** 제품 등록하기 */
app.post("/express/postProduct", async (req: Request, res: Response) => {
  const productData = req.body;

  try {
    const uploadedImageUrls = productData.productImages;

    const newProduct = await prisma.product.create({
      data: {
        name: productData.name,
        category: productData.category,
        price: productData.price,
        material: productData.material,
        color: productData.color,
        size: productData.size,
        details: productData.details,
        precautions: productData.precautions,
        url: productData.url,
        seller: productData.seller,
        stock: productData.stock,
        createdAt: new Date(),
        mainImage:
          productData.mainImage && productData.mainImage.length > 0
            ? productData.mainImage
            : null,
      },
    });

    // 각각의 이미지 URL을 ProductImage 테이블에 저장합니다.
    if (uploadedImageUrls && uploadedImageUrls.length > 0) {
      for (let imageUrl of uploadedImageUrls) {
        await prisma.productImage.create({
          data: {
            s3key: imageUrl,
            productId: newProduct.id,
          },
        });
      }
    }
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    if (productData && productData.name) {
      {
        const folder = `"제품"/${productData.name}/`;
        await deleteS3Objects(folder);
        console.log({ message: "Images deleted successfully from S3" });
      }
    }
    return res.status(500).json({ message: "Server Error" });
  }
});

//** 제품 상세 정보 가져오기 router (하나의 제품)*/
app.use("/express/getProductDetail", getProductDetail);

//** 모든 제품 정보 가져오기 */
app.get("/express/getProducts", async (req: Request, res: Response) => {
  try {
    const allProducts = await prisma.product.findMany();

    const updatedProducts = await Promise.all(
      allProducts.map(async (product) => {
        // 제품 이름에 따라 S3 버킷의 폴더 위치 결정
        const s3_Key = product.mainImage;

        if (!s3_Key) return product;

        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET || "",
          Key: s3_Key,
        });

        let presignedUrl;

        try {
          presignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600 * 24,
          });
        } catch (err) {
          console.log("Error creating presigned URL", err);
        }

        return { ...product, mainImage: presignedUrl };
      })
    );

    return res.status(200).json(updatedProducts);
  } catch (e) {
    console.error("Failed to generate S3 image URLs", e);
    return res.status(500).json({ message: "Server Error" });
  }
});

//** 제품 수정하기을 위한 제품 정보 가져오기 */
app.get("/express/getEditProduct", async (req: Request, res: Response) => {
  try {
    const productsName = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        color: true,
        size: true,
        details: true,
        stock: true,
      },
    });

    return res.status(200).json(productsName);
  } catch (err) {
    err;
    return res.status(404).json({ message: "제품 이름 불러오기 실패" });
  }
});

//** 제품 수정하기 */
app.post("/express/postEditProduct", async (req: Request, res: Response) => {
  try {
    const productEditData = req.body;

    const editProduct = await prisma.product.update({
      where: {
        id: productEditData.id,
      },
      data: {
        name: productEditData.name,
        category: productEditData.category,
        price: productEditData.price,
        color: productEditData.color,
        size: productEditData.size,
        details: productEditData.details,
        stock: productEditData.stock,
      },
    });

    return res
      .status(201)
      .json({ product: editProduct, message: "제품 수정 완료" });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ message: "제품 수정 실패" });
  }
});

//################## 계정 ##################//
//** admin 계정 확인 */ 임시
app.post("/express/checkIsAdmin", async (req: Request, res: Response) => {
  try {
    const email =
      typeof req.query.email === "string" ? req.query.email : undefined;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return res.status(200).json(user?.email ?? false);
  } catch (error) {
    console.log(error, "확인 실패");
    return res.status(404).json({ message: "관리자 확인 실패" });
  }
});

//** 회원가입 */
app.post("/express/signUp", async (req: Request, res: Response) => {
  const NewUser = req.body;

  try {
    // 이메일 또는 비밀번호가 제공되지 않았다면 에러를 반환합니다.
    if (!NewUser.email || !NewUser.password) {
      throw new Error("이메일과 비밀번호는 필수 항목입니다.");
    }
    // 이미 동일한 이메일로 가입한 사용자가 있는지 확인합니다.
    const existingUser = await prisma.user.findUnique({
      where: { email: NewUser.email },
    });

    if (existingUser) {
      throw new Error("이미 가입된 이메일 주소입니다.");
    }

    const hashedPassword = await bcrypt.hash(NewUser.password, 10);

    const user = await prisma.user.create({
      data: {
        name: NewUser.name,
        email: NewUser.email,
        hashedPassword: hashedPassword,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error, "서버 에러");
    return res.status(404).json({ message: "회원가입 실패" });
  }
});

//################## 시작 ##################//
// Express 애플리케이션을 시작합니다.
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
