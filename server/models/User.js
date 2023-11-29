import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
    required: [true, "Please provide email"],
  },
  phone: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => validator.isMobilePhone(v, "en-IN"),
      message: "Please provide valid phone number",
    },
    required: [true, "Please provide phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["Admin", "Dealer", "User"],
    default: "User",
  },
  location: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  cars: {
    type: [Schema.Types.ObjectId],
    ref: "Car",
    default: [],
  },
  bikes: {
    type: [Schema.Types.ObjectId],
    ref: "Bike",
    default: [],
  },
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

export default model("User", UserSchema);
