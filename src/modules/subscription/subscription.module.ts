import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Account } from "../../entities/account.entity";
import { Feature } from "../../entities/feature.entity";
import { Subscription } from "../../entities/subscription.entity";
import { SubscriptionController } from "./subscription.controller";
import { SubscriptionService } from "./subscription.service";

@Module({
  imports: [TypeOrmModule.forFeature([Account, Feature, Subscription])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
