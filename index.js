const axios = require("axios");

const makeApiRequest = async () => {
  const options = {
    method: "POST",
    url: "https://rto-vehicle-details.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "1753e92217msh8a83df23133041ep1e1cccjsna4d5985c5c69",
      "X-RapidAPI-Host": "rto-vehicle-details.p.rapidapi.com",
    },
    data: {
      vehicleId: "mh02fb2727",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Call the asynchronous function
makeApiRequest();
