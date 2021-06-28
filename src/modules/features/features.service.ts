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

  async findId(id?: string) {
    return this.repository.findOne(id);
    let feature: Feature | undefined;
    if (id) {
      feature = await this.repository.findOne(id);
    }

    if (!feature) {
      throw new HttpException("Feature not found", HttpStatus.NOT_FOUND);
    }
    return feature;
  }

  async find(featureName?: string, email?: string) {
    if (featureName) {
      return this.repository.find({ where: { featureName } });
    }
    if (email) {
      return this.repository.find({ where: { featureName: featureName } });
    }
  }

  async create(body: FeatureDto) {
    if (!body.email) {
      throw new HttpException("Email is missing", HttpStatus.BAD_REQUEST);
    }

    if (!body.featureName) {
      throw new HttpException(
        "Feature name is missing",
        HttpStatus.BAD_REQUEST
      );
    }

    const feature = new Feature(body.email, body.featureName);
    return this.repository
      .save(feature)
      .then((data) => data)
      .catch((e: Error) => {
        throw new HttpException(e.message, HttpStatus.NOT_MODIFIED);
      });
  }

  async update(body: FeatureDto) {
    const feature = await this.repository.findOne({
      where: { email: body.email, featureName: body.featureName },
    });
    if (!feature) {
      throw new HttpException("Feature not found", HttpStatus.NOT_FOUND);
    }
    console.dir(body);
    return this.repository
      .save({
        ...feature,
        enabled: body.enable.toLowerCase() === "true",
      })
      .then((data) => {
        console.dir(data);
      });
  }
}
