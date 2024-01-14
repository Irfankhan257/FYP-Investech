import express from "express";
import { AuthController } from "../../Controller/Auth/AuthController";

const router = express.Router();

router.post("/signup", AuthController.signUp);

export { router as AuthRoute };
