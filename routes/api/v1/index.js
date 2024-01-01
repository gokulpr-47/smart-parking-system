import express from "express";
import anprRouter from "./anpr.js";
import qrCodeRouter from "./qrcode.js";
import exitRouter from "./exit.js";

let router = express.Router();

router.use("/services/anpr", anprRouter);
router.use("/services/qrcode", qrCodeRouter);
router.use("/services/exit", exitRouter);

export default router;
