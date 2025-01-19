import { Role } from "../Models/Roles";

import { logger } from "../util/logger";

const createRole = async (roleType) => {
    try {
        const data = await Role.create({ role: roleType });
        return data;
    } catch (err) {
        logger.error(err);
    }
}

const getRole = async (req) => {
    try {
        return Role.findOne(req);
    } catch (err) {
        logger.error(err);
    }
}


export const roleController = {
    createRole,
    getRole,
}

export const createRoleController = async (req, res) => {
    roleController.createRole("PATIENT");
    roleController.createRole("ADMIN");
    roleController.createRole("DOCTOR");

    res.json({
        msg: "Created",
    });
}