import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Feature } from "src/entities/feature.entity";
import { Repository } from "typeorm";

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
    let account: Feature | undefined;
    if (id) {
      account = await this.repository.findOne(id);
    }
    if (name) {
      account = await this.repository.findOne({ where: { name } });
    }
    if (!account) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }
    return account;
  }

  async create(body: FeatureDto) {
    const feature = new Feature(body.name);
    try {
      return this.repository.save(feature);
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, body: FeatureDto) {
    const feature = await this.repository.findOne(id);
    if (!feature) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }
    return this.repository.save({
      ...feature,
      ...body,
    });
  }
}
