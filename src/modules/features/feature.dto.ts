import { ApiProperty } from "@nestjs/swagger";

export default class FeatureDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
