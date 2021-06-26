import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "src/entities/account.entity";
import { Feature } from "src/entities/feature.entity";
import { Subscription } from "src/entities/subscription.entity";
import { Repository } from "typeorm";

export interface SubscriptionDto {
  account: string;
  feature: string;
  enabled?: boolean;
}

export interface SubscriptionAddDto {
  account: string;
  feature: string;
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

  async findOne(id?: string, account?: string) {
    let thisSubscription: Subscription | undefined;
    if (id) {
      thisSubscription = await this.repository.findOne(id);
    }
    if (account) {
      thisSubscription = await this.repository.findOne({ where: { account } });
    }
    if (!thisSubscription) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }
    return thisSubscription;
  }

  async create(body: SubscriptionAddDto) {
    await this.validate(body);
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
    await this.repository.update(id, {
      account: body.account,
      feature: body.feature,
    });
    return this.repository.findOne(id);
  }

  async toggle(id: string) {
    const subscription = await this.repository.findOne(id);
    if (!subscription) {
      throw new HttpException("Subscription not found", HttpStatus.NOT_FOUND);
    }
    return this.repository.update(id, { enabled: !subscription.enabled });
  }
}
