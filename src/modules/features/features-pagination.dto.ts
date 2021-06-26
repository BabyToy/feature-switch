import { ApiProperty } from "@nestjs/swagger";
import { Feature } from "src/entities/feature.entity";
import PaginationBase from "src/helpers/pagination-base.dto";

export default class FeaturePageDto extends PaginationBase {
  @ApiProperty({ type: Feature, isArray: true })
  items: Feature[];
}
