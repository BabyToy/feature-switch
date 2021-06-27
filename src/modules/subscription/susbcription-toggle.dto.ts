import { ApiProperty } from "@nestjs/swagger";

export default class SubscriptionToggleDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  featureName: string;
}
