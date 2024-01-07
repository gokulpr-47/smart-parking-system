import mongoose from "mongoose";

const spot = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      unique: true,
    },
    parkingSpot: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);
const Spot = mongoose.model("Spot", spot);
export default Spot;
