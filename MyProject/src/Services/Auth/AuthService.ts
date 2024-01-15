import { SignIn } from "./../../Interfaces/AuthInterface";
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
    } else {
      const newInnovator = new Investor();
      newInnovator.email = signUpCredentials.email;
      newInnovator.role = signUpCredentials.role;
      newInnovator.password = signUpCredentials.password;
      newInnovator.name = signUpCredentials.name;
      newInnovator.phone = signUpCredentials.phone;
      newInnovator.city = signUpCredentials.city;
      newInnovator.country = signUpCredentials.country;

      await AppDataSource.manager.save(newInnovator);
    }

    return {
      statusCode: 201,
      data: {
        message: "Successfully created",
      },
    };
  },

  InnovatorSignIn: async (signInCredentials: SignIn) => {
    const InnovaterRepository = AppDataSource.getRepository(Innovator);
    const fetchedUser = await InnovaterRepository.findOneBy({
      email: signInCredentials.email,
      password: signInCredentials.password,
    });

    return {
      statusCode: 201,
      data: {
        user: {
          id: fetchedUser.id,
          fullName: `${fetchedUser.name}`,
          email: fetchedUser.email,
          firstName: fetchedUser.name,
          phone: fetchedUser.phone,
          role: fetchedUser.role,
        },
      },
    };
  },

  InvestorSignIn: async (signInCredentials: SignIn) => {
    const InvestorRepository = AppDataSource.getRepository(Investor);
    const fetchedUser = await InvestorRepository.findOneBy({
      email: signInCredentials.email,
      password: signInCredentials.password,
    });

    console.log("test", fetchedUser);

    return {
      statusCode: 201,
      data: {
        user: {
          id: fetchedUser.id,
          fullName: `${fetchedUser.name}`,
          email: fetchedUser.email,
          firstName: fetchedUser.name,
          phone: fetchedUser.phone,
          role: fetchedUser.role,
        },
      },
    };
  },
};
