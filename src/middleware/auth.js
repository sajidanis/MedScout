import jwt from 'jsonwebtoken';
import { userController } from '../service/user';
import { logger } from '../util/logger';

export const auth = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        logger.error("No token, Auth Denied. PLease Login");
        return res.status(401).json({
            error: "No token, Auth Denied. Please Login"
        });
    }

    try{
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userController.getUserById(id);
        req.user = user;
        next();
    } catch(err) {
        logger.error(`${err.name} --> ${err.message}`);
        return res.status(400).json({
            error: err.message
        });
    }
}