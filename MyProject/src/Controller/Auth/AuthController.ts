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
        const { id, email, password, name, phone, role, city, country } =
          req.body;

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

  getUserInfo: [
    async (req: Request, res: Response) => {
      const { id, role } = req.query;

      const userId = parseInt(id as string, 10);
      if (isNaN(userId)) {
        return res.status(400).json({
          statusCode: 400,
          data: {
            message: "Invalid user ID",
          },
        });
      }

      const result = await AuthService.getUserById(userId, role as string);

      return res.status(result.statusCode).json(result);
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
