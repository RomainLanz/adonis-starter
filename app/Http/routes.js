'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('frontend.pages.home').as('frontend.pages.home')

Route.group('routes.guest', () => {
  Route.get('login').render('frontend.sessions.create').as('sessions.create')
  Route.post('login', 'SessionsController.store').as('sessions.store')

  Route.get('register').render('frontend.accounts.create').as('accounts.create')
  Route.post('register', 'AccountsController.store').as('accounts.store')
}).middleware('guest')

Route.group('routes.auth', () => {
  Route.get('logout', 'SessionsController.destroy').as('sessions.destroy')
}).middleware('auth')
