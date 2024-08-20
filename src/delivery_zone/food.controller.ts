import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { FoodService } from './food.service'
import { CreateDeliveryZoneDto } from './dto/createDeliveryZone.dto'

@Controller('devilery_zones')
export class FoodController {
	constructor(private readonly foodService: FoodService) {}

	@Get()
	getAllZone() {
		return this.foodService.getAllDeliveryZone()
	}

	@UsePipes(new ValidationPipe)
	@HttpCode(200)
	@Post()
	createZone(@Body() dto: CreateDeliveryZoneDto) {
		return this.foodService.crateDeliveryZone(dto)
	}
}
