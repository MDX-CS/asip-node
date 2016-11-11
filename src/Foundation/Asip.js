import SerialPort from 'serialport';
import Port from '../Support/Port';
import Dispatcher from '../Events/Dispatcher';

export default class Asip {
  /**
   * Class constructor.
   *
   * @param   {callable} callback  The function to be run
   * @returns {void}
   */
  constructor(callback) {
    this.dispatcher = Dispatcher.load(
      this.openPort(),
      callback
    );
  }


  /**
   * Open up a listener.
   *
   * @param   {callable} callback  The function to be run
   * @returns {this} asip  Instance of this class
   */
  static listen(callback) {
    return new Asip(callback);
  }


  /**
   * Register a loop event.
   *
   * @param   {callable|null} callback  The function to be run
   * @returns {this} asip  Instance of this class
   */
  loop(callback) {
    this.dispatcher.loop(callback);

    return this;
  }


  /**
   * Register an error event.
   *
   * @param   {callable|null} callback  The function to be run
   * @returns {this} asip  Instance of this class
   */
  catch(callback) {
    this.dispatcher.catch(callback);

    return this;
  }


  /**
   * Opens a serial port.
   *
   * @returns {SerialPort} port  Newly opened serial port
   */
  openPort() {
    return new SerialPort(Port.resolve(), {
      parser: SerialPort.parsers.readline('\n'),
      baudRate: 57600,
    });
  }
}
