import { geometry, pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const deliveryOpt = pgTable('delivery_zone', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 30 }).notNull(),
	polygon: geometry('polygon', {
		type: 'POLYGON',
		srid: 4326,
		mode: 'xy'
	}).notNull()
})
