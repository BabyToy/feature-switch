import { ApiProperty } from "@nestjs/swagger";

export default class SubscriptionDto {
  @ApiProperty()
  account: string;

  @ApiProperty()
  feature: string;

  @ApiProperty()
  enabled?: boolean;
}
