import { StatusCodes } from "http-status-codes";
import Car from "../models/Car.js";
import CustomError from "../errors/index.js";

const getCarList = async (req, res) => {
  const cars = await Car.find({});
  res.status(StatusCodes.OK).json(cars);
};

const getCar = async (req, res) => {
  const { id: carId } = req.params;
  const car = await Car.findOne({ _id: carId });
  if (!car) {
    throw new CustomError.NotFoundError(`No car with id : ${carId}`);
  }
  res.status(StatusCodes.OK).json(car);
};

const addCar = async (req, res) => {
  const car = await Car.create(req.body);
  res.status(StatusCodes.CREATED).json(car);
};

const editCar = async (req, res) => {
  const { id: carId } = req.params;
  const car = await Car.updateOne({ _id: carId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!car) {
    throw new CustomError.NotFoundError(`No car with id : ${carId}`);
  }

  res.status(StatusCodes.OK).json({ car });
};

const deleteCar = async (req, res) => {
  const { id: carId } = req.params;
  const car = await Car.deleteOne({ _id: carId });

  if (!car) {
    throw new CustomError.NotFoundError(`No car with id : ${carId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: `Car with id ${carId} has been deleted` });
};

export { getCar, getCarList, addCar, editCar, deleteCar };
