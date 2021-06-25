import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entities/account.entity";
import { Subscription } from "src/entities/subscription.entity";

import { SubscriptionController } from "./subscription.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Account, Subscription])],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
