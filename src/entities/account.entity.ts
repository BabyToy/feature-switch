import shortUuid from "short-uuid";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Account {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  name: string;

  @BeforeInsert()
  setId() {
    this.id = shortUuid.generate();
  }

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}
