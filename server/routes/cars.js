import { Router } from "express";
const router = Router();

import {
  getCarList,
  addCar,
  editCar,
  getCar,
  deleteCar,
} from "../controllers/cars.js";

router.get("/get/:id", getCar);
router.get("/list", getCarList);
router.post("/add", addCar);
router.patch("/edit/:id", editCar);
router.delete("/delete/:id", deleteCar);

export default router;
