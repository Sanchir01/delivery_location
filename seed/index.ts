import { faker } from '@faker-js/faker'
import { DeliveryZone, PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const createZone = async (quantity: number) => {
	const zoneArray: DeliveryZone[] = []
	for (let i = 0; i < quantity; i++) {
		const title = faker.address.city()
		const polygonWKT = generateRandomPolygon()
		const newZone: DeliveryZone = await prisma.$queryRaw`
        INSERT INTO "DeliveryZone" (title, polygon)
        VALUES (${title}, ST_GeomFromText(${polygonWKT}, 4326))
            RETURNING id, title, ST_AsText(polygon) as polygon;
		`
		zoneArray.push(newZone)
	}
	console.log(zoneArray)
}
function generateRandomPolygon(): string {
	const centerLat = faker.location.latitude()
	const centerLong = faker.location.longitude()
	const radius = 0.01 // радиус в градусах

	const points = Array.from({ length: 5 }, () => {
		const angle = Math.random() * 2 * Math.PI
		const lat = centerLat + radius * Math.sin(angle)
		const long = centerLong + radius * Math.cos(angle)
		return `${long} ${lat}`
	})

	// Закрываем полигон, добавляя первый пункт в конец
	points.push(points[0])

	return `POLYGON((${points.join(', ')}))`
}
async function main() {
	console.log('start seeding')
	await createZone(5).catch(() => 'errors seeding')
	console.log('stop seeding')
}

main()
	.catch(e => console.error(e))
	.finally(() => {
		prisma.$disconnect
	})
