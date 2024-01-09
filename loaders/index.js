import expressLoader from "./express.js";
import mongooseLoader from "./mongoose.js";

export default async function loaders(app) {
  await expressLoader(app);
  console.log("Express Initialized");
  await mongooseLoader();
  console.log("MongoDB Intialized");
}
