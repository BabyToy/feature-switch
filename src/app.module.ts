import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppService } from "./app.service";
import { Feature } from "./entities/feature.entity";
import { FeatureModule } from "./modules/features/features.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "feature-simple.sqlite3",
      synchronize: true,
      entities: [Feature],
    }),
    FeatureModule,
  ],
})
export class AppModule {}
