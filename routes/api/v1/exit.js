import express from "express";
import Data from "../../../model/data.js";
import anprServices from "../../../services/anpr.js";
import costServices from "../../../services/cost.js";
import qrCodeServices from "../../../services/qrcode.js";

const qrcodeInstance = new qrCodeServices();

const anprInstance = new anprServices();

const costInstance = new costServices();

let router = express.Router();

router.post("/", async function (req, res) {
  const image_path = "./assets/img/image3.jpg";
  const num = await anprInstance.getVehicleNumber(image_path);
  let vehicle_number = num.results[0].plate;
  let vehicle = await Data.find({ vehicle_number });
  const currentTime = new Date();
  const timeDifference = currentTime - vehicle[0].createdAt;
  const hours = timeDifference / (1000 * 60 * 60);
  const cost = await costInstance.getCost(hours);

  const code = await qrcodeInstance.getQrCode(cost);
  res.send(`<img src="${code.image_url}" alt="QR Code">`).status(200);
  let result = await Data.deleteMany({ vehicle_number });

  // res.send({ result, cost }).status(204);
});

export default router;
