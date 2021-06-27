import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";

import { Feature } from "../../entities/feature.entity";
import FeatureDto from "./feature.dto";
import FeaturePageDto from "./features-pagination.dto";
import { FeaturesService } from "./features.service";

@Controller("feature")
export class FeaturesController {
  constructor(private readonly service: FeaturesService) {}

  @Get("healthcheck")
  healthCheck(): string {
    return this.service.healthCheck();
  }

  @Get("list")
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
  @ApiResponse({ status: 200 })
  @HttpCode(204)
  async create(@Body() body: FeatureDto, @Res() response: Response) {
    try {
      await this.service.create(body);
      response.status(HttpStatus.OK).send();
    } catch (e) {
      response.status(HttpStatus.NOT_MODIFIED).send();
    }
  }

  @Put(":id/update")
  @ApiOperation({ summary: "Update a feature" })
  @ApiResponse({ status: 201, type: Feature })
  update(@Param() id: string, @Body() body: FeatureDto) {
    return this.service.update(id, body);
  }
}
