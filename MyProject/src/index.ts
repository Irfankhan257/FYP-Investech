import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { json } from "body-parser";
import express from "express";
import { Investor } from "./Models/Investor";
import { AuthRoute } from "./Routes/Auth/AuthRoute";

const app = express();
app.use(json({ limit: "5mb" }));

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to database and the investor is live");
  })
  .catch((error) => console.log(error));

app.use("/auth", AuthRoute);

app.listen(3000, () => {
  console.log("The port is live on 3000");
});
