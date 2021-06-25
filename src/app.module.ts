import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Account } from "./entities/account.entity";
import { Feature } from "./entities/feature.entity";
import { Subscription } from "./entities/subscription.entity";
import { AccountModule } from "./modules/account/account.module";
import { FeatureModule } from "./modules/features/features.module";
import { SubscriptionModule } from "./modules/subscription/subscription.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "feature-switch.sqlite3",
      synchronize: true,
      entities: [Account, Feature, Subscription],
    }),
    AccountModule,
    FeatureModule,
    SubscriptionModule,
  ],
  controllers: [
    AppController,
    // AccountController,
    // FeaturesController,
    // SubscriptionController,
  ],
  providers: [AppService],
})
export class AppModule {}
