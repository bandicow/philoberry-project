"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("./lib/prisma"));
const cors_1 = __importDefault(require("cors"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const getProductDetail_1 = __importDefault(require("./routes/getProductDetail"));
const getArtwork_1 = __importDefault(require("./routes/getArtwork"));
// .env 파일을 읽어서 process.env로 설정합니다.
dotenv_1.default.config();
aws_sdk_1.default.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new aws_sdk_1.default.S3();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// Middlewares 적용
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//################## s3 이미지 업로드 ###################//
//** s3 이미지 업로드 */
app.post("/api/postS3Image", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productImage = req.body;
        const file = productImage.file;
        const fileName = `${productImage.name}/${file.name}`;
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: fileName,
            ContentType: file.type,
        };
        const uploadURL = yield s3.getSignedUrlPromise("putObject", params);
        res.status(200).json({ url: uploadURL, key: fileName });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}));
//################## s3 삭제 ###################//
//** s3 제품 이미지 삭제 */
const deleteS3Objects = (folder) => __awaiter(void 0, void 0, void 0, function* () {
    const listParams = {
        Bucket: process.env.S3_BUCKET,
        Prefix: folder,
    };
    try {
        const nullData = yield s3.listObjectsV2(listParams).promise();
        if (!nullData.Contents || nullData.Contents.length === 0)
            return;
        const deleteParams = {
            Bucket: process.env.S3_BUCKET,
            Delete: { Objects: [] },
        };
        nullData.Contents.forEach(({ Key }) => {
            if (Key) {
                deleteParams.Delete.Objects.push({ Key });
            }
        });
        yield s3.deleteObjects(deleteParams).promise();
    }
    catch (err) {
        console.log("S3 이미지 삭제 실패", err);
    }
});
//@@@@@@@@@@@@@@@@@@@@@@@ API @@@@@@@@@@@@@@@@@@//
//################## 배경색 ##################//
//** 배경색 설정하기 */
app.post("/api/setBackgroundColor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { backgroundColor } = req.body;
    try {
        // 색상 정보를 파일에 저장합니다.
        yield prisma_1.default.setting.update({
            where: { id: 1 },
            data: { backgroundColor },
        });
        yield prisma_1.default.$disconnect();
        return res.status(200).json({ backgroundColor });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ color: "Internal Server Error" });
    }
}));
//** 배경색 가져오기 */
app.get("/api/getBackgroundColor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bgColor = yield prisma_1.default.setting.findFirst();
        if (bgColor) {
            return res.json({ backgroundColor: bgColor.backgroundColor });
        }
        else {
            return res.json({ backgroundColor: "#FFFFFF" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ color: "No settings found" });
    }
}));
//#################### 작가 ####################//
//** 모든 작가 정보 가져오기 */
app.get("/api/getArtist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artistInfo = yield prisma_1.default.artist.findMany({
            select: {
                artist_id: true,
                name: true,
            },
        });
        return res.status(200).json(artistInfo);
    }
    catch (error) {
        console.log(error, "서버 에러");
        return res.status(404).json({ message: "아티스트 이름 불러오기 실패" });
    }
}));
//** 콜라보 작가 이름 가져오기 */
app.get("/api/getTodayArtist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todayArtist = yield prisma_1.default.pickArtist.findFirst();
        if (todayArtist) {
            return res.json({ artistName: todayArtist.artist_name });
        }
        else {
            return res.json({ artistName: "???" });
        }
    }
    catch (error) {
        console.log(error, "서버 에러");
        return res.status(404).json({ message: "아티스트 이름 불러오기 실패" });
    }
}));
//** 작가 등록하기 */
app.post("/api/postArtist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // POST 요청 처리: 새로운 Product 생성
        const productData = req.body;
        // S3 이미지 업로드 후 Key받아오기(null 일때 s3 막 업로드된거 delete, create X)
        if (!productData.artist_image) {
            const folder = `${productData.name}/`; // 삭제하려는 폴더 이름// 해당 폴더에 속한 모든 객체를 나열합니다.
            yield deleteS3Objects(folder);
            return res
                .status(200)
                .json({ message: "Images deleted successfully from S3" });
        }
        const newProduct = yield prisma_1.default.artist.create({
            data: {
                name: productData.name,
                major: productData.major,
                profile: productData.profile,
                website_url: productData.website_url,
                artist_image: productData.artist_image,
            },
        });
        return res.status(201).json(newProduct);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Server Error" });
    }
}));
//** 작가 선택하기 */
app.post("/api/postPickArtist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { artist_name } = req.body;
        const todayArtist = yield prisma_1.default.pickArtist.update({
            where: {
                id: 100,
            },
            data: {
                artist_name: artist_name,
            },
        });
        return res.status(201).json({ artistName: todayArtist.artist_name });
    }
    catch (error) {
        console.log(error, "서버 에러");
        return res.status(404).json({ message: "아티스트 이름 변경 실패" });
    }
}));
//################# 작품 ###################//
//** 작품 등록하기 */
app.post("api/postArtwork", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artworkData = req.body;
        if (!artworkData.s3key) {
            const folder = `${artworkData.artist_name}/`; // 삭제하려는 폴더 이름// 해당 폴더에 속한 모든 객체를 나열합니다.
            yield deleteS3Objects(folder);
            return res
                .status(200)
                .json({ message: "Images deleted successfully from S3" });
        }
        const artworkInfo = yield prisma_1.default.artwork.create({
            data: {
                title: artworkData.title,
                artist_name: artworkData.artist_name,
                s3key: artworkData.s3key,
                description: artworkData.description,
                material: artworkData.material,
                size: artworkData.size,
                price: artworkData.price,
                isSold: artworkData.isSold,
                createdAt: artworkData.createdAt,
                order: artworkData.order,
            },
        });
        return res.status(201).json(artworkInfo);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "작품 업로드 요청 실패" });
    }
}));
//**모든 작품 불러오기*/
app.use("/routes/getArtwork", getArtwork_1.default);
//################ 제품 ##################//
//** 제품 등록하기 */
app.post("/api/postProduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        if (!productData.mainImage) {
            const folder = `${productData.name}/`;
            yield deleteS3Objects(folder);
            return res
                .status(200)
                .json({ message: "Images deleted successfully from S3" });
        }
        const uploadedImageUrls = productData.productImages;
        const newProduct = yield prisma_1.default.product.create({
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
                mainImage: productData.mainImage && productData.mainImage.length > 0
                    ? productData.mainImage
                    : null,
            },
        });
        // 각각의 이미지 URL을 ProductImage 테이블에 저장합니다.
        if (uploadedImageUrls && uploadedImageUrls.length > 0) {
            for (let imageUrl of uploadedImageUrls) {
                yield prisma_1.default.productImage.create({
                    data: {
                        s3key: imageUrl,
                        productId: newProduct.id,
                    },
                });
            }
        }
        return res.status(201).json(newProduct);
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}));
//** 제품 상세 정보 가져오기 router (하나의 제품)*/
app.use("/routes/getProductDetail", getProductDetail_1.default);
//** 모든 제품 정보 가져오기 */
app.get("/api/getProducts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield prisma_1.default.product.findMany();
        const updatedProducts = yield Promise.all(allProducts.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            // 제품 이름에 따라 S3 버킷의 폴더 위치 결정
            const s3_Key = product.mainImage;
            if (!s3_Key)
                return product;
            const signedUrlParams = {
                Bucket: process.env.S3_BUCKET || "",
                Key: s3_Key,
                Expires: 3600 * 24,
            };
            const presignedUrl = yield s3.getSignedUrlPromise("getObject", signedUrlParams);
            return Object.assign(Object.assign({}, product), { mainImage: presignedUrl });
        })));
        return res.status(200).json(updatedProducts);
    }
    catch (e) {
        console.error("Failed to generate S3 image URLs", e);
        return res.status(500).json({ message: "Server Error" });
    }
}));
//** 제품 수정하기을 위한 제품 정보 가져오기 */
app.get("/api/getEditProduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsName = yield prisma_1.default.product.findMany({
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
    }
    catch (err) {
        err;
        return res.status(404).json({ message: "제품 이름 불러오기 실패" });
    }
}));
//** 제품 수정하기 */
app.post("/api/postEditProduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productEditData = req.body;
        const editProduct = yield prisma_1.default.product.update({
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
    }
    catch (err) {
        console.error(err);
        return res.status(404).json({ message: "제품 수정 실패" });
    }
}));
//################## 계정 ##################//
//** admin 계정 확인 */ 임시
app.post("/api/checkIsAdmin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = typeof req.query.email === "string" ? req.query.email : undefined;
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        return res.status(200).json((_a = user === null || user === void 0 ? void 0 : user.isAdmin) !== null && _a !== void 0 ? _a : false);
    }
    catch (error) {
        console.log(error, "확인 실패");
        return res.status(404).json({ message: "관리자 확인 실패" });
    }
}));
//################## 시작 ##################//
// Express 애플리케이션을 시작합니다.
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
//# sourceMappingURL=server.js.map