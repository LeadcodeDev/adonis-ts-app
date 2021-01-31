import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
	Route.group(() => {
		Route.post('/web', 'Users/AuthenticationsController.loginWithWeb')
		Route.post('/api', 'Users/AuthenticationsController.loginWithApi')
		Route.get('/logout', 'Users/AuthenticationsController.logout')
	}).prefix('authentication')

	Route.resource('users', 'Users/UsersController')
		.apiOnly()
		.middleware({ destroy: ['auth'], edit: ['auth'] })

	Route.group(() => {
		Route.get('/:ip', 'Users/CookiesController.check')
		Route.post('/', 'Users/CookiesController.insert')
	}).prefix('cookies')
}).prefix('api')
