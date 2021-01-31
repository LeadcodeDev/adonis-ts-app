import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		firstname: schema.string.optional({ trim: true }),
		lastname: schema.string.optional({ trim: true }),
		email: schema.string.optional({ trim: true }, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
		password: schema.string.optional({ trim: true }, [rules.confirmed()])
	})

	public messages = {
		'firstname.string': 'The firstname must be a string of characters.',
		'firstname.minLength': 'The firstname must have at least 2 characters.',
		'lastname.string': 'The lastname must be a string of characters.',
		'lastname.minLength': 'The lastname must have at least 2 characters.',
		'email.unique': 'The email already exists',
		'password.confirmed': 'Please confirm a password'
	}
}
