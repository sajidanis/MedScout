import { Router } from "express";
import Multer from "multer";

import {
    createBucketController, downloadDocumentController, getAllDocByUser, uploadDocumentController
} from "../controller/document";

import {
    auth
} from "../middleware/auth";

const router = Router();

router.post("/create-bucket", auth, createBucketController);
router.post("/upload", auth, Multer({storage: Multer.memoryStorage()}).single("upload"), uploadDocumentController);
router.post("/download", auth, downloadDocumentController);
router.get("/getAll", auth, getAllDocByUser);


export const documentRouter = router;