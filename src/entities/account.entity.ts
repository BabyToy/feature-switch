import { ApiProperty } from "@nestjs/swagger";
import shortUuid from "short-uuid";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Account {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @Column({ nullable: false, unique: true })
  @ApiProperty()
  email: string;

  @Column()
  name: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty()
  added: Date;

  @BeforeInsert()
  setId() {
    this.id = shortUuid.generate();
  }

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}
