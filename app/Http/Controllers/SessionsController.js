'use strict'

class SessionsController {

  /**
   * Attempt to login the user using his username and password.
   *
   * @param {Request} request
   * @param {Response} response
   *
   * @return {void}
   */
  * store (request, response) {
    try {
      yield request.auth.attempt(
        request.input('username'), request.input('password')
      )
    } catch (e) {
      yield request.withOut('password')
        .andWith({ errors: 'We cannot find any account with these credentials.' }).flash()
      return response.redirect('back')
    }

    return response.redirect('/')
  }

  /**
   * Logout the user by destroying his current session.
   *
   * @param {Request} request
   * @param {Response} response
   *
   * @return {void}
   */
  * destroy (request, response) {
    yield request.auth.logout()

    return response.redirect('/')
  }

}

module.exports = SessionsController
