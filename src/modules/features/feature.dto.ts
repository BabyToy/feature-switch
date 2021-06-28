import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export default class FeatureDto {
  @ApiProperty()
  featureName: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  enable?: string;
}
