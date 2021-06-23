import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import shortUuid from "short-uuid";

@Entity()
export class Feature {
  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  constructor(name: string) {
    this.id = shortUuid().generate();
    this.name = name;
  }
}
