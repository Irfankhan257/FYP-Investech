import { Request, Response } from "express";
import { SignIn, SignUp, UserEdit } from "../../Interfaces/AuthInterface";
import { AuthService } from "../../Services/Auth/AuthService";

export const AuthController = {
  signUp: [
    async (req: Request, res: Response) => {
      try {
        const { email, password, name, phone, role, city, country } = req.body;

        const signUpCredentials: SignUp = {
          email,
          password,
          name,
          phone,
          role,
          country,
          city,
        };

        const result = await AuthService.signUp(signUpCredentials);
        return res.status(result.statusCode).send(result.data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    },
  ],

  editUserInfo: [
    async (req: Request, res: Response) => {
      try {
        const {id,email, password, name, phone, role, city, country } = req.body;

        const editUserInfo: UserEdit = {
          id,
          email,
          password,
          name,
          phone,
          role,
          country,
          city,
        };

        const result = await AuthService.editUser(editUserInfo);
        return res.status(result.statusCode).send(result.data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    },
  ],

  InnovatorSignIn: [
    async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body;
        const signInCredentials: SignIn = { email: email, password: password };
        const result = await AuthService.InnovatorSignIn(signInCredentials);
        return res.status(result.statusCode).send(result.data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    },
  ],

  InvestorSignIn: [
    async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body;
        const signInCredentials: SignIn = { email: email, password: password };
        const result = await AuthService.InvestorSignIn(signInCredentials);
        return res.status(result.statusCode).send(result.data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    },
  ],
};
