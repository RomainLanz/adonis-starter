/**
 * Load dependencies of our application.
 */
// window.$ = window.jQuery = require('jquery')
window._ = require('lodash')
window.Vue = require('vue')
window.axios = require('axios')

/**
 * Configure axios.
 */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['X-XSRF-TOKEN'] = document.querySelector('meta[name="csrf_token"]').content

/**
 * Instantiate Adonis internal dependencies.
 */
window.Adonis = {}
window.Adonis.Event = new Vue()
window.Adonis.Form = require('./form/Form')
