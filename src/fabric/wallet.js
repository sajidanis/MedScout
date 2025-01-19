import path from 'path';
import { Wallets } from 'fabric-network';
import { generateCertPath, serializePath } from './util/helper';

export const connect = () => Wallets.newFileSystemWallet(path.join(process.cwd(), '/fabric/wallets'));

export const register = async identityLabel => {
    try {
        const { ADMIN_CERT, ADMIN_PRIVATE_KEY, MSP_ID: mspId } = await generateCertPath();
        const certificate = serializePath(ADMIN_CERT);
        const privateKey = serializePath(ADMIN_PRIVATE_KEY);

        const wallet = await connect();

        const existingIdentity = await wallet.get(identityLabel);
        if (existingIdentity) {
            await wallet.remove(identityLabel);
        }

        await wallet.put(identityLabel, {
            credentials: {
                certificate,
                privateKey,
            },
            mspId,
            type: 'X.509',
        });
    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
};