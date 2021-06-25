import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Account } from "./account.entity";
import { Feature } from "./feature.entity";
import { Subscription } from "./subscription.entity";

export interface SubscriptionDto {
  id: string;
  account: string;
  feature: string;
  enabled: boolean;
}

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly repository: Repository<Subscription>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>
  ) {}

  healthCheck(): string {
    return "Accounts: Alive";
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
    let account: Subscription | undefined;
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

  async create(body: SubscriptionDto) {
    const account = new Subscription(body.account, body.feature);
    this.repository
      .save(account)
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async update(id: string, body: SubscriptionDto) {
    const promises = [];
    if (body.account) {
      promises.push(this.accountRepository.findOne(body.account));
    }
    if (body.feature) {
      promises.push(this.featureRepository.findOne(body.feature));
    }
    const [account, feature] = await Promise.all(promises);
    if (!account) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }
    if (!feature) {
      throw new HttpException("Feature not found", HttpStatus.NOT_FOUND);
    }
    await this.repository.update(id, {
      account: body.account,
      feature: body.feature,
    });
    return this.repository.findOne(id);
  }
}
