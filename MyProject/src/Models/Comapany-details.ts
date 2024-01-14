import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Innovator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  email: string;

  @Column()
  city: number;

  @Column()
  country: boolean;
}
