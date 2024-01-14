import { Innovator } from "./../../Models/Innovator";
import { SignUp } from "../../Interfaces/AuthInterface";
import { AppDataSource } from "../../data-source";
import { Investor } from "../../Models/Investor";

export const AuthService = {
  signUp: async (signUpCredentials: SignUp) => {
    const userRole = signUpCredentials.role;

    if (userRole != "investor") {
      const newInnovator = new Innovator();
      newInnovator.email = signUpCredentials.email;
      newInnovator.role = signUpCredentials.role;
      newInnovator.password = signUpCredentials.password;
      newInnovator.name = signUpCredentials.name;
      newInnovator.phone = signUpCredentials.phone;
      newInnovator.city = signUpCredentials.city;
      newInnovator.country = signUpCredentials.country;

      await AppDataSource.manager.save(newInnovator);
    }

    const newInnovator = new Investor();
    newInnovator.email = signUpCredentials.email;
    newInnovator.role = signUpCredentials.role;
    newInnovator.password = signUpCredentials.password;
    newInnovator.name = signUpCredentials.name;
    newInnovator.phone = signUpCredentials.phone;
    newInnovator.city = signUpCredentials.city;
    newInnovator.country = signUpCredentials.country;

    await AppDataSource.manager.save(newInnovator);

    return {
      statusCode: 201,
      data: {
        message: "Successfully created",
      },
    };
  },
};
