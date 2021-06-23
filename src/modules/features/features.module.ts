import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Account } from "src/entities/account.entities";
import { Feature } from "src/entities/feature.entity";
import { Subscription } from "src/entities/subscription.entity";

import { FeaturesController } from "./features.controller";
import { FeaturesService } from "./features.service";

@Module({
  imports: [MikroOrmModule.forFeature([Account, Feature, Subscription])],
  controllers: [FeaturesController],
  providers: [FeaturesService],
})
export class FeaturesModule {}
