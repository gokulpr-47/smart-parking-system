import express from "express";
import ParkingSpot from "../../../model/parkingSpot.js";

let router = express.Router();

router.post("/", async function (req, res) {
  try {
    var value = req.body.datas;
    console.log(value);
    console.log("value: ", value);
    const newValue = new ParkingSpot({
      smallCar: [value.smallCar],
      largeCar: [value.largeCar],
      bike: [value.bike],
    });
    let result = await newValue.save();
    res.send(JSON.stringify(result)).status(204);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
});

router.get("/", async function (req, res) {
  try {
    var value = await ParkingSpot.findOne({ _id: "659a82c0e5e74986b4b82564" });
    res.send({ data: value });
  } catch (err) {
    console.error(err);
  }
});

export default router;
