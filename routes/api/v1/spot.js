import express from "express";
import Spot from "../../../model/spot.js";

let router = express.Router();

router.post("/", async function (req, res) {
  try {
    var value = req.body.data;
    const newValue = new Spot(value);
    let result = await newValue.save();
    res.send(JSON.stringify(result)).status(204);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
});

router.get("/", async function (req, res) {
  try {
    const value = await Spot.findOne({ bike: 30 });
    res.send({ value });
  } catch (err) {
    console.error(err);
  }
});

export default router;
