import { Gateway } from 'fabric-network';
import { rootPath, serializePath } from './util/helper';
import {connect as connectWallet} from './wallet';

export const gateway = new Gateway();

export const connect = async identity => {
    const connectionProfile = JSON.parse(serializePath(`${rootPath}/certs/connection-profile.json`));
    const wallet = await connectWallet();

    console.log(`==========AS_LOCALHOST: ${process.env.AS_LOCALHOST}==========`);
    await gateway.connect(connectionProfile, {
        identity,
        wallet,
        discovery: {
            enabled: true,
            asLocalhost: (process.env.AS_LOCALHOST == "true")
        }
    });
    return gateway.getNetwork('defaultchannel');
};