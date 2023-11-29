import { Schema, model } from "mongoose";
import User from "./User.js";

const CarSchema = new Schema(
  {
    brand: String,
    model: String,
    variant: String,
    cc: String,
    bodyType: String,
    kilometerDriven: String,
    price: String,
    location: String,
    regState: String,
    regNum: String,
    fuelType: String,
    color: String,
    condition: String,
    yearOfPurchase: String,
    numOfOwners: String,
    manufacturingYear: String,
    seater: String,
    currentOnRoad: String,
    insurance: { type: Boolean, default: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    images: {
      type: Array,
      default: [],
    },
    sold: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

CarSchema.pre("save", async function () {
  // for first time creating car add the car id to the user
  if (!this.isNew) {
    return;
  }

  try {
    const user = await User.findOne({ _id: this.userId });
    if (user) {
      user.cars.push(this._id);
      await user.save();
    }
  } catch (error) {
    console.error(error);
  }
});

CarSchema.pre("deleteOne", async function () {
  try {
    // pull car id from user
    const user = await User.findOne({ _id: this.userId });
    if (user) {
      user.cars.pull(this._id);
      await user.save();
    }
  } catch (error) {
    console.error(error);
  }
});

export default model("Car", CarSchema);
