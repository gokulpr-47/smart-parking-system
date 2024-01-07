import axios from "axios";

export default class spotServices {
  async getSpotDetails() {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3000/api/v1/services/parkingSpot",
      });
      return response.data.data;
    } catch (err) {
      throw err;
    }
  }
}
