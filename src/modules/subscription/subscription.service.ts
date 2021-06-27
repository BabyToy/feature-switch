import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";

import { Account } from "../../entities/account.entity";
import { Feature } from "../../entities/feature.entity";
import { Subscription } from "../../entities/subscription.entity";
import { SubscriptionAddDto } from "./subscription-new.dto";
import SubscriptionDto from "./subscription.dto";

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

  async findAll({
    account,
    page,
    pageSize,
  }: {
    account?: string;
    page: number;
    pageSize: number;
  }) {
    const terms: FindManyOptions = {
      take: pageSize,
      skip: (page - 1) * pageSize,
    };
    if (account) {
      terms.where = { accountId: account };
    }
    const [items, count] = await this.repository.findAndCount(terms);
    return {
      pageCount: Math.trunc(count / pageSize) + 1,
      totalItems: count,
      items,
    };
  }

  async findOne(id?: string) {
    const thisSubscription = await this.repository.findOne(id);
    if (!thisSubscription) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }
    return thisSubscription;
  }

  async create(body: SubscriptionAddDto) {
    await this.validate(body);
    const account = new Subscription(body.account, body.feature);
    return this.repository
      .save(account)
      .then(async () => {
        return this.repository.findOne(account.id);
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async validate(body: SubscriptionAddDto) {
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
  }

  async update(id: string, body: SubscriptionDto) {
    await this.validate({ account: body.account, feature: body.feature });
    const subscription = await this.repository.findOne(id);
    return this.repository.save({ ...subscription, ...body });
  }

  async toggle(email: string, featureName: string) {
    const [account, feature] = await Promise.all([
      this.accountRepository.findOne({ where: { email } }),
      this.featureRepository.findOne({ where: { name: featureName } }),
    ]);
    if (!account) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }
    if (!feature) {
      throw new HttpException("Feature not found", HttpStatus.NOT_FOUND);
    }
    const subscription = await this.repository.findOne({
      where: { accountId: account.id, featureId: feature.id },
    });
    if (!subscription) {
      throw new HttpException("Subscription not found", HttpStatus.NOT_FOUND);
    }
    return this.repository.save({
      ...subscription,
      enabled: !subscription.enabled,
    });
  }
}
