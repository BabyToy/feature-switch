import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Account } from "src/entities/account.entities";

import { FeaturesController } from "./features.controller";
import { FeaturesService } from "./features.service";

@Module({
  imports: [MikroOrmModule.forFeature([Account])],
  controllers: [FeaturesController],
  providers: [FeaturesService],
})
export class FeaturesModule {}
