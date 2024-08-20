import { Injectable } from '@nestjs/common'
import type { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class FoodService {
	constructor(private prisma: PrismaService) {}
	getAllDeliveryZone() {
		return this.prisma.deliveryZone.findMany()
	}
}
