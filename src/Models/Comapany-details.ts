import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Innovator } from "./Innovator";
import { Investor } from "./Investor";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @ManyToOne(() => Innovator, (innovator) => innovator.company, {
    nullable: true,
  })
  innovator: number | null;

  @ManyToOne(() => Investor, (investor) => investor.company, { nullable: true })
  investor: number | null;
}
