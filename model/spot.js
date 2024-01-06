import mongoose from "mongoose";

const spot = new mongoose.Schema(
  {
    smallCar: {
      type: Number,
      index: true,
    },

    largeCar: {
      type: Number,
      index: true,
    },

    bike: {
      type: Number,
      index: true,
    },
  },
  { timestamps: true }
);
const Spot = mongoose.model("Spot", spot);
export default Spot;
