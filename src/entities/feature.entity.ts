import { ApiProperty } from "@nestjs/swagger";
import shortUuid from "short-uuid";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Feature {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @Column({ nullable: false })
  @ApiProperty()
  featureName: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty()
  added: Date;

  @Column({ nullable: false })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  enabled: boolean;

  @BeforeInsert()
  setId() {
    this.id = shortUuid.generate();
  }

  constructor(email: string, featureName: string) {
    this.email = email;
    this.featureName = featureName;
    this.enabled = false;
  }
}
