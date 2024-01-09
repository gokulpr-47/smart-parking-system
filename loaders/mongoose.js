import * as mongoose from "mongoose";
import config from "../config/index.js";

export default async function mongooseLoader() {
  const connection = await mongoose.connect(config.databaseURL);
  return connection.connection.db;
}
