import { SignIn, UserEdit } from "./../../Interfaces/AuthInterface";
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
      newInnovator.generalInfo = "General Information required";

      await AppDataSource.manager.save(newInnovator);
    } else {
      const newInvestor = new Investor();
      newInvestor.email = signUpCredentials.email;
      newInvestor.role = signUpCredentials.role;
      newInvestor.password = signUpCredentials.password;
      newInvestor.name = signUpCredentials.name;
      newInvestor.phone = signUpCredentials.phone;
      newInvestor.city = signUpCredentials.city;
      newInvestor.country = signUpCredentials.country;
      newInvestor.generalInfo = "General Information required";

      await AppDataSource.manager.save(newInvestor);
    }

    return {
      statusCode: 201,
      data: {
        message: "Successfully created",
      },
    };
  },

  getUserById: async (id: number, role: string) => {
    const repository =
      role === "investor"
        ? AppDataSource.getRepository(Investor)
        : AppDataSource.getRepository(Innovator);

    const user = await repository.findOne({
      where: { id },
    });

    if (!user) {
      return {
        statusCode: 404,
        data: {
          message: "User not found",
        },
      };
    }

    return {
      statusCode: 200,
      data: user,
    };
  },

  editUser: async (updatedUserInfo: UserEdit) => {
    const investorRepository = AppDataSource.getRepository(Investor);
    const innovatorRepository = AppDataSource.getRepository(Innovator);

    const user = await (updatedUserInfo.role === "investor"
      ? investorRepository.findOneBy({ id: updatedUserInfo.id })
      : innovatorRepository.findOneBy({ id: updatedUserInfo.id }));

    if (!user) {
      return {
        statusCode: 404,
        data: {
          message: "User not found",
        },
      };
    }

    user.email = updatedUserInfo.email || user.email;
    user.password = updatedUserInfo.password || user.password;
    user.name = updatedUserInfo.name || user.name;
    user.phone = updatedUserInfo.phone || user.phone;
    user.city = updatedUserInfo.city || user.city;
    user.country = updatedUserInfo.country || user.country;
    user.generalInfo = updatedUserInfo.generalInfo || user.generalInfo;

    await (updatedUserInfo.role === "investor"
      ? investorRepository.save(user)
      : innovatorRepository.save(user));

    return {
      statusCode: 200,
      data: {
        message: "User information updated successfully",
        user: user,
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
