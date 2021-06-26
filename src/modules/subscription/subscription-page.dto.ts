import { ApiProperty } from "@nestjs/swagger";
import { Subscription } from "src/entities/subscription.entity";
import PaginationBase from "src/helpers/pagination-base.dto";

export default class SubscriptionPageDto extends PaginationBase {
  @ApiProperty({ type: Subscription, isArray: true })
  items: Subscription[];
}
