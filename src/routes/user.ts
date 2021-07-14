import { Router } from "express";

const router = Router();

import userController from "../controllers/user";

router.get("/signup", userController.signup);

router.post("/login", userController.login);

export default router;
