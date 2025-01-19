import { logger } from "./logger";

export const makeBucket = async (minioClient, bucketName) => {
    try{
        await minioClient.makeBucket(bucketName, 'us-east-1');
        logger.info(`Bucket created successfully --> ${bucketName}`);
    } catch(err) {
        logger.error(`Error creating bucket -> ${err}`);
    }
}

export const checkFileExist = async (minioClient, bucketName, fileName) => {
    try{
        await minioClient.statObject(bucketName, fileName);
        return true;
    } catch(err) {
        return false;
    }
}
