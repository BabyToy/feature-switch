import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Account } from "../../entities/account.entity";
import { Feature } from "../../entities/feature.entity";
import { Subscription } from "../../entities/subscription.entity";
import { FeaturesController } from "./features.controller";
import { FeaturesService } from "./features.service";

@Module({
  imports: [TypeOrmModule.forFeature([Account, Feature, Subscription])],
  controllers: [FeaturesController],
  providers: [FeaturesService],
})
export class FeatureModule {}
