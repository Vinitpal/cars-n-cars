import { Router } from "express";
const router = Router();

import { getLocationList } from "../controllers/locations.js";

router.get("/list", getLocationList);

export default router;
