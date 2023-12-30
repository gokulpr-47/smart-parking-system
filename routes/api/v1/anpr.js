import express from "express";
import anprServices from "../../../services/anpr.js";

const anprInstance = new anprServices();

let router = express.Router();

router.post("/", async function (req, res) {
	try {
		const num = await anprInstance.getVehicleNumber(req.body.file);
		res.setHeader("Content-Type", "application/json");
		res.setHeader("Cache-Control", `public, max-age=10`);
		res.status(200).json({
			message: "Success",
			// plate_num: num.results[0].plate,
			// vehicle: num.results[0].vehicle.type,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error", error: error.message });
	}
});

export default router;
