'use strict'

const Errors = require('./Errors')

class Form {

  /**
   * Constructor.
   *
   * @constructor
   */
  constructor (data) {
    this.busy = false
    this.successful = false
    this.errors = new Errors()
    this.$originalData = data

    this.$fill(data)
  }

  /**
   * Gets the payload.
   *
   * @return {object}
   */
  payload () {
    let payload = {}

    for (let property in this.$originalData) {
      payload[property] = this[property]
    }

    return payload
  }

  /**
   * Posts the form to the given url.
   *
   * @param  {string} url
   * @return {Promise<object>}
   */
  post (url) {
    return this.$submit('post', url)
  }

  /**
   * Submits the form to the given url.
   *
   * @protected
   * @param  {string} method
   * @param  {string} url
   * @return {Promise<object>}
   */
  $submit (method, url) {
    return new Promise((resolve, reject) => {
      this.$startProcessing()

      axios[method](url, this.payload())
        .then(response => {
          this.$finishProcessing()

          resolve(response.data)
        })
        .catch(errors => {
          console.log(errors.response)
          this.$finishProcessingWithErrors(errors.response.data)

          reject(errors.response.data)
        })
    })
  }

  /**
   * Starts processing the form.
   *
   * @protected
   * @return {void}
   */
  $startProcessing () {
    this.errors.reset()

    this.busy = true
    this.successful = false
  }

  /**
   * Finishes processing the form.
   *
   * @protected
   * @return {void}
   */
  $finishProcessing () {
    this.busy = false
    this.successful = true
  }

  /**
   * Finishes processing the form with given errors.
   *
   * @protected
   * @param  {object} errors
   * @return {void}
   */
  $finishProcessingWithErrors (errors) {
    this.busy = false

    this.errors.set(errors)
  }

  /**
   * Fills the form with the given data.
   *
   * @protected
   * @return {void}
   */
  $fill (data) {
    for (let field in data) {
      this[field] = data[field]
    }
  }

  /**
   * Resets all input's value and reset all errors.
   *
   * @protected
   * @return {void}
   */
  reset () {
    this.$fill(this.$originalData)
    this.errors.reset()
  }

}

module.exports = Form
