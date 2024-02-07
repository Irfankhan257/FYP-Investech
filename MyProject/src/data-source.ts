import "reflect-metadata";
import { DataSource } from "typeorm";
import { Innovator } from "./Models/Innovator";
import { Investor } from "./Models/Investor";
import { Company } from "./Models/Comapany-details";
import { Ideas } from "./Models/Ideas";
import { Ratings } from "./Models/Rating";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "test123",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [Innovator, Investor, Company, Ideas, Ratings],
  migrations: ["migrations/**/*.ts"],
  subscribers: [],
});
