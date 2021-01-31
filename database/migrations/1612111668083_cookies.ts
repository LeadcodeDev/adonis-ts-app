import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cookies extends BaseSchema {
	protected tableName = 'cookies'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.string('ip')
			table.dateTime('expiration')
			table.timestamps(true, true)
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
