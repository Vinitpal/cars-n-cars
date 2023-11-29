import express from "express";
const router = express.Router();

import {
  login,
  logout,
  register,
  sendOTP,
  verifyOTP,
} from "../controllers/auth.js";

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);

export default router;
