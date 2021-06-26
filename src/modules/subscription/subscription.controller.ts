import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Subscription } from "src/entities/subscription.entity";
import SubscriptionPageDto from "src/modules/subscription/subscription-page.dto";
import { SubscriptionAddDto } from "./subscription-new.dto";
import SubscriptionDto from "./subscription.dto";

import { SubscriptionService } from "./subscription.service";

@Controller("subscriptions")
export class SubscriptionController {
  constructor(private readonly service: SubscriptionService) {}

  @Get("healthcheck")
  @ApiOperation({ summary: "Health checks for service" })
  healthCheck(): string {
    return this.service.healthCheck();
  }

  @Get()
  @ApiOperation({ summary: "Get a list of subscriptions" })
  @ApiResponse({ status: 200, type: SubscriptionPageDto })
  findAll(
    @Query("pageSize", ParseIntPipe) pageSize: number,
    @Query("page", ParseIntPipe) page: number
  ) {
    return this.service.findAll(page, pageSize);
  }

  @Get("find")
  @ApiOperation({ summary: "Get a subscription" })
  @ApiResponse({ status: 200, type: Subscription })
  find(
    @Query("id") id?: string,
    @Query("account") account?: string
  ): Promise<Subscription> {
    return this.service.findOne(id, account);
  }

  @Post()
  @ApiOperation({ summary: "Create a subscription" })
  @ApiResponse({ status: HttpStatus.CREATED, type: Subscription })
  // @ApiBody({ type: SubscriptionAddDto })
  create(@Body() body: SubscriptionAddDto): Promise<Subscription> {
    return this.service.create(body);
  }

  @Put(":id/update")
  @ApiOperation({ summary: "Update a subscription" })
  @ApiResponse({ status: 200, type: Subscription })
  @ApiBody({ type: SubscriptionDto })
  update(
    @Param("id") id: string,
    @Body("body") body: SubscriptionDto
  ): Promise<Subscription> {
    return this.service.update(id, body);
  }

  @Post("toggle")
  @ApiOperation({ summary: "Toggle a subscription for an account" })
  @ApiResponse({ status: 200, type: Subscription })
  toggle(@Query("id") id: string): Promise<Subscription> {
    return this.service.toggle(id);
  }
}
