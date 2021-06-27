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
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Account } from "src/entities/account.entity";
import AccountsPagedDto from "./account-paginated.dto";

import AccountDto from "./account.dto";
import { AccountsService } from "./account.service";

@Controller("accounts")
export class AccountController {
  constructor(private readonly service: AccountsService) {}

  @Get("healthcheck")
  healthCheck(): string {
    return this.service.healthCheck();
  }

  @Get()
  @ApiOperation({ summary: "Gets a paginated list of accounts" })
  @ApiResponse({ status: 200, type: AccountsPagedDto })
  findAll(
    @Query("pageSize", ParseIntPipe) pageSize: number,
    @Query("page", ParseIntPipe) page: number
  ) {
    return this.service.findAll(page, pageSize);
  }

  @Get("find")
  @ApiOperation({ summary: "Gets an account" })
  @ApiResponse({ status: HttpStatus.OK, type: Account })
  find(@Query("id") id?: string, @Query("name") name?: string) {
    return this.service.findOne(id, name);
  }

  @Post()
  @ApiOperation({ summary: "Creates an account" })
  @ApiResponse({ status: HttpStatus.CREATED, type: Account })
  create(@Body() body: AccountDto) {
    return this.service.create(body);
  }

  @Put(":id/update")
  @ApiOperation({ summary: "Updates an account" })
  @ApiResponse({ status: HttpStatus.CREATED, type: Account })
  update(@Param() id: string, @Body() body: AccountDto) {
    return this.service.update(id, body);
  }
}
