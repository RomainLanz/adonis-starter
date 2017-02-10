'use strict'

class CurrentUrl {

  * handle (request, response, next) {
    const View = use('View')

    View.global('currentUrl', request.url())

    yield next
  }

}

module.exports = CurrentUrl
