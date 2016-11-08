export default class Port {
  /**
   * Finds the port Arduino is connected on.
   *
   * @returns {string} port  The port name
   */
  static resolve() {
    return '/dev/ttyACM0';
  }
}
