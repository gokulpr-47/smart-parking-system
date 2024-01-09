import mongoose from "mongoose";

const data = new mongoose.Schema(
  {
    vehicle_number: {
      type: String,
      required: [true, "Please enter the vehicle number"],
      index: true,
    },

    vehicle_type: {
      type: String,
      required: [true, "Please enter the vehicle type"],
      index: true,
    },
  },
  { timestamps: true }
);
const Data = mongoose.model("Data", data);
export default Data;
