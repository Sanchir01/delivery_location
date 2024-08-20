import { Controller, Get, Post } from '@nestjs/common'
import { FoodService } from './food.service'

@Controller('devilery_zones')
export class FoodController {
	constructor(private readonly foodService: FoodService) {}

	@Get()
	getAllZone() {
		return this.foodService.getAllDeliveryZone()
	}

	@Post()
	createZone() {
		return 'zone created'
	}
}
