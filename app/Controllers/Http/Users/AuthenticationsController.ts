import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthenticationsController {
	public async loginWithWeb({ auth, request }: HttpContextContract) {
		const data = await request.validate({
			schema: schema.create({
				email: schema.string({ trim: true }, [rules.email()]),
				password: schema.string({ trim: true }),
				remember: schema.boolean.optional()
			})
		})

		await auth.attempt(data.email, data.password, data.remember)
		return auth.user
	}

	public async loginWithApi({ auth, request }: HttpContextContract) {
		const data = await request.validate({
			schema: schema.create({
				email: schema.string({ trim: true }, [rules.email()]),
				password: schema.string({ trim: true })
			})
		})

		const token = await auth.use('api').attempt(data.email, data.password)
		return token.toJSON()
	}

	public async logout({ auth }: HttpContextContract) {
		await auth.logout()
		return { message: 'The user has been disconnected' }
	}
}
