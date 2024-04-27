import "reflect-metadata";
import { DataSource } from "typeorm";
import { Innovator } from "./Models/Innovator";
import { Investor } from "./Models/Investor";
import { Company } from "./Models/Comapany-details";
import { Ideas } from "./Models/Ideas";
import { Ratings } from "./Models/Rating";

export const AppDataSource = new DataSource({
  type: "postgres",
  // host: "postgres://dxtpffbm:yYJnao1Kwu6xumNVxYFDem3yjoK5usls@rain.db.elephantsql.com/dxtpffbm",
  // port: 5432,
  // username: "dxtpffbm",
  // password: "yYJnao1Kwu6xumNVxYFDem3yjoK5usls",
  // database: "dxtpffbm",
  url: "postgres://dxtpffbm:yYJnao1Kwu6xumNVxYFDem3yjoK5usls@rain.db.elephantsql.com/dxtpffbm",
  synchronize: true,
  logging: false,
  entities: [Innovator, Investor, Company, Ideas, Ratings],
  migrations: ["migrations/**/*.ts"],
  subscribers: [],
});
