import { ApiProperty } from "@nestjs/swagger";
import shortUuid from "short-uuid";
import { BeforeInsert, Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique("sub_account_feature", ["accountId", "featureId"])
export class Subscription {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @Column({ nullable: false })
  @ApiProperty()
  accountId: string;

  @Column({ nullable: false })
  @ApiProperty()
  featureId: string;

  @Column()
  @ApiProperty()
  enabled: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty()
  added: Date;

  @Column({
    type: "datetime",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    nullable: true,
  })
  @ApiProperty()
  modified: Date;

  @BeforeInsert()
  setId() {
    this.id = shortUuid.generate();
    this.enabled = true;
  }

  constructor(account: string, feature: string) {
    this.accountId = account;
    this.featureId = feature;
  }
}
