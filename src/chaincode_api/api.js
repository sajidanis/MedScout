import express from "express";
import { connect } from '../fabric/gateway';
import { logger } from "../util/logger";


export const addToBlockChain = async (req, res) => {
    const { file, user } = req;
    const { fileName, description } = req.body;
    const bucketName = String(user.aadhar);
    const network = await connect('user01');
    const contract = await network.getContract('record');
    const data = file.buffer;
    const addReport = await contract.submitTransaction('createRecord', fileName, data);
    res.status(200).json({
        message: addReport.toJSON()
    });
}

export const downloadRecord = async (req, res) => {
    const { fileName } = req.body
    const bucketName = String(req.user.aadhar)
    const network = await connect('user01');
    const contract = await network.getContract('record');
    try {
        const stream = await contract.submitTransaction('readRecord', fileName);
        res.send(stream);
    } catch (err) {
        logger.error(err);
        return res.status(422).json({
            error: err.code
        })
    }
}