import { Test, TestingModule } from "@nestjs/testing";

import { AccountController } from "./account.controller";

describe.skip("AccountController", () => {
  let controller: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it("controller should be defined", () => {
    expect(controller).toBeDefined();
  });
});
