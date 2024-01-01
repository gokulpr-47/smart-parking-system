export default class costServices {
  async getCost(hours) {
    let time = hours;
    let price = 0;
    if (time < 3) price = 30;
    else {
      price = 30;
      time -= 3;
      price = price + time * 10;
    }
    return price;
  }
}
