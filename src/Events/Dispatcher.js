import Parser from '../Parser/Parser';
import Listener from './Listener';
import Input from '../Communication/Input';
import Output from '../Communication/Output';

export default class Dispatcher {
  /**
   * Class constructor.
   *
   * @param   {SerialPort} port  The port that the dispatcher is working on
   * @param   {callable|Listener} callback  The action/s to be performed
   * @returns {void}
   */
  constructor(port, callback) {
    this.port = port;

    this.events = {
      open: 'open',
      data: 'loop',
      error: 'catch',
      close: 'close',
    }

    if (callback instanceof Listener) {
      this.listener = callback;

      // We want to allow people to omit using the loop and catch functions
      // by automatically firing it when a listener is added.
      this.fire('data');
      this.fire('error');
    }

    this.open(callback);
  }


  /**
   * Static constructor.
   *
   * @param   {SerialPort} port  The port that the dispatcher is working on
   * @param   {callable|Listener} callback  The action/s to be performed
   * @returns {this} dispatcher  Instance of this class
   */
  static load(port, callback) {
    return new Dispatcher(port, callback);
  }


  /**
   * Fires the event.
   *
   * @param {callable|null} callback  Action to be performed afterwards
   */
  catch(callback) {
    this.fire('error', callback);
  }


  /**
   * Fires the event.
   *
   * @param {callable|null} callback  Action to be performed afterwards
   */
  open(callback) {
    this.fire('open', callback);
  }


  /**
   * Fires the event.
   *
   * @param {callable|null} callback  Action to be performed afterwards
   */
  loop(callback) {
    this.fire('data', callback);
  }


  /**
   * Resolves firing of the event.
   *
   * @param {string} event  Name of the event to be fired
   * @param {callable|null} callback  Action to be performed afterwards
   */
  fire(event, callback) {
    this.port.on(event, raw =>
      this.resolveCallback(event, callback, raw)
    );
  }


  /**
   * Resolves the callback after firing the event.
   *
   * @param {string} event  Name of the event to be fired
   * @param {callable|null} callback  Action to be performed afterwards
   * @param {string} raw  Raw data
   */
  resolveCallback(event, callback, raw) {
    const processed = Parser.process(raw);

    if (callback === undefined && this.listener === undefined) {
      return;
    }

    if (this.listener instanceof Listener) {
      callback = this.listener[this.events[event]];
    }

    return callback({
      in: Input.feed(processed),
      out: Output.feed(processed),
    }, raw);
  }
}
