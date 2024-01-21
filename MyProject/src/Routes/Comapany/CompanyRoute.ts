import express from "express";
import { CompanyController } from "../../Controller/Company/CompanyController";

const router = express.Router();

router.post("/addcompany", CompanyController.CompanyDetails);

export { router as CompanyRoute };
