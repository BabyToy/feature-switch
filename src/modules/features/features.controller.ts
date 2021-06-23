import { Body, Controller, Get, Param, ParseIntPipe, Put, Query } from "@nestjs/common";

import { FeatureDto, FeaturesService } from "./features.service";

@Controller("features")
export class FeaturesController {
  constructor(private readonly service: FeaturesService) {}

  @Get("healthcheck")
  healthCheck(): string {
    return this.service.healthCheck();
  }

  @Get()
  findAll(
    @Query("pageSize", ParseIntPipe) pageSize: number,
    @Query("page", ParseIntPipe) page: number
  ) {
    return this.service.findAll(page, pageSize);
  }

  @Get(":id")
  findOne(@Param() id: string) {
    return this.service.findOne(id);
  }

  @Put()
  update(@Body() body: FeatureDto) {
    return this.service.update(body);
  }
}
