import { Document } from "../models/Document";
import { logger } from "../util/logger";

export const createDocument = async (docBody) => {
    try{
        logger.info("Creating a doc");
        return await Document.create(docBody);
    } catch (err) {
        logger.error(err);
    }
}

export const findDocByEtag = async(etag) => {
    try{
        logger.info(`Getting a document by etag --> ${etag}`);
        return await Document.findOne({condition: etag});
    } catch(err){
        logger.error(err);
    }
}

export const findAllDocByUser = async(userId) => {
    try{
        logger.info("Finding all docs by user");
        return await Document.find({user: userId});
    } catch(err){
        logger.error(err);
    }
}