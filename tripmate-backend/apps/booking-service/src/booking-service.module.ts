import { Module } from '@nestjs/common';
import { BookingServiceController } from './booking-service.controller.js';
import { BookingServiceService } from './booking-service.service.js';

@Module({
  imports: [],
  controllers: [BookingServiceController],
  providers: [BookingServiceService],
})
export class BookingServiceModule {}
