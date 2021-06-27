import { ApiProperty } from "@nestjs/swagger";

import { Account } from "../../entities/account.entity";
import PaginationBase from "../../helpers/pagination-base.dto";

export default class AccountsPagedDto extends PaginationBase {
  @ApiProperty({ type: Account, isArray: true })
  items: Account[];
}
