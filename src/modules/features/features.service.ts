import { EntityManager, MikroORM } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FeaturesService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  healthCheck(): string {
    return "Features: Alive";
  }
}
