import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/Users/StoreValidator'

export default class UsersController {
	public async index() {
		return User.query()
	}

	public async show({ params }: HttpContextContract) {
		return await User.query().where('id', params.id).firstOrFail()
	}

	public async store({ request }: HttpContextContract) {
		const data = await request.validate(StoreValidator)
		const user = await User.create(data)
		return user
	}

	public async update({ request, params }: HttpContextContract) {
		const user = await User.query().where('id', params.id).firstOrFail()
		const data = await request.validate(StoreValidator)
		await user.merge(data).save()
		return user
	}

	public async destroy({ params }: HttpContextContract) {
		const user = await User.query().where('id', params.id).firstOrFail()
		await user.delete()
		return { message: 'User has been deleted' }
	}
}
