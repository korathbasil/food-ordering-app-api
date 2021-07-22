import { Router } from "express";

import adminController from "../controllers/admin";

const router = Router();

router.post("/create", adminController.create);

router.get("/show", adminController.show);

router.delete("/remove", adminController.remove);

router.post("/add-restaurant", adminController.addRestaurant);

export default router;
