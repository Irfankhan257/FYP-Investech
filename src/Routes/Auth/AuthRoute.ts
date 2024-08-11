import express from "express";
import { AuthController } from "../../Controller/Auth/AuthController";

const router = express.Router();

router.post("/signup", AuthController.signUp);
router.get("/user", AuthController.getUserInfo);
router.post("/edituserinfo", AuthController.editUserInfo);
router.get("/investors",AuthController.searchInvestorsController);
router.get("/investorssearch", AuthController.searchInvestorsController);
router.post("/innovatorsignin", AuthController.InnovatorSignIn);
router.post("/investorsignin", AuthController.InvestorSignIn);

export { router as AuthRoute };
