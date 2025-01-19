import { Router } from "express";

import {
    registerController,
    activationController,
    loginController,
    forgetController,
    resetPasswordController
} from "../controller/auth";

import {
    forgotPasswordValidator,
    resetPasswordValidator,
    validLogin,
    validRegister
} from "../middleware/validator";

const router = Router();

router.post("/register", validRegister, registerController);
router.put("/activate", activationController);
router.post("/login", validLogin, loginController);
router.put("/forget", forgotPasswordValidator, forgetController);
router.put("/reset",resetPasswordValidator, resetPasswordController );


export const authRouter = router