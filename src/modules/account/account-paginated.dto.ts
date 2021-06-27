import { ApiProperty } from "@nestjs/swagger";
import { Account } from "src/entities/account.entity";
import PaginationBase from "src/helpers/pagination-base.dto";

export default class AccountsPagedDto extends PaginationBase {
  @ApiProperty({ type: Account, isArray: true })
  items: Account[];
}
