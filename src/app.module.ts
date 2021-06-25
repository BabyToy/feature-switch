import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountModule } from "./modules/account/account.module";
import { FeatureModule } from "./modules/features/features.module";
import { OrmModule } from "./modules/orm/orm.module";
import { SubscriptionModule } from "./modules/subscription/subscription.module";

@Module({
  imports: [OrmModule, AccountModule, FeatureModule, SubscriptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
