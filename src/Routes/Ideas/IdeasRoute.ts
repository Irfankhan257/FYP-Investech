import express from "express";
import { IdeaController } from "../../Controller/Ideas/IdeasController";

const router = express.Router();

router.post("/addnewidea", IdeaController.addIdea);
router.get("/getallideas", IdeaController.getAllIdeas);
router.get("/searchideas", IdeaController.searchIdeas);
router.get("/getIdeasByInnovatorId", IdeaController.getIdeasByInnovatorId);

export { router as IdeasRoute };
