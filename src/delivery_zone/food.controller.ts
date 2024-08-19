import { Controller, Get, Post } from '@nestjs/common'
import { FoodService } from './food.service'

@Controller('devilery_zones')
export class FoodController {
	constructor(private readonly foodService: FoodService) {}

	@Get()
	getAllZone() {
		return 'all zone'
	}

	@Post()
	createZone() {
		return 'zone created'
	}
}
