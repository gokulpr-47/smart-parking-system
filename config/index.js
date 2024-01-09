import dotenv from "dotenv";

dotenv.config();

export default {
  port: 3000,
  anpr: process.env.anpr,
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
  databaseURL: process.env.databaseURL,
  parkingId: process.env.parkingId,
};
