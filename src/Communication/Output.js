export default class Output {
  /**
   * Class constructor.
   *
   * @returns {void}
   */
  constructor(data) {
    this.data = data;
  }


  /**
   * Feeds the data to the output class.
   *
   * @returns {this} output  Instance of this class
   */
  static feed(data) {
    return new Output(data);
  }


  /**
   * Turns on given pin.
   *
   * @param   {int} pin  The number of the pin
   * @returns {void}
   */
  on(pin) {
    console.log(`turning on the ${pin} pin`);
  }
}
