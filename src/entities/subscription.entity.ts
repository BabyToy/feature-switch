import { ApiProperty } from "@nestjs/swagger";
import shortUuid from "short-uuid";
import { BeforeInsert, Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique("sub_account_feature", ["account", "feature"])
export class Subscription {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @Column({ nullable: false })
  @ApiProperty()
  account: string;

  @Column({ nullable: false })
  @ApiProperty()
  feature: string;

  @Column()
  @ApiProperty()
  enabled: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty()
  added: Date;

  @Column({ type: "datetime", nullable: true })
  @ApiProperty()
  modified: Date;

  @BeforeInsert()
  setId() {
    this.id = shortUuid.generate();
    this.enabled = true;
  }

  constructor(account: string, feature: string) {
    this.account = account;
    this.feature = feature;
  }
}
