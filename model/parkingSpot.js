import mongoose from "mongoose";

const parkingSpot = new mongoose.Schema({
  smallCar: [
    {
      spotName: String,
      isOccupied: Boolean,
    },
  ],
  largeCar: [
    {
      spotName: String,
      isOccupied: Boolean,
    },
  ],
  bike: [
    {
      spotName: String,
      isOccupied: Boolean,
    },
  ],
  parkingName: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "Spot",
  },
});

const ParkingSpot = mongoose.model("ParkingSpot", parkingSpot);
export default ParkingSpot;
