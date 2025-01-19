import {User} from '../models/User';import { logger } from '../util/logger';
``

const userExist = async (email) => {
    return User.findOne({ email: email });
}

const getUser = async (req) => {
    return User.findOne(req);
}

const getUserById = async(id) => {
    try{
        const doc = User.findById(id);
        if(!doc){
            throw {name: "Retrieval Error", message: "User Does not Exist"};
        }
        return doc;
    } catch(err) {
        logger.error(`Error Occured in get User By Id --> ${err}`);
        throw {
            name: "Db Error",
            message: "Error occured cant access database. Please try again"
        };
    }
}

const createUser = async (userBody) => {
    try {
        return await User.create(userBody);
    } catch (err) {
        console.log(err);
    }
}

const updateOne = async (id, updatedBody) => {
    try {
        return User.findOneAndUpdate({ _id: id }, updatedBody, { new: true }).exec();
    } catch (e) {
        console.error(e);
    }
}

export const userController = {
    getUser,
    userExist,
    createUser,
    updateOne,
    getUserById
}