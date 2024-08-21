import {
	BadRequestException,
	Injectable,
	UnprocessableEntityException
} from '@nestjs/common'
import { DeliveryCoordinate } from 'src/delivery_zone/dto/createDeliveryZone.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateDeliveryZoneDto } from './dto/createDeliveryZone.dto'
import { IParamPolygon } from './entities/polygon.type'

@Injectable()
export class FoodService {
	constructor(private prisma: PrismaService) {}

	async getDeliveryZoneByTitle(title: string) {
		return this.prisma.deliveryZone.findUnique({ where: { title } })
	}

	async getAllDeliveryZone(params: IParamPolygon) {
		const point = `POINT(${params.longitude} ${params.latitude})`
		const zones = await this.prisma.$queryRaw`
      SELECT id, title, ST_AsText(polygon) FROM "DeliveryZone"
      WHERE ST_Intersects(polygon, ST_GeomFromText(${point}, 4326));
    `

		if (!zones) {
			throw new BadRequestException('мы не доставляем в эту зону')
		}

		return zones
	}

	async crateDeliveryZone(dto: CreateDeliveryZoneDto) {
		const { polygon, title } = dto
		const isExistzoneByName = await this.getDeliveryZoneByTitle(title)
		if (isExistzoneByName) {
			throw new UnprocessableEntityException('Delivery zone already exist')
		}
		const polygonWKT = this.convertToWKT(polygon)

		const newZone = await this.prisma.$queryRaw`
        INSERT INTO "DeliveryZone" (title, polygon)
        VALUES (${title}, ST_GeomFromText(${polygonWKT}, 4326))
            RETURNING id, title, ST_AsText(polygon) as polygon;
		`
		return newZone
	}
	private convertToWKT(
		coordinates: DeliveryCoordinate[] | IParamPolygon
	): string {
		if (Array.isArray(coordinates)) {
			const coordString = coordinates
				.map(coord => `${coord.longitude} ${coord.latitude}`)
				.join(', ')
			return `POLYGON((${coordString}))`
		} else {
			return `POINT(${coordinates.longitude} ${coordinates.latitude})`
		}
	}
}
