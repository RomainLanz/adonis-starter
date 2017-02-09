'use strict'

class RedirectIfAuthenticated {

 /**
  * Redirect the user if he's already authenticated.
  *
  * @param  {Object}   request
  * @param  {Object}   response
  * @param  {Function} next
  * @return {void}
  *
  * @public
  */
  * handle (request, response, next) {
    const isLoggedIn = yield request.auth.check()

    if (isLoggedIn) {
      return response.redirect('/')
    }

    yield next
  }

}

module.exports = RedirectIfAuthenticated
