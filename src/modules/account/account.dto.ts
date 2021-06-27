import { ApiProperty } from "@nestjs/swagger";
import { Account } from "src/entities/account.entity";

export default class AccountDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}
