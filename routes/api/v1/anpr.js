import express from "express";
import anprServices from "../../../services/anpr.js";
import Data from "../../../model/data.js";
import Spot from "../../../model/spot.js";
import park from "../../../services/algorithm.js";
import spotServices from "../../../services/spot.js";
import ParkingSpot from "../../../model/parkingSpot.js";
import config from "../../../config/index.js";

const anprInstance = new anprServices();
const parkInstance = new park();
const spotInstance = new spotServices();

let router = express.Router();

router.post("/", async function (req, res) {
  const image_path = "./assets/img/image4.jpg";
  try {
    const num = await anprInstance.getVehicleNumber(req.body.file); //change
    // const num = await anprInstance.getVehicleNumber(image_path);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", `public, max-age=10`);
    let data = {
      vehicle_number: num.results[0].plate,
      vehicle_type: num.results[0].vehicle.type,
    };
    const newData = new Data(data);
    let result = await newData.save();
    const spots = await spotInstance.getSpotDetails();
    if (result.vehicle_type == "Sedan") {
      const spot = spots.smallCar;
      const resultSpot = parkInstance.parkVehicle(spot);
      const newValue = new Spot({
        vehicleNumber: result.vehicle_number,
        parkingSpot: resultSpot.spotName,
      });
      await newValue.save();
      let update = { $set: { smallCar: resultSpot.parking } };
      const updateResult = await ParkingSpot.findOneAndUpdate(
        { placeName: "manipal" },
        update,
        { returnNewDocument: true }
      );
    } else if (
      result.vehicle_type == "SUV" ||
      result.vehicle_type == "Big Truck" ||
      result.vehicle_type == "Pickup Truck"
    ) {
      const spot = spots.largeCar;
      const resultSpot = parkInstance.parkVehicle(spot);
      const newValue = new Spot({
        vehicleNumber: result.vehicle_number,
        parkingSpot: resultSpot.spotName,
      });
      await newValue.save();
      // console.log(resultSpot.parking);
      let update = { $set: { largeCar: resultSpot.parking } };
      const updateResult = await ParkingSpot.findOneAndUpdate(
        { placeName: "manipal" },
        update,
        { returnNewDocument: true }
      );
    } else {
      const spot = spots.bike;
      const resultSpot = parkInstance.parkVehicle(spot);
      const newValue = new Spot({
        vehicleNumber: result.vehicle_number,
        parkingSpot: resultSpot.spotName,
      });
      await newValue.save();
      // console.log(resultSpot.parking);
      let update = { $set: { bike: resultSpot.parking } };
      const updateResult = await ParkingSpot.findOneAndUpdate(
        { placeName: "manipal" },
        update,
        { returnNewDocument: true }
      );
    }
    res.send(JSON.stringify(result)).status(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error", error: error.message });
  }
});

export default router;
