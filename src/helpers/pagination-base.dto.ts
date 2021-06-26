import { ApiProperty } from "@nestjs/swagger";

export default class PaginationBase {
  @ApiProperty()
  pageCount: number;

  @ApiProperty()
  totalItems: number;
}
