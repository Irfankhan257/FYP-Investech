import express from "express";
import { TagsController } from "../../Controller/Tags/TagController";
const router = express.Router();

router.get("/fetchtag", TagsController.getAllTags);

export { router as TagRouter };
