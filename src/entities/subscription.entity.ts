import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Subscription {
  @PrimaryKey()
  email: string;

  @PrimaryKey()
  featureId: string;

  @Property()
  added = new Date();

  @Property({ onUpdate: () => new Date() })
  modified = new Date();

  constructor(email: string, featureId: string) {
    this.email = email;
    this.featureId = featureId;
    this.added = new Date();
  }
}
