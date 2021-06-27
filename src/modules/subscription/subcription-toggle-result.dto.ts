import { ApiProperty } from "@nestjs/swagger";

export default class SubscriptionToggleResultDto {
  @ApiProperty()
  canAccess: boolean;
}
