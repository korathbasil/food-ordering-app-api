import { Router } from "express";

const router = Router();

import userController from "../controllers/user";

router.put("/signup", userController.signup);

router.post("/login", userController.login);

export default router;
