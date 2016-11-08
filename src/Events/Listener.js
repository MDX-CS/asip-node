import AbstractClass from '../Support/AbstractClass';

export default class Listener extends AbstractClass {
  /**
   * Class constructor.
   *
   * @returns {void}
   */
  constructor() {
    super();

    this.require('open')
      .require('loop')
      .require('catch')
      .require('close')
      .shouldNotBeInstantiated('Listener');
  }
}
