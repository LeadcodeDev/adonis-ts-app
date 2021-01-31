import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		firstname: schema.string({ trim: true }, [rules.minLength(2)]),
		lastname: schema.string({ trim: true }),
		email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
		password: schema.string({ trim: true }, [rules.confirmed()])
	})

	public messages = {
		'firstname.required': 'Please specify a firstname',
		'firstname.string': 'The firstname must be a string of characters.',
		'firstname.minLength': 'The firstname must have at least 2 characters.',
		'lastname.required': 'Please specify a lastname',
		'lastname.string': 'The lastname must be a string of characters.',
		'lastname.minLength': 'The lastname must have at least 2 characters.',
		'email.required': 'Please specify a email',
		'email.unique': 'The email already exists',
		'password.required': 'Please specify a password',
		'password.confirmed': 'Please confirm a password'
	}
}
