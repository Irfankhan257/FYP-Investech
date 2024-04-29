import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Innovator } from "./Innovator";

@Entity()
export class Ideas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ideaTitle: string;

  @Column()
  ideaDescription: string;

  @Column()
  ideaTag: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Innovator, (innovator) => innovator.ideas)
  innovator: number | null;
}
