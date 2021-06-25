import { EntityRepository, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Account } from "src/entities/account.entities";

export interface AccountDto {
  email: string;
  name: string;
}

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly repository: EntityRepository<Account>
  ) {}

  healthCheck(): string {
    return "Accounts: Alive";
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

  async findOne(email: string) {
    const account = await this.repository.findOne({ email });
    if (!account) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }
    return account;
  }

  create(body: AccountDto) {
    const account = new Account(body.email, body.name);
    wrap(account).assign(body);
    return this.repository.persist(account);
  }

  async update(body: AccountDto) {
    const account = await this.repository.findOne({ email: body.email });
    if (!account) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }
    wrap(account).assign(body);
    return this.repository.persist(account);
  }
}
