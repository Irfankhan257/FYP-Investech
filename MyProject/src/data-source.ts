import "reflect-metadata";
import { DataSource } from "typeorm";
import { Innovator } from "./Models/Innovator";
import { Investor } from "./Models/Investor";
import { Company } from "./Models/Comapany-details";
import { Ideas } from "./Models/Ideas";
import { Ratings } from "./Models/Rating";
import { Tags } from "./Models/Tags";

export const AppDataSource = new DataSource({
  type: "postgres",
  // host: "localhost",
  // port: 5432,
  // username: "postgres",
  // password: "test123",
  // database: "postgres",
  synchronize: true,
  url: "postgres://dxtpffbm:yYJnao1Kwu6xumNVxYFDem3yjoK5usls@rain.db.elephantsql.com/dxtpffbm",
  logging: false,
  entities: [Innovator, Investor, Company, Ideas, Ratings, Tags],
  migrations: ["migrations/**/*.ts"],
  subscribers: [],
});
