import fs from 'fs';
import path from "path";

export const rootPath = process.cwd();
export const serializePath = fileName => fs.readFileSync(path.resolve(rootPath, fileName), 'utf-8');

export const getDirectory = (folderPath) => {
    return fs.promises.readdir(folderPath, (err, data) => {
        if (err) throw err;
        return data;
    })
};

export const generateCertPath = async () => {
    const {
        CHANNEL_ID,
        CHAINCODE_NAME,
        CHAINCODE_VERSION,
        CHAINCODE_SEQUENCE,
        ORDERER_NAME,
        MSP_ID,
        PEER_NAME
    } = process.env;

    const certDirectoryPath = `${rootPath}/certs`;

    const ADMIN_CERT = await getDirectory(`${certDirectoryPath}/msp/admincerts`).then(([certName]) => {
        return `${certDirectoryPath}/msp/admincerts/${certName}`;
    });

    const ADMIN_PRIVATE_KEY = `${certDirectoryPath}/msp/keystore/priv_sk`;

    const PEER_TLS_ROOTCERT_FILE = await getDirectory(`${certDirectoryPath}/msp/tlscacerts`).then(([certName]) => {
        return `${certDirectoryPath}/msp/tlscacerts/${certName}`;
    });

    const ordererName = ORDERER_NAME.split('.').shift();

    return ({
        ADMIN_CERT,
        ADMIN_PRIVATE_KEY,
        CHANNEL_ID,
        CHAINCODE_NAME,
        CHAINCODE_VERSION,
        CHAINCODE_SEQUENCE,
        ORDERER_CA: `${certDirectoryPath}/${ordererName}-cert.pem`,
        ORDERER_ADDRESS: `${ORDERER_NAME}:7050`,
        MSP_ID,
        MSP_PATH: `${certDirectoryPath}/msp`,
        PEER_ADDRESS: `${PEER_NAME}:7051`,
        PEER_TLS_ROOTCERT_FILE,
        ROOT_PATH: rootPath,
    });
}

export const flushTmpFolder = () => {
    return fs.promises.rmdir(`${rootPath}/certs/tmp`, { recursive: true }, (err) => {
        if (err) { throw err; }
    });
};

export const makeTmpFolder = async () => {
    if (fs.existsSync(`${rootPath}/certs/tmp`)) {
        await flushTmpFolder();
    }
    return fs.promises.mkdir(`${rootPath}/certs/tmp`, (err) => {
        if (err) { throw err; }
    });
};
