import express from "express";
import { RatingController } from "../../Controller/Rating/RatingController";
const router = express.Router();

router.post("/userrating", RatingController.SaveUserRatings);
router.get("/fetchrating", RatingController.FetchUserRatings);

export { router as RatingRoute };