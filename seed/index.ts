import { faker } from '@faker-js/faker'
import { DeliveryZone, PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import {
	CreateDeliveryZoneDto,
	DeliveryCoordinate
} from 'src/delivery_zone/dto/createDeliveryZone.dto'
dotenv.config()
const prisma = new PrismaClient()

function convertToWKT(coordinates: DeliveryCoordinate[]): string {
	const coordString = coordinates
		.map(coord => `${coord.longitude} ${coord.latitude}`)
		.join(', ')
	return `POLYGON((${coordString}))`
}

const generateFakeDeliveryZone = (): CreateDeliveryZoneDto => {
	return {
		title: faker.location.streetAddress().substring(0, 30),
		polygon: [
			{
				latitude: faker.location.latitude(),
				longitude: faker.location.longitude()
			},
			{
				latitude: faker.location.latitude(),
				longitude: faker.location.longitude()
			},
			{
				latitude: faker.location.latitude(),
				longitude: faker.location.longitude()
			},
			{
				latitude: faker.location.latitude(),
				longitude: faker.location.longitude()
			},
			{
				latitude: faker.location.latitude(),
				longitude: faker.location.longitude()
			}
		]
	}
}

const createZone = async (quantity: number) => {
	const zoneArray: DeliveryZone[] = []
	for (let i = 0; i < quantity; i++) {
		const { title, polygon } = generateFakeDeliveryZone()
		polygon.push(polygon[0])
		const polygonWKT = convertToWKT(polygon)
		const newZone: DeliveryZone = await prisma.$queryRaw`
        INSERT INTO "DeliveryZone" (title, polygon)
        VALUES (${title}, ST_GeomFromText(${polygonWKT}, 4326))
            RETURNING id, title, ST_AsText(polygon) as polygon;
		`
		zoneArray.push(newZone)
	}
	console.log(zoneArray)
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
