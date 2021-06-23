import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Account {
  @PrimaryKey()
  email!: string;

  @Property()
  name!: string;

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}
