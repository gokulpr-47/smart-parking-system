$.ajaxSetup({
  headers: {
    "Content-Type": "application/json",
  },
});

async function checkParkingSetup() {
  try {
    const response = await $.ajax({
      url: "http://localhost:3000/api/v1/services/parkingSpot",
      method: "GET",
    });
    const check = response.data;
    return check;
  } catch (error) {
    console.error(error);
  }
}

// Function to show the setup popup
function showSetupPopup() {
  document.getElementById("popupOverlay").style.display = "flex";
}

// Function to close the setup popup and save values to local storage
function closeSetupPopup() {
  const values = {
    smallCar: 0,
    largeCar: 0,
    bike: 0,
  };
  var largeCarsSpot = document.getElementById("largeCarsSpot").value;
  var smallCarsSpot = document.getElementById("smallCarsSpot").value;
  var bikesSpot = document.getElementById("bikesSpot").value;

  if (largeCarsSpot !== "" && smallCarsSpot !== "" && bikesSpot !== "") {
    values.smallCar = smallCarsSpot;
    values.largeCar = largeCarsSpot;
    values.bike = bikesSpot;
    document.getElementById("popupOverlay").style.display = "none";
  } else {
    alert("Please enter values for all parking spots.");
  }
  // $.post(
  //   "http://localhost:3000/api/v1/services/spot",
  //   JSON.stringify({ data: values }), //change
  //   function (data, status) {
  //     console.log(data);
  //   }
  // );
  let smallCar = createParkingLot(values.smallCar, "sc");
  let largeCar = createParkingLot(values.largeCar, "lc");
  let bike = createParkingLot(values.bike, "b");
  const details = {
    smallCar,
    largeCar,
    bike,
  };
  $.post(
    "http://localhost:3000/api/v1/services/parkingSpot",
    JSON.stringify({ datas: details }),
    function ({ data, status }) {
      // console.log(data);
    }
  );
  window.location.reload();
}

// Check if setup is needed and show popup
(async () => {
  try {
    const result = await checkParkingSetup();
    if (!result) {
      showSetupPopup();
    }
  } catch (error) {
    console.error(error);
  }
})();

//creating subdivs
function createParkingLot(numCategories, categoryName) {
  let parkingLot = [];
  if (categoryName == "b") {
    for (let i = 0; i < numCategories; i++) {
      let category = [];
      category.push({
        spotName: `${categoryName}${i + 1}`,
        isOccupied: false,
      });
      parkingLot.push(category);
    }
    return parkingLot;
  }
  for (let i = 0; i < numCategories; i++) {
    let category = [];
    for (let j = 1; j <= 6; j++) {
      category.push({
        spotName: `${categoryName}${i + 1}${j}`,
        isOccupied: false,
      });
    }
    parkingLot.push(category);
  }
  return parkingLot;
}

function displayParkingLot(parkingLot) {
  let parkingLotDiv = document.querySelector(".small-car");
  parkingLot.forEach((categories) => {
    categories.forEach((category) => {
      let categoryDiv = document.createElement("div");
      categoryDiv.className = "category2";
      category.forEach((spot) => {
        let spotDiv = document.createElement("div");
        spotDiv.className = "spot";

        if (spot.isOccupied) {
          spotDiv.classList.add("occupied");
        } else {
          spotDiv.classList.add("vacant");
        }

        spotDiv.textContent = spot.spotName;
        categoryDiv.appendChild(spotDiv);
      });
      parkingLotDiv.appendChild(categoryDiv);
    });
  });
}

function displayParkingLotLarge(parkingLot) {
  let parkingLotDiv = document.querySelector(".large-car");
  parkingLot.forEach((categories) => {
    categories.forEach((category) => {
      let categoryDiv = document.createElement("div");
      categoryDiv.className = "category2";
      category.forEach((spot) => {
        let spotDiv = document.createElement("div");
        spotDiv.className = "spot";

        if (spot.isOccupied) {
          spotDiv.classList.add("occupied");
        } else {
          spotDiv.classList.add("vacant");
        }

        spotDiv.textContent = spot.spotName;
        categoryDiv.appendChild(spotDiv);
      });
      parkingLotDiv.appendChild(categoryDiv);
    });
  });
}

function displayParkingLotBike(parkingLot) {
  let parkingLotDiv = document.querySelector(".bikes");
  parkingLot.forEach((categories) => {
    categories.forEach((category) => {
      let categoryDiv = document.createElement("div");
      categoryDiv.className = "category2";
      category.forEach((spot) => {
        let spotDiv = document.createElement("div");
        spotDiv.className = "spot";

        if (spot.isOccupied) {
          spotDiv.classList.add("occupied");
        } else {
          spotDiv.classList.add("vacant");
        }

        spotDiv.textContent = spot.spotName;
        categoryDiv.appendChild(spotDiv);
      });
      parkingLotDiv.appendChild(categoryDiv);
    });
  });
}

(async () => {
  try {
    const result = await checkParkingSetup();
    console.log(result);
    displayParkingLot(result.smallCar);
    displayParkingLotLarge(result.largeCar);
    displayParkingLotBike(result.bike);
  } catch (error) {
    console.error(error);
  }
})();
