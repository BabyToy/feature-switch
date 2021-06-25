import shortUuid from "short-uuid";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Feature {
  @PrimaryColumn()
  id!: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @BeforeInsert()
  setId() {
    this.id = shortUuid.generate();
  }

  constructor(name: string) {
    this.name = name;
  }
}
