import { Router } from "express";
const router = Router();

import {
  getBikeList,
  addBike,
  editBike,
  getBike,
  deleteBike,
} from "../controllers/bikes.js";

router.get("/get/:id", getBike);
router.get("/list", getBikeList);
// router.post("/add", addBike);
// router.patch("/edit/:id", editBike);
// router.delete("/delete/:id", deleteBike);

export default router;
