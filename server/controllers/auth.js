import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import CustomError from "../errors/index.js";
import { attachCookiesToResponse, createTokenUser } from "../utils/index.js";

const sendOTP = async (req, res) => {
  const otp = 111111;
  res.status(StatusCodes.OK).json({ otp });
};

const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  if (otp !== 111111) {
    throw new CustomError.BadRequestError("Invalid OTP");
  }
  res.status(StatusCodes.OK).json({ msg: "OTP verified" });
};

const register = async (req, res) => {
  const { email, phone, name, password, userRole } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  const phoneAlreadyExists = await User.findOne({ phone });
  if (emailAlreadyExists || phoneAlreadyExists) {
    throw new CustomError.BadRequestError("User already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "Admin" : userRole;
  console.log(role);
  const user = await User.create({ name, email, phone, password, role });

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    throw new CustomError.BadRequestError("Please provide phone and password");
  }
  const user = await User.findOne({ phone });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export { register, login, logout, sendOTP, verifyOTP };
