import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Account } from "../../entities/account.entity";
import AccountDto from "./account.dto";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>
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
    let account: Account | undefined;
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

  async create(body: AccountDto) {
    const account = new Account(body.email, body.name);
    try {
      return this.repository.save(account);
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, body: AccountDto) {
    const account = await this.repository.findOne(id);
    if (!account) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }
    return this.repository.save({ ...account, ...body });
  }
}
