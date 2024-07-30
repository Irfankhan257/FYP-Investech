import express from "express";
import { EmailController } from "../../Controller/Email/EmailController";

const router = express.Router();

router.post("/sendemail", EmailController.sendEmail);


export { router as emailRouter };
