import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entities/account.entity";

import { AccountController } from "./account.controller";
import { AccountsService } from "./account.service";

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountsService],
})
export class AccountModule {}
