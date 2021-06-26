import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entities/account.entity";
import { Feature } from "src/entities/feature.entity";
import { Subscription } from "src/entities/subscription.entity";

import { SubscriptionController } from "./subscription.controller";
import { SubscriptionService } from "./subscription.service";

@Module({
  imports: [TypeOrmModule.forFeature([Account, Feature, Subscription])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
