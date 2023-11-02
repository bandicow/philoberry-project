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
aws_sdk_1.default.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new aws_sdk_1.default.S3();
const router = express_1.default.Router();
router.get("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const newArtworks = yield prisma_1.default.artwork.findMany({
            where: { artist_name: String(name) },
        });
        const updatedArtworks = yield Promise.all(newArtworks.map((artwork) => __awaiter(void 0, void 0, void 0, function* () {
            const s3_Key = artwork.s3key;
            if (!s3_Key)
                return artwork;
            const signedUrlParams = {
                Bucket: process.env.S3_BUCKET || "",
                Key: s3_Key,
                Expires: 3600,
            };
            const presignedUrl = yield s3.getSignedUrlPromise("getObject", signedUrlParams);
            return Object.assign(Object.assign({}, artwork), { s3key: presignedUrl });
        })));
        return res.status(200).json(updatedArtworks);
    }
    catch (err) {
        console.error("Failed to generate S3 image URLs", err);
        return res.status(500).json({ message: "작품 불러오기 실패" });
    }
}));
exports.default = router;
//# sourceMappingURL=getArtwork.js.map