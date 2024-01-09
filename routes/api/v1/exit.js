import express from "express";
import Data from "../../../model/data.js";
import anprServices from "../../../services/anpr.js";
import costServices from "../../../services/cost.js";
import qrCodeServices from "../../../services/qrcode.js";
import spotServices from "../../../services/spot.js";
import ParkingSpot from "../../../model/parkingSpot.js";
import park from "../../../services/algorithm.js";
import Spot from "../../../model/spot.js";
import config from "../../../config/index.js";

const qrcodeInstance = new qrCodeServices();

const anprInstance = new anprServices();

const costInstance = new costServices();

const parkInstance = new park();
const spotInstance = new spotServices();

let router = express.Router();

router.post("/", async function (req, res) {
  // const image_path = "./assets/img/image4.jpg";
  // const num = await anprInstance.getVehicleNumber(image_path);
  const num = await anprInstance.getVehicleNumber(req.body.file);
  let vehicle_number = num.results[0].plate;
  let vehicle = await Data.findOne({ vehicle_number });
  const currentTime = new Date();
  const timeDifference = currentTime - vehicle.createdAt;
  const hours = timeDifference / (1000 * 60 * 60);
  // const cost = await costInstance.getCost(hours);
  const cost = 30;
  const code = await qrcodeInstance.getQrCode(cost);
  res.json({ data: code.image_url }).status(200);
  console.log("image: ", code.image_url);
  // res.send(`<img src="${code.image_url}" alt="QR Code">`).status(200);
  // res.redirect("/payment.html");

  const value = await Spot.findOne({ vehicleNumber: vehicle_number });

  const spots = await spotInstance.getSpotDetails();

  if (vehicle.vehicle_type == "Sedan") {
    const spot = spots.smallCar;
    const resultSpot = parkInstance.vehicleExit(spot, value.parkingSpot);

    const update = { $set: { smallCar: resultSpot.parkingLot } };
    const updateResult = await ParkingSpot.findOneAndUpdate(
      { placeName: "manipal" },
      update,
      { returnNewDocument: true }
    );
    await Spot.deleteMany({ vehicleNumber: vehicle_number });
  } else if (
    vehicle.vehicle_type == "SUV" ||
    vehicle.vehicle_type == "Big Truck" ||
    vehicle.vehicle_type == "Pickup Truck"
  ) {
    const spot = spots.largeCar;
    const resultSpot = parkInstance.vehicleExit(spot, value.parkingSpot);

    const update = { $set: { largeCar: resultSpot.parkingLot } };
    const updateResult = await ParkingSpot.findOneAndUpdate(
      { placeName: "manipal" },
      update,
      { returnNewDocument: true }
    );
    await Spot.deleteMany({ vehicleNumber: vehicle_number });
  } else {
    const spot = spots.bike;
    const resultSpot = parkInstance.vehicleExit(spot, value.parkingSpot);

    const update = { $set: { bike: resultSpot.parkingLot } };
    const updateResult = await ParkingSpot.findOneAndUpdate(
      { placeName: "manipal" },
      update,
      { returnNewDocument: true }
    );
    await Spot.deleteMany({ vehicleNumber: vehicle_number });
  }
  let result = await Data.deleteMany({ vehicle_number });
});

export default router;
