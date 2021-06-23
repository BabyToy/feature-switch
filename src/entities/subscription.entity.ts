import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import shortUuid from "short-uuid";

import { Account } from "./account.entities";
import { Feature } from "./feature.entity";

@Entity()
export class Subscription {
  @PrimaryKey()
  id: string;

  @ManyToOne()
  account!: Account;

  @ManyToOne()
  feature!: Feature;

  @Property()
  added = new Date();

  @Property({ onUpdate: () => new Date() })
  modified? = new Date();

  constructor(account: Account, feature: Feature) {
    this.id = shortUuid().generate();
    this.account = account;
    this.feature = feature;
  }
}
