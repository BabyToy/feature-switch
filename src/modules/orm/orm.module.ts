import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Account } from "src/entities/account.entities";
import { Feature } from "src/entities/feature.entity";
import { Subscription } from "src/entities/subscription.entity";

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [Account, Feature, Subscription],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
