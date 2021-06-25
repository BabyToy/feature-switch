import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entities/account.entity";
import { Feature } from "src/entities/feature.entity";
import { Subscription } from "src/entities/subscription.entity";

import { FeaturesController } from "./features.controller";
import { FeaturesService } from "./features.service";

@Module({
  imports: [TypeOrmModule.forFeature([Account, Feature, Subscription])],
  controllers: [FeaturesController],
  providers: [FeaturesService],
})
export class FeatureModule {}
