export default class Input {
  /**
   * Class constructor.
   *
   * @returns {void}
   */
  constructor(data) {
    this.data = data;
  }


  /**
   * Feeds the data to the input class.
   *
   * @returns {this} input  Instance of this class
   */
  static feed(data) {
    return new Input(data);
  }


  /**
   * Decices whether the given pin is on.
   *
   * @param   {int} pin  The number of the pin
   * @returns {bool} on  Whether the pin is on
   */
  on(pin) {
    console.log(`the ${pin} pin is on/off`);
  }
}
