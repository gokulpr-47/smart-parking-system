import express from "express";
import Data from "../../../model/data.js";
import anprServices from "../../../services/anpr.js";
import costServices from "../../../services/cost.js";
import qrCodeServices from "../../../services/qrcode.js";
import spotServices from "../../../services/spot.js";
import ParkingSpot from "../../../model/parkingSpot.js";
import park from "../../../services/algorithm.js";
import Spot from "../../../model/spot.js";

const qrcodeInstance = new qrCodeServices();

const anprInstance = new anprServices();

const costInstance = new costServices();

const parkInstance = new park();
const spotInstance = new spotServices();

let router = express.Router();

router.post("/", async function (req, res) {
  const image_path = "./assets/img/image4.jpg";
  const num = await anprInstance.getVehicleNumber(image_path);
  let vehicle_number = num.results[0].plate;
  let vehicle = await Data.findOne({ vehicle_number });
  const currentTime = new Date();
  const timeDifference = currentTime - vehicle.createdAt;
  const hours = timeDifference / (1000 * 60 * 60);
  const cost = await costInstance.getCost(hours);

  const code = await qrcodeInstance.getQrCode(cost);
  res.send(`<img src="${code.image_url}" alt="QR Code">`).status(200);

  const value = await Spot.findOne({ vehicleNumber: vehicle_number });
  console.log(value);

  const spots = await spotInstance.getSpotDetails();

  if (vehicle.vehicle_type == "Sedan") {
    const spot = spots.smallCar;
    const resultSpot = parkInstance.vehicleExit(spot, value.parkingSpot);

    const update = { $set: { smallCar: resultSpot.parkingLot } };
    const updateResult = await ParkingSpot.findOneAndUpdate(
      { _id: "659a82c0e5e74986b4b82564" },
      update,
      { returnNewDocument: true }
    );
    await Spot.deleteMany({ vehicleNumber: vehicle_number });
  } else if (vehicle.vehicle_type == "SUV") {
  } else {
  }
  let result = await Data.deleteMany({ vehicle_number });

  // res.send({ result, cost }).status(204);
});

export default router;
