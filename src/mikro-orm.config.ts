import { Options } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { Logger } from "@nestjs/common";

import { Account } from "./entities/account.entities";
import { Feature } from "./entities/feature.entity";
import { Subscription } from "./entities/subscription.entity";

const logger = new Logger("MikroORM");
const config = {
  entities: [Account, Feature, Subscription],
  dbName: "feature-switch.sqlite3",
  type: "sqlite",
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
} as Options;

export default config;
