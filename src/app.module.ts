import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FeaturesModule } from "./modules/features/features.module";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ["./dist/entities"],
      entitiesTs: ["./src/entities"],
      dbName: "feature-handler.sqlite3",
      type: "sqlite",
    }),
    FeaturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
