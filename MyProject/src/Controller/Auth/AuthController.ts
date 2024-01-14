import { Request, Response } from "express";
import { SignIn, SignUp } from "../../Interfaces/AuthInterface";
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
};
