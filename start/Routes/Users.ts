import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
	Route.resource('users', 'Users/UsersController')
		.apiOnly()
		.middleware({ destroy: ['auth'], edit: ['auth'] })

	Route.group(() => {
		Route.get('/:ip', 'Users/CookiesController.check')
		Route.post('/', 'Users/CookiesController.insert')
	}).prefix('cookies')
}).prefix('api')
