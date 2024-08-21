import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateDeliveryZoneDto {
	@IsString()
	@MinLength(1)
	@MaxLength(30, { message: 'Должно быть максимум 30 симоволов в имени' })
	title: string

	polygon: DeliveryCoordinate[]
}

export class DeliveryCoordinate {
	@IsNotEmpty()
	longitude: number
	@IsNotEmpty()
	latitude: number
}
