import { Router } from "express";

import adminController from "../controllers/admin";

const router = Router();

router.post("/create", adminController.create);

router.get("/show", adminController.show);

export default router;
