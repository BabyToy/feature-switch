import { ApiProperty } from "@nestjs/swagger";
import { Subscription } from "src/entities/subscription.entity";

export default class SubscriptionPageDto {
  @ApiProperty()
  pageCount: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty({ type: Subscription, isArray: true })
  items: Subscription[];
}
