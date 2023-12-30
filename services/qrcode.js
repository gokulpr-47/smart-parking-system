import axios from "axios";
import config from "../config/index.js";

export default class qrCodeServices {
  async getQrCode() {
    const currentTimestampPlus2Minutes = Math.floor(Date.now() / 1000) + 200;

    const data = {
      type: "upi_qr",
      name: "Store Front Display",
      usage: "single_use",
      fixed_amount: true,
      payment_amount: 300,
      description: "For Store 1",
      close_by: currentTimestampPlus2Minutes,
      notes: {
        purpose: "Test UPI QR Code notes",
      },
    };

    try {
      const response = await axios({
        method: "post",
        url: "https://api.razorpay.com/v1/payments/qr_codes",
        auth: {
          username: config.key_id,
          password: config.key_secret,
        },
        data: data,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
