import spotServices from "./spot.js";

const spotInstance = new spotServices();

export default class park {
  parkVehicle(parkingLot) {
    for (let i = 0; i < parkingLot.length; i++) {
      for (let j = 0; j < parkingLot[i].length; j++) {
        for (let k = 0; k < parkingLot[i][j].length; k++) {
          if (!parkingLot[i][j][k].isOccupied) {
            parkingLot[i][j][k].isOccupied = true;
            console.log(
              `Vehicle parked in spot ${parkingLot[i][j][k].spotName}`
            );
            return {
              parking: parkingLot,
              spotName: parkingLot[i][j][k].spotName,
            };
          }
        }
      }
    }
    return "No available spots";
  }

  vehicleExit(parkingLot, spotName) {
    for (let i = 0; i < parkingLot.length; i++) {
      for (let j = 0; j < parkingLot[i].length; j++) {
        for (let k = 0; k < parkingLot[i][j].length; k++) {
          if (parkingLot[i][j][k].spotName === spotName) {
            parkingLot[i][j][k].isOccupied = false;
            console.log(`Vehicle exited from spot ${spotName}`);
            return {
              spotName,
              parkingLot,
            };
          }
        }
      }
    }
    return "Spot not found";
  }
}

// async function getDetails() {
//   const result = await spotInstance.getSpotDetails();
//   return result;
// }

// (async () => {
//   const parkingLot = await getDetails();
//   const smallCar = parkingLot.smallCar;
//   console.log(parkVehicle(smallCar));
//   // console.log(vehicleExit(smallCarParkingLot, "S11"));
// })();
