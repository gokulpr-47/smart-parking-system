hicleType].length; i++) {
    for (let j = 0; j < parkingLot[vehicleType][i].length; j++) {
      for (let k = 0; k < parkingLot[vehicleType][i][j].length; k++) {
        if (!parkingLot[vehicleType][i][j][k]) {
          parkingLot[vehicleType][i][j] = [
            parkingLot[vehicleType][i][j][0],
            true,
          ];
          return `Vehicle parked in spot ${parkingLot[vehicleType][i][j][0]}`;
        }
      }
      // console.log(parkingLot[vehicleType][i][j]);
    }
  }