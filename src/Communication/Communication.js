export default class Communication {  /**
   * Class constructor.
   *
   * @param   {Object} data  Parsed data
   * @param   {Builder} builder  The respobse builder
   * @returns {void}
   */
  constructor(data, builder) {
    this.data = data;
    this.builder = builder;
  }
}
