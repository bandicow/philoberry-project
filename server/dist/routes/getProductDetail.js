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
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = express_1.default.Router();
aws_sdk_1.default.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new aws_sdk_1.default.S3();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const productInfo = yield prisma_1.default.product.findUnique({
            where: { id: Number(id) },
        });
        const productImages = yield prisma_1.default.productImage.findMany({
            where: { productId: Number(id) },
        });
        const updatedProducts = yield Promise.all(productImages.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const s3_Key = product.s3key;
            if (!s3_Key)
                return null;
            const signedUrlParams = {
                Bucket: process.env.S3_BUCKET || "",
                Key: s3_Key,
                Expires: 3600,
            };
            const presignedUrl = yield s3.getSignedUrlPromise("getObject", signedUrlParams);
            return presignedUrl;
        })));
        const validUrls = updatedProducts.filter((url) => url !== null);
        const data = Object.assign(Object.assign({}, productInfo), { s3key: validUrls });
        if (!productInfo) {
            return res.status(404).json({ error: "productInfo not found" });
        }
        return res.status(200).json(data);
    }
    catch (e) {
        console.error("제품정보를 불러오는데 실패하였습니다.", e);
        return res.status(500).json({ message: "Server Error" });
    }
}));
exports.default = router;
//# sourceMappingURL=getProductDetail.js.map