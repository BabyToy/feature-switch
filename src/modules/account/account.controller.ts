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

import { AccountDto, AccountsService } from "./account.service";

@Controller("accounts")
export class AccountController {
  constructor(private readonly service: AccountsService) {}

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
  create(@Body() body: AccountDto) {
    return this.service.create(body);
  }

  @Put(":id/update")
  update(@Param() id: string, @Body() body: AccountDto) {
    return this.service.update(id, body);
  }
}
