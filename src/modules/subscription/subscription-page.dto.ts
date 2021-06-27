import { ApiProperty } from "@nestjs/swagger";
import { Subscription } from "../../entities/subscription.entity";
import PaginationBase from "../../helpers/pagination-base.dto";

export default class SubscriptionPageDto extends PaginationBase {
  @ApiProperty({ type: Subscription, isArray: true })
  items: Subscription[];
}
