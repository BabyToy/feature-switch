import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Account } from "src/entities/account.entities";

import { AccountController } from "./account.controller";
import { AccountsService } from "./account.service";

@Module({
  imports: [MikroOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountsService],
})
export class AccountModule {}
