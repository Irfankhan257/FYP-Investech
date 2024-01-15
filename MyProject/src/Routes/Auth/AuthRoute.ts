import express from "express";
import { AuthController } from "../../Controller/Auth/AuthController";

const router = express.Router();

router.post("/signup", AuthController.signUp);
router.post("/innovatorsignin", AuthController.InnovatorSignIn);
router.post("/investorsignin", AuthController.InnovatorSignIn);


export { router as AuthRoute };
