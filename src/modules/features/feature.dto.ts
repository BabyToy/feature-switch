import { ApiProperty } from "@nestjs/swagger";

export default class FeatureDto {
  @ApiProperty()
  name: string;
}
