import cors  from 'cors';
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { json } from "body-parser";
import express from "express";
import { AuthRoute } from "./Routes/Auth/AuthRoute";
import { CompanyRoute } from "./Routes/Comapany/CompanyRoute";
import { IdeasRoute } from "./Routes/Ideas/IdeasRoute";
import { RatingRoute } from "./Routes/Rating/RatingRoute";
import { TagRouter } from "./Routes/Tag/TagRoutes";
import { AiRouter } from "./Routes/AiAssistance/AiAssistance";

const app = express();
app.use(json({ limit: "5mb" }));

app.use(cors());

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to database and the investor is live");
  })
  .catch((error) => console.log(error));

app.use("/auth", AuthRoute);
app.use("/company", CompanyRoute);
app.use("/ideas", IdeasRoute);
app.use("/rating", RatingRoute);
app.use("/tags", TagRouter)
app.use("/ai", AiRouter);

app.listen(8080, () => {
  console.log("The port is live on 3000");
});
