import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Feature } from "../../entities/feature.entity";
import FeatureDto from "./feature.dto";

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly repository: Repository<Feature>
  ) {}

  healthCheck(): string {
    return "Features: Alive";
  }

  async findAll(page: number, pageSize: number) {
    const [items, count] = await this.repository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return {
      pageCount: Math.trunc(count / pageSize) + 1,
      totalItems: count,
      items,
    };
  }

  async findOne(id?: string, name?: string) {
    let feature: Feature | undefined;
    if (id) {
      feature = await this.repository.findOne(id);
    }
    if (name) {
      feature = await this.repository.findOne({ where: { name } });
    }
    if (!feature) {
      throw new HttpException("Feature not found", HttpStatus.NOT_FOUND);
    }
    return feature;
  }

  async create(body: FeatureDto) {
    const feature = new Feature(body.name);
    await this.repository.save(feature).catch(() => {
      throw new HttpException("", HttpStatus.NOT_MODIFIED);
    });
  }

  async update(id: string, body: FeatureDto) {
    const feature = await this.repository.findOne(id);
    if (!feature) {
      throw new HttpException("Feature not found", HttpStatus.NOT_FOUND);
    }
    return this.repository.save({
      ...feature,
      ...body,
    });
  }
}
