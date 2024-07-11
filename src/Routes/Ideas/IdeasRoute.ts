import express from "express";
import { CompanyController } from "../../Controller/Company/CompanyController";
import { IdeaController } from "../../Controller/Ideas/IdeasController";

const router = express.Router();

router.post("/addnewidea", IdeaController.addIdea);
router.get("/getallideas", IdeaController.getAllIdeas);

export { router as IdeasRoute };
