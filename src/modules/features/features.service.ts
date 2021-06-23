import { EntityRepository, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Feature } from "src/entities/feature.entity";

export interface FeatureDto {
  id: string;
  name: string;
}

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly repository: EntityRepository<Feature>
  ) {}

  healthCheck(): string {
    return "Features: Alive";
  }

  async findAll(page: number, pageSize: number) {
    const totalItems = await this.repository.findAndCount({});
    const pageCount = Math.trunc(totalItems.length / pageSize);
    const items = await this.repository.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    return { pageCount, totalItems, items };
  }

  async findOne(id: string) {
    const feature = await this.repository.findOne({ id });
    if (!feature) {
      throw new HttpException("Feature not found", HttpStatus.NOT_FOUND);
    }
    return feature;
  }

  create(body: FeatureDto) {
    const account = new Feature(body.name);
    wrap(account);
    return this.repository.persist(account);
  }

  async update(body: FeatureDto) {
    const feature = await this.repository.findOne({ id: body.id });
    if (!feature) {
      throw new HttpException("Feature not found", HttpStatus.NOT_FOUND);
    }
    wrap(feature).assign(body);
    return this.repository.persist(feature);
  }
}
