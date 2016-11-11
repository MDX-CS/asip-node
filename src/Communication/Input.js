import Communication from './Communication';

export default class Input extends Communication {
  /**
   * Feeds the data to the input class.
   *
   * @param   {Object} data  Parsed data
   * @param   {Builder} builder  The respobse builder
   * @returns {this} input  Instance of this class
   */
  static feed(data, builder) {
    return new Input(data, builder);
  }


  /**
   * Decices whether the given pin is on.
   *
   * @param   {int} pin  The number of the pin
   * @returns {bool} on  Whether the pin is on
   */
  on(pin) {
    console.log(pin);
  }
}
