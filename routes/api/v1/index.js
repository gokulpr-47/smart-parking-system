import express from "express";
import anprRouter from "./anpr.js";
// import qrCodeRouter from "./qrcode.js";
import exitRouter from "./exit.js";
import spotRouter from "./spot.js";

let router = express.Router();

router.use("/services/anpr", anprRouter);
// router.use("/services/qrcode", qrCodeRouter);
router.use("/services/exit", exitRouter);
router.use("/services/spot", spotRouter);
router.use("/services/getSpot", spotRouter);

export default router;
