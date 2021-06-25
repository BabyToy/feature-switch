import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";

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

  @Get("find")
  find(@Query("id") id?: string, @Query("name") name?: string) {
    return this.service.findOne(id, name);
  }

  @Post()
  create(@Body() body: FeatureDto) {
    return this.service.create(body);
  }

  @Put(":id/update")
  update(@Param() id: string, @Body() body: FeatureDto) {
    return this.service.update(id, body);
  }
}
