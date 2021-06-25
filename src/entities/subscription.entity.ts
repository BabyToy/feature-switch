import shortUuid from "short-uuid";
import { BeforeInsert, Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique("sub_account_feature", ["account", "feature"])
export class Subscription {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  account: string;

  @Column({ nullable: false })
  feature: string;

  @Column()
  enabled: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  added: Date;

  @Column({ type: "datetime", nullable: true })
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
