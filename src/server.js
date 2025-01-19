import express, { json, urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";


import { connect } from "./util/database";
import { logger } from "./util/logger";
import { authRouter } from "./routes/auth";
import { documentRouter } from "./routes/document";
import { register } from './fabric/wallet';
import { connect as connectGateway } from './fabric/gateway';
import { chaincodeRouter } from "./routes/chaincode";

const setupFabricWalletAndGateway = async () => {
    console.log('Setting up fabric wallet and gateway...');
    await register('user01');
    await connectGateway('user01');
    console.log('Set up complete!');
}

setupFabricWalletAndGateway();

const app = express();

const SERVER_API_PORT = process.env.PORT || process.env.SERVER_API_PORT;

app.use(json({
    limit: "20mb"
}));
app.use(urlencoded({
    extended: true,
    limit: "20mb"
}));

app.use(cors())
app.use(helmet())

// Use morgan dev while in dev environment
if (process.env.NODE_ENV == "dev") {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.send("ES6 is the node way to go");
});

app.use("/api/v1/user", authRouter)
app.use("/api/v1/document", documentRouter)
app.use("/api/v1/chaincode", chaincodeRouter)


export const start = async () => {
    await connect();
    app.listen(SERVER_API_PORT, () => {
        logger.info(`Server started at ${SERVER_API_PORT}`);
    });
}