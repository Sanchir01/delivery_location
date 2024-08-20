import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { FoodModule } from './delivery_zone/food.module'

@Module({
	imports: [FoodModule],
	controllers: [AppController]
})
export class AppModule {}
