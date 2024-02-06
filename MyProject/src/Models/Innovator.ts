import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Company } from "./Comapany-details";
import { Ideas } from "./Ideas";

@Entity()
export class Innovator {
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

  @Column()
  city: string;

  @Column()
  role: string;

  @Column()
  country: string;

  @OneToMany(() => Company, (company) => company.innovator)
  company: Company[];

  @OneToMany(() => Ideas, (ideas) => ideas.innovator)
  ideas: Ideas[];
}
