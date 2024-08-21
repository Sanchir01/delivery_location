import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CreateDeliveryZoneDto } from './dto/createDeliveryZone.dto'
import { IParamPolygon } from './entities/polygon.type'
import { FoodService } from './food.service'

@Controller('devilery-zones')
export class FoodController {
	constructor(private readonly foodService: FoodService) {}

	@Get()
	getZoneByPoint(@Query() params: IParamPolygon) {
		console.log('test ID', params)
		return this.foodService.getDeliveryZoneByPoint(params)
	}

	@Get("all")
	getAllZones() {
		return this.foodService.getAllDeliveryZone()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	createZone(@Body() dto: CreateDeliveryZoneDto) {
		return this.foodService.crateDeliveryZone(dto)
	}
}
