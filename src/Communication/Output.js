import Communication from './Communication';

export default class Output extends Communication {
  /**
   * Feeds the data to the output class.
   *
   * @param   {Object} data  Parsed data
   * @param   {Builder} builder  The respobse builder
   * @returns {this} output  Instance of this class
   */
  static feed(data, builder) {
    return new Output(data, builder);
  }


  /**
   * Turns on given pin.
   *
   * @param   {int} pin  The number of the pin
   * @returns {void}
   */
  on(pin) {
    this.builder.on(pin);
  }


  /**
   * Sets the output mode fot the pin.
   *
   * @param   {int} pin  The number of the pin
   * @returns {void}
   */
  pin(pin) {
    this.builder.pin(pin);
  }
}
