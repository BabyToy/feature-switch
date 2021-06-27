import { ApiProperty } from "@nestjs/swagger";

import { Feature } from "../../entities/feature.entity";
import PaginationBase from "../../helpers/pagination-base.dto";

export default class FeaturePageDto extends PaginationBase {
  @ApiProperty({ type: Feature, isArray: true })
  items: Feature[];
}
