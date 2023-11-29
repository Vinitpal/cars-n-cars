import { StatusCodes } from "http-status-codes";

const getLocationList = async (req, res) => {
  const locations = ["Raipur", "Bilaspur", "Bhilai", "Durg", "Jabalpur"];
  res.status(StatusCodes.OK).json(locations);
};

export { getLocationList };
