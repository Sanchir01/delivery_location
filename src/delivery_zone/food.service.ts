import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateDeliveryZoneDto, DeliveryCoordinate } from './dto/createDeliveryZone.dto'

@Injectable()
export class FoodService {
	constructor(private prisma: PrismaService) {}

	async getDeliveryZoneByTitle(title:string){
		return this.prisma.deliveryZone.findUnique({where:{title}})
	}

	getAllDeliveryZone() {
		return this.prisma.deliveryZone.findMany()
	}
	async crateDeliveryZone(dto:CreateDeliveryZoneDto){
		const {polygon,title} = dto
		const isExistzoneByName = await this.getDeliveryZoneByTitle(title)
		if (isExistzoneByName === undefined) {
			throw new UnprocessableEntityException('Delivery zone already exist')
		}
		const polygonWKT = this.convertToWKT(polygon);
		const newZone = await this.prisma.$queryRaw`
        INSERT INTO "DeliveryZone" (title, polygon)
        VALUES (${title}, ST_GeomFromText(${polygonWKT}, 4326))
            RETURNING id, title, ST_AsText(polygon) as polygon;
		`
		return newZone
	}
	private  convertToWKT(coordinates: DeliveryCoordinate[] ): string {
		const coordString = coordinates
			.map(coord => `${coord.longitude} ${coord.latitude}`)
			.join(', ');
		return `POLYGON((${coordString}))`;
	}
}
