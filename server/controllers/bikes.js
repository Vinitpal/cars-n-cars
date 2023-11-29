import { StatusCodes } from "http-status-codes";
import Bike from "../models/Bike.js";
import CustomError from "../errors/index.js";

const getBikeList = async (req, res) => {
  const bikes = await Bike.find({});
  res.status(StatusCodes.OK).json(bikes);
};

const getBike = async (req, res) => {
  const { id: bikeId } = req.params;
  const bike = await Bike.findOne({ _id: bikeId });
  if (!bike) {
    throw new CustomError.NotFoundError(`No bike with id : ${bikeId}`);
  }
  res.status(StatusCodes.OK).json(bike);
};

const addBike = async (req, res) => {
  const bike = await Bike.create(req.body);
  res.status(StatusCodes.CREATED).json(bike);
};

const editBike = async (req, res) => {
  const { id: bikeId } = req.params;
  const bike = await Bike.updateOne({ _id: bikeId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bike) {
    throw new CustomError.NotFoundError(`No bike with id : ${bikeId}`);
  }

  res.status(StatusCodes.OK).json({ bike });
};

const deleteBike = async (req, res) => {
  const { id: bikeId } = req.params;
  const bike = await Bike.deleteOne({ _id: bikeId });

  if (!bike) {
    throw new CustomError.NotFoundError(`No bike with id : ${bikeId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: `Bike with id ${bikeId} has been deleted` });
};

export { getBike, getBikeList, addBike, editBike, deleteBike };
