import Cookie from 'App/Models/Cookie'
import axios from 'axios'
import { DateTime } from 'luxon'

const location = 'https://json.geoiplookup.io'

export default class CookiesController {
	public async check() {
		const { data } = await axios.get(location)
		const cookie = await Cookie.findBy('ip', data.ip)

		return cookie ? true : false
	}

	public async insert() {
		const date = new Date()
		const { data } = await axios.get(location)

		await Cookie.updateOrCreate(
			{ ip: data.ip },
			{
				ip: data.ip,
				expiration: DateTime.fromJSDate(new Date(date.setMonth(date.getMonth() + 6)))
			}
		)

		return { message: 'Cookie has stored' }
	}
}
