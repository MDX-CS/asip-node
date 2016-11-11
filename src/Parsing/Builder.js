export default class Builder {
  /**
   * Class constructor.
   *
   * @param   {SerialPort} port  The serial port instance
   * @returns {void}
   */
  constructor(port) {
    this.port = port;
  }


  /**
   * Manages given pin.
   *
   * @param   {int} pin  The number of the pin
   * @returns {void}
   */
  pin(pin) {
    this.port.write(this.buff(`I,P,${pin},3\n`));
  }


  /**
   * Turns on given pin.
   *
   * @param   {int} pin  The number of the pin
   * @returns {void}
   */
  on(pin) {
    this.port.write(this.buff(`I,d,${pin},1\n`));
  }


  /**
   * The buffer function.
   *
   * @param   {string} str  String to be buffed
   * @returns {Buffer} buffer  The buffed string
   */
  buff(str) {
    return Buffer(str, 'utf8');
  }
}
