import express from "express";
import qrCodeServices from "../../../services/qrcode.js";

const qrcodeInstance = new qrCodeServices();

let router = express.Router();

router.post("/", async function (req, res) {
  try {
    const code = await qrcodeInstance.getQrCode();
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", `public, max-age=10`);
    res.status(200).send(`<img src="${code.image_url}" alt="QR Code">`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
