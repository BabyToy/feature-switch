import { Test, TestingModule } from "@nestjs/testing";
import { Account } from "src/entities/account.entity";
import { Repository } from "typeorm";

import { AccountController } from "./account.controller";
import { AccountsService } from "./account.service";

describe("AccountController", () => {
  let controller: AccountController;
  let service: AccountsService;
  // let repository: Repository;

  beforeEach(async () => {
    // service = new AccountsService(Repository<Account>);
    controller = new AccountController(service);
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [AccountController],
    // }).compile();

    // controller = module.get<AccountController>(AccountController);
  });

  it("controller should be defined", () => {
    expect(controller).toBeDefined();
  });
});
