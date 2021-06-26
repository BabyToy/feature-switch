import { ApiProperty } from "@nestjs/swagger";

export class SubscriptionAddDto {
  @ApiProperty()
  account: string;

  @ApiProperty()
  feature: string;
}
