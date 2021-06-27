import { ApiProperty } from "@nestjs/swagger";

export default class AccountDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}
