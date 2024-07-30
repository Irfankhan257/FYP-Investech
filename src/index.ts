import cors from "cors";
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
import { emailRouter } from "./Routes/Email/EmailRoute";

const app = express();
const port = process.env.PORT || 8080;
app.use(json({ limit: "5mb" }));

const corsOptions = {
  origin: "*", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
};

app.use(cors(corsOptions));


AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to database and the investor is live");
  })
  .catch((error) => console.log(error));

app.use("/auth", AuthRoute);
app.use("/company", CompanyRoute);
app.use("/ideas", IdeasRoute);
app.use("/rating", RatingRoute);
app.use("/tags", TagRouter);
app.use("/ai", AiRouter);
app.use("/email", emailRouter);

app.listen(port, () => {
  console.log("The port is live on 8080");
});
