import { Router} from "express";
import { addToBlockChain, downloadRecord } from "../chaincode_api/api";

import Multer from "multer";

import {
    auth
} from "../middleware/auth";


const router = Router();

router.post('/addRecord', auth, Multer({storage: Multer.memoryStorage()}).single("upload"), addToBlockChain);
router.post('/getRecord', auth, downloadRecord);

export const chaincodeRouter = router; 
