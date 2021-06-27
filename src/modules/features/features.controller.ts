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
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { Feature } from "../../entities/feature.entity";
import FeatureDto from "./feature.dto";
import FeaturePageDto from "./features-pagination.dto";
import { FeaturesService } from "./features.service";

@Controller("features")
export class FeaturesController {
  constructor(private readonly service: FeaturesService) {}

  @Get("healthcheck")
  healthCheck(): string {
    return this.service.healthCheck();
  }

  @Get()
  @ApiOperation({ summary: "Get a list of features" })
  @ApiResponse({ status: 200, type: FeaturePageDto })
  findAll(
    @Query("pageSize", ParseIntPipe) pageSize: number,
    @Query("page", ParseIntPipe) page: number
  ) {
    return this.service.findAll(page, pageSize);
  }

  @Get("find")
  @ApiOperation({ summary: "Find a feature" })
  @ApiResponse({ status: 200, type: Feature })
  find(@Query("id") id?: string, @Query("name") name?: string) {
    return this.service.findOne(id, name);
  }

  @Post()
  @ApiOperation({ summary: "Create a feature" })
  @ApiResponse({ status: 201, type: Feature })
  create(@Body() body: FeatureDto) {
    return this.service.create(body);
  }

  @Put(":id/update")
  @ApiOperation({ summary: "Update a feature" })
  @ApiResponse({ status: 201, type: Feature })
  update(@Param() id: string, @Body() body: FeatureDto) {
    return this.service.update(id, body);
  }
}
