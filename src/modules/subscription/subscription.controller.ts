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
import {
  SubscriptionDto,
  SubscriptionService,
} from "src/entities/subscription.service";

@Controller("subscriptions")
export class SubscriptionController {
  constructor(private readonly service: SubscriptionService) {}

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
  find(@Query("id") id?: string, @Query("account") account?: string) {
    return this.service.findOne(id, account);
  }

  @Post()
  create(@Body() body: SubscriptionDto) {
    return this.service.create(body);
  }

  @Put(":id/update")
  update(@Param() id: string, @Body() body: SubscriptionDto) {
    return this.service.update(id, body);
  }

  @Post("toggle")
  toggle(@Query("id") id: string) {
    return this.service.toggle(id);
  }
}
