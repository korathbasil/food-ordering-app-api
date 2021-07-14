import { Router } from "express";

const router = Router();

import userController from "../controllers/user";

router.get("/signup", userController.signup);

export default router;
