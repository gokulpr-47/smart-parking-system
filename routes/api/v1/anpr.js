import express from "express";
import anprServices from "../../../services/anpr.js";
import Data from "../../../model/data.js";

const anprInstance = new anprServices();

let router = express.Router();

router.post("/", async function (req, res) {
  const image_path = "./assets/img/image3.jpg";
  try {
    // const num = await anprInstance.getVehicleNumber(req.body.file);    //change
    const num = await anprInstance.getVehicleNumber(image_path);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", `public, max-age=10`);
    let data = {
      vehicle_number: num.results[0].plate,
      vehicle_type: num.results[0].vehicle.type,
    };
    const newData = new Data(data);
    let result = await newData.save();
    res.send(JSON.stringify(result)).status(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error", error: error.message });
  }
});

export default router;
