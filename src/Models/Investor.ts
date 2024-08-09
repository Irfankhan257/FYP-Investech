import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Company } from "./Comapany-details";
import { Ratings } from "./Rating";

@Entity()
export class Investor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  generalInfo: string;

  @Column()
  city: string;

  @Column()
  role: string;

  @Column()
  country: string;

  @OneToMany(() => Company, (company) => company.innovator)
  company: Company[];

  @OneToMany(() => Ratings, (ratings) => ratings.investor)
  investorRating: Ratings[];
}
