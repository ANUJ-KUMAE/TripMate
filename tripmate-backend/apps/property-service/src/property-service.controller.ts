import { Controller, Get } from '@nestjs/common';
import { PropertyServiceService } from './property-service.service.js';

@Controller()
export class PropertyServiceController {
  constructor(private readonly propertyServiceService: PropertyServiceService) {}

  @Get()
  getHello(): string {
    return this.propertyServiceService.getHello();
  }
}
