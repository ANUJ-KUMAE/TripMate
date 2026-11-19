import { Module } from '@nestjs/common';
import { PropertyServiceController } from './property-service.controller.js';
import { PropertyServiceService } from './property-service.service.js';

@Module({
  imports: [],
  controllers: [PropertyServiceController],
  providers: [PropertyServiceService],
})
export class PropertyServiceModule {}
