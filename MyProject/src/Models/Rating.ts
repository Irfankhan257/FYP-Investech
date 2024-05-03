import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Innovator } from "./Innovator";
import { Investor } from "./Investor";

@Entity()
export class Ratings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => Innovator, (innovator) => innovator.innovatorRating, {
    nullable: true,
  })
  innovator: Innovator | null;

  @ManyToOne(() => Investor, (investor) => investor.investorRating, {
    nullable: true,
  })
  investor: Investor | null;
}
