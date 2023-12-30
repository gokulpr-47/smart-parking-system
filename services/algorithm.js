function parkVehicle(parkingLot, vehicleType) {
  for (let i = 0; i < parkingLot[vehicleType].length; i++) {
    if (!parkingLot[vehicleType][i][1]) {
      parkingLot[vehicleType][i] = [parkingLot[vehicleType][i][0], true];
      return `Vehicle parked in spot ${parkingLot[vehicleType][i][0]}`;
    }
  }
  return "No available spots";
}

function vehicleExit(parkingLot, vehicleType, spotName) {
  for (let i = 0; i < parkingLot[vehicleType].length; i++) {
    if (parkingLot[vehicleType][i][0] === spotName) {
      parkingLot[vehicleType][i] = [spotName, false];
      return `Vehicle exited from spot ${spotName}`;
    }
  }
  return "Spot not found";
}

const smallCarParkingLot = [
  ["S1", false],
  ["S2", false],
  ["S3", false],
  ["S4", false],
  ["S5", false],
  ["S6", false],
];
const largeCarParkingLot = [
  ["L1", false],
  ["L2", false],
  ["L3", false],
  ["L4", false],
  ["L5", false],
  ["L6", false],
];
const bikeParkingLot = [
  ["B1", false],
  ["B2", false],
  ["B3", false],
  ["B4", false],
  ["B5", false],
  ["B6", false],
];

const parkingLot = [smallCarParkingLot, largeCarParkingLot, bikeParkingLot];

console.log(parkVehicle(parkingLot, 0));
console.log(parkVehicle(parkingLot, 1));
console.log(parkVehicle(parkingLot, 2));
console.log(vehicleExit(parkingLot, 0, "S1"));
