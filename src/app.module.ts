import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FoodModule } from './delivery_zone/food.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [FoodModule, DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
