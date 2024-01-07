import mongoose from "mongoose";

const parkingSpotSchema = new mongoose.Schema({
  smallCar: [{ type: mongoose.Schema.Types.Mixed }],
  largeCar: [{ type: mongoose.Schema.Types.Mixed }],
  bike: [{ type: mongoose.Schema.Types.Mixed }],
});

const ParkingSpot = mongoose.model("ParkingSpot", parkingSpotSchema);

export default ParkingSpot;
