import express from "express";
import { AuthController } from "../../Controller/Auth/AuthController";

const router = express.Router();

router.post("/signup", AuthController.signUp);
router.get("/user", AuthController.getUserInfo);
router.post("/edituserinfo", AuthController.editUserInfo);
router.post("/innovatorsignin", AuthController.InnovatorSignIn);
router.post("/investorsignin", AuthController.InvestorSignIn);

export { router as AuthRoute };
