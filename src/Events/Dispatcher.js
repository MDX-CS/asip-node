import Listener from './Listener';
import Parser from '../Parsing/Parser';
import Builder from '../Parsing/Builder';
import Input from '../Communication/Input';
import Output from '../Communication/Output';

export default class Dispatcher {
  /**
   * Class constructor.
   *
   * @param   {SerialPort} port  The port that the dispatcher is working on
   * @param   {callable|Listener} callback  The action/s to be performed
   */
  constructor(port, callback) {
    this.port = port;

    this.events = {
      open: 'open',
      data: 'loop',
      error: 'catch',
      close: 'close',
    };

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
   * @returns {void}
   */
  catch(callback) {
    this.fire('error', callback);
  }


  /**
   * Fires the event.
   *
   * @param {callable|null} callback  Action to be performed afterwards
   * @returns {void}
   */
  open(callback) {
    this.fire('open', callback);
  }


  /**
   * Fires the event.
   *
   * @param {callable|null} callback  Action to be performed afterwards
   * @returns {void}
   */
  loop(callback) {
    this.fire('data', callback);
  }


  /**
   * Resolves firing of the event.
   *
   * @param {string} event  Name of the event to be fired
   * @param {callable|null} callback  Action to be performed afterwards
   * @returns {void}
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
   * @returns {mixed} response  The callback response
   */
  resolveCallback(event, callback, raw) {
    if (callback === undefined && this.listener === undefined) {
      return null;
    }

    if (this.listener instanceof Listener) {
      return this.callByEvent(event, this.listener[this.events[event]], raw);
    }

    return this.callByEvent(event, callback, raw);
  }


  /**
   * Resolves the callback by given event.
   *
   * @param {string} event  Name of the event to be fired
   * @param {callable|null} callback  Action to be performed afterwards
   * @param {string} raw  Raw data
   * @returns {mixed} response  The callback response
   */
  callByEvent(event, callback, raw) {
    const processed = Parser.process(raw);

    if (event === 'error') {
      return callback(raw);
    }

    return callback({
      in: Input.feed(processed, new Builder(this.port)),
      out: Output.feed(processed, new Builder(this.port)),
    }, this.port.close, raw);
  }
}
