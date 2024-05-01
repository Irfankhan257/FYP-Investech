import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Innovator } from "./Innovator";
import { Investor } from "./Investor";
import { Ideas } from "./Ideas";

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Tag: string;

  @OneToMany(() => Ideas, (ideas) => ideas.ideaTag)
  ideas: Ideas[];
}
