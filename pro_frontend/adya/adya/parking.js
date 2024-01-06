$.ajaxSetup({
  headers: {
    "Content-Type": "application/json",
  },
});

async function checkParkingSetup() {
  var check;
  await $.get("http://localhost:3000/api/v1/services/getSpot")
    .then(async (response) => {
      console.log(response.value);
      check = await response.value;
    })
    .catch((error) => {
      console.error(error);
    });
  return check;
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
  $.post(
    "http://localhost:3000/api/v1/services/spot",
    JSON.stringify({ data: values }), //change
    function (data, status) {
      console.log(data);
    }
  );
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
  parkingLot.forEach((category) => {
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
}

function displayParkingLotLarge(parkingLot) {
  let parkingLotDiv = document.querySelector(".large-car");
  parkingLot.forEach((category) => {
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
}

function displayParkingLotBike(parkingLot) {
  let parkingLotDiv = document.querySelector(".bikes");
  parkingLot.forEach((category) => {
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
}

(async () => {
  try {
    const result = await checkParkingSetup();
    let smallCar = createParkingLot(result.smallCar, "sc");
    let largeCar = createParkingLot(result.largeCar, "lc");
    let bike = createParkingLot(result.bike, "b");
    console.log(bike);
    displayParkingLot(smallCar);
    displayParkingLotLarge(largeCar);
    displayParkingLotBike(bike);
  } catch (error) {
    console.error(error);
  }
})();
