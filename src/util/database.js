import mongoose from "mongoose";

import { logger } from "./logger";

const MONGO_URI = process.env.MONGO_URI;

export const connect = (url = MONGO_URI, opts = {}) => {
    logger.info("Database Connected");

    mongoose.connect(url, {
        ...opts,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}