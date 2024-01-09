import express from "express";
import loaders from "./loaders/index.js";
import * as routes from "./routes/index.js";
import config from "./config/index.js";
import cors from "cors";

async function startServer() {
	const app = express();
	let corsOptions = {
		origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
	};
	app.use(cors(corsOptions));
	app.use(express.json());

	await loaders(app);
	routes.init(app);
	app.listen(config.port, (err) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(`Your server is ready !`);
	});
}

startServer();
