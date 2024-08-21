import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../app.module'
describe('FoodController (e2e)', () => {
	let app: INestApplication

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()
		app = moduleFixture.createNestApplication()
		app.setGlobalPrefix('api')
		app.useGlobalPipes(new ValidationPipe())
		await app.init()
	})

	it('/api/devilery-zones/all (GET)', () => {
		return request(app.getHttpServer())
			.get('/api/devilery-zones/all')
			.expect(200)
	})

	it('/api/devilery-zones (POST)', () => {
		return request(app.getHttpServer())
			.post('/api/devilery-zones')
			.send({
				title: 'Central Park',
				polygon: [
					{ latitude: 40.7648, longitude: -73.9811 },
					{ latitude: 40.7681, longitude: -73.9811 },
					{ latitude: 40.7681, longitude: -73.9737 },
					{ latitude: 40.7648, longitude: -73.9737 },
					{ latitude: 40.7648, longitude: -73.9811 }
				]
			})
			.expect([
				{
					id: 1,
					title: 'Central Park',
					polygon:
						'POLYGON((-73.9811 40.7648,-73.9811 40.7681,-73.9737 40.7681,-73.9737 40.7648,-73.9811 40.7648))'
				}
			])
	})

	it('/api/devilery-zones (GET)', () => {
		return request(app.getHttpServer())
			.get('/api/devilery-zones?latitude=40.7648&longitude=-73.9811')
			.expect(200)
	})
	afterAll(() => app.close())
})
