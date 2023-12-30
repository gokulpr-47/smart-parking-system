import axios from "axios";
import FormData from "form-data";
import * as fs from "fs";
import config from "../config/index.js";
import toFile from "data-uri-to-file";

export default class anprServices {
	async getVehicleNumber(file) {
		// toFile(file).then((converted) => {
		// 	console.log(
		// 		converted.mimeType,
		// 		converted.data,
		// 		converted.extension
		// 	);
		// });
		// File Object

		var dataurl = file;
		var regex = /^data:.+\/(.+);base64,(.*)$/;
		var matches = dataurl.match(regex);
		var ext = matches[1];
		var data = matches[2];
		var buffer = Buffer.from(data, "base64");
		fs.writeFileSync("data." + ext, buffer);
		// let buff = Buffer.from(file, "base64");
		// fs.writeFileSync("stack-abuse-logo-out.png", buff);
		// const image_path = "../smart-parking-system/assets/img/image6.jpg";
		// const body = new FormData();
		// body.append("upload", fs.createReadStream(image_path));
		// // Or body.append('upload', base64Image);
		// body.append("regions", "in");

		// try {
		//   const response = await axios({
		//     method: "post",
		//     url: "https://api.platerecognizer.com/v1/plate-reader/",
		//     headers: {
		//       Authorization: config.anpr,
		//       ...body.getHeaders(),
		//     },
		//     data: body,
		//   });

		//   return response.data;
		// } catch (error) {
		//   console.error(error);
		//   throw error;
		// }
	}
}
