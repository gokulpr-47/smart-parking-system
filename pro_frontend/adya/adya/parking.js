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
