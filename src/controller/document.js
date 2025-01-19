import Minio from "minio";
import { createDocument, findAllDocByUser, findDocByEtag } from "../service/document";
import { logger } from "../util/logger";
import { checkFileExist, makeBucket } from "../util/minio";
import fs from 'fs';
import { register } from "../fabric/wallet";
import { connect } from "../fabric/gateway";

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: Number(process.env.MINIO_PORT),
    useSSL: Boolean(Number(process.env.MINIO_SSL)),
    secretKey: process.env.MINIO_SECRET_KEY,
    accessKey: process.env.MINIO_ACCESS_KEY
})

export const createBucketController = async (req, res) => {
    logger.info("Create Bucket Controller Called");
    const { bucketName } = req.body;

    makeBucket(minioClient, bucketName);
    return res.json({
        message: "Done",
    })
}

export const uploadDocumentController = async (req, res) => {
    const { file, user } = req;
    const { fileName, description } = req.body;
    const bucketName = String(user.aadhar);

    try {
        const check = await minioClient.bucketExists(bucketName);
        if (!check) {
            makeBucket(minioClient, bucketName);
        }

        if (checkFileExist(minioClient, bucketName, fileName)) {
            return res.status(409).json({
                error: "File already exists with this fileName"
            })
        }

        const etag = await minioClient.putObject(bucketName, fileName, file.buffer);

        const doc = await findDocByEtag(etag.etag);

        if (doc && doc.name != fileName) {
            await minioClient.removeObject(bucketName, fileName);
            return res.status(409).json({
                error: `This file already uploaded with different filename --> ${doc.name}`
            })
        }

        if (!doc) {
            const documentBody = {
                name: fileName,
                user,
                etag: etag.etag
            }
            // Save this info to the database with file url
            await createDocument(documentBody);
        }
        const name = req.user.name;
        if (!fs.existsSync(`${process.cwd()}/fabric/wallet/${name}.id`)) {
            register(name);
        }

        const network = await connect(name);
        const contract = await network.getContract('record');
        const data = file.buffer;
        const addReport = await contract.submitTransaction('createRecord', etag.etag, data);
        logger.info(addReport.toString());

        return res.status(200).json({
            message: "File Uploaded Successfully",
        })
    } catch (err) {
        logger.error(err);
        return res.status(422).json({
            error: err.code
        })
    }
}

export const downloadDocumentController = async (req, res) => {
    const { fileName } = req.body
    const bucketName = String(req.user.aadhar)
    try {
        const stream = await minioClient.getObject(bucketName, fileName);
        stream.pipe(res);
    } catch (err) {
        logger.error(err);
        return res.status(422).json({
            error: err.code
        })
    }
}

export const getAllDocByUser = async (req, res) => {
    const user = req.user;
    const data = findAllDocByUser(user.id);
    if (!doc) {
        logger.error("No doc uploaded");
        return res.status(404).json({
            error: "No doc uploaded"
        })
    }

    return res.status(200).json({
        message: "Successful",
        data
    })

}
