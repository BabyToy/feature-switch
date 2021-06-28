import { ApiProperty } from "@nestjs/swagger";
import shortUuid from "short-uuid";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Feature {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @Column({ nullable: false, unique: true })
  @ApiProperty()
  name: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty()
  added: Date;

  @Column()
  @ApiProperty()
  enabled: boolean;

  @BeforeInsert()
  setId() {
    this.id = shortUuid.generate();
  }

  constructor(name: string) {
    this.name = name;
  }
}
