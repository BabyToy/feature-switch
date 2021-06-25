import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountModule } from "./modules/account/account.module";
import { FeatureModule } from "./modules/features/features.module";
import { SubscriptionModule } from "./modules/subscription/subscription.module";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ["./dist/entities"],
      entitiesTs: ["./src/entities"],
      dbName: "feature-switch.sqlite3",
      type: "sqlite",
    }),
    AccountModule,
    FeatureModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
