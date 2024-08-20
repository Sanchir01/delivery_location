import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { FoodModule } from './delivery_zone/food.module'
import { PrismaModule } from './prisma/prisma.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
	imports: [FoodModule, PrismaModule],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
