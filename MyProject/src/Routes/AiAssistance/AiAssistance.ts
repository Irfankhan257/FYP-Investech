import express from "express";
import { AiController } from "../../Controller/AiAssistance/AiController";
const router = express.Router();

router.post("/askai", AiController.askAi);

export { router as AiRouter };
