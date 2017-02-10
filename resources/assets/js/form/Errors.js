'use strict'

class Errors {

  /**
   * Constructor.
   *
   * @constructor
   */
  constructor () {
    this.errors = {}
  }

  /**
   * Determines if there's any errors.
   *
   * @return {boolean}
   */
  hasAny () {
    return Object.keys(this.errors).length > 0
  }

  /**
   * Checks if the given field has an error.
   *
   * @param  {string} field
   * @return {boolean}
   */
  has (field) {
    return this.$retrieveIndexOf(field) > -1
  }

  /**
   * Sets the raw errors.
   *
   * @param  {object} errors
   * @return {void}
   */
  set (errors) {
    if (typeof errors === 'object') {
      this.errors = errors
    } else {
      this.errors = { form: ['Something went wrong. Please try again or contact us.'] }
    }
  }

  /**
   * Gets the error message for a field.
   *
   * @param  {string} field
   * @return {string}
   */
  get (field) {
    if (this.has(field)) {
      const index = this.$retrieveIndexOf(field)

      return this.errors[index].message
    }
  }

  /**
   * Removes errors for a field.
   *
   * @return {void}
   */
  reset (field = null) {
    if (field) {
      const index = this.$retrieveIndexOf(field)
      delete this.errors[index]
      return
    }

    this.errors = {}
  }

  /**
   * Retrieves the index of a field.
   *
   * @param  {string} field
   * @return {number}
   *
   * @protected
   */
  $retrieveIndexOf (field) {
    return _.findIndex(this.errors, (o) => { return o.field === field })
  }

}

module.exports = Errors
