import express from "express";
import anprRouter from "./anpr.js";
import qrCodeRouter from "./qrcode.js";

let router = express.Router();

router.use("/services/anpr", anprRouter);
router.use("/services/qrcode", qrCodeRouter);

export default router;
