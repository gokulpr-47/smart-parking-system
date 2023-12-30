import expressLoader from "./express.js";

export default async function loaders(app) {
  await expressLoader(app);
  console.log("Express Initialized");
}
