import { Rating, RatingId } from "../../Interfaces/RatingInterface";
import { Innovator } from "../../Models/Innovator";
import { Investor } from "../../Models/Investor";
import { Ratings } from "../../Models/Rating";
import { AppDataSource } from "../../data-source";

export const RatingService = {
  SaveUserRating: async (userRating: Rating) => {
    const innovaterRepository = AppDataSource.getRepository(Innovator);
    const investorRepository = AppDataSource.getRepository(Investor);

    if (userRating.role === "innovator") {
      const innovaterRating = await innovaterRepository.findOneBy({
        id: userRating.id,
      });

      if (!innovaterRating) {
        return {
          statusCode: 400,
          data: { message: "User not found. Please sign up first." },
        };
      }
      const addUserRating = new Ratings();
      addUserRating.innovator.id = userRating.id;
      addUserRating.rating = userRating.rating;
      await AppDataSource.manager.save(addUserRating);

      return {
        statusCode: 201,
        data: {
          message: "Rating submitted for Innovator Succesfully",
        },
      };
    }

    const investorRating = await investorRepository.findOneBy({
      id: userRating.id,
    });

    if (!investorRating) {
      return {
        statusCode: 400,
        data: { message: "User not found. Please sign up first." },
      };
    }
    const addUserRating = new Ratings();
    addUserRating.investor.id = userRating.id;
    addUserRating.rating = userRating.rating;

    await AppDataSource.manager.save(addUserRating);

    return {
      statusCode: 201,
      data: {
        message: "Rating submitted for Investor Succesfully",
      },
    };
  },

  FetchUserRating: async (userRating: RatingId) => {
    
    const ratingRepository = AppDataSource.getRepository(Ratings);

    if (userRating.role === "innovator") {
      const innovaterRating = await ratingRepository.find({
        relations: ["innovator"],
      });

      const filteredRatings = innovaterRating.filter((rating) => {
        return rating.innovator && rating.innovator.id === userRating.id;
      });

      const totalRatings = filteredRatings.length;

      const sumOfRatings = filteredRatings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );

      const averageRating = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

      console.log("avg rating", averageRating);

      if (!innovaterRating) {
        return {
          statusCode: 400,
          data: { message: "User not found. Please sign up first." },
        };
      }

      return {
        statusCode: 201,
        data: {
          id: userRating.id,
          overAllRating: averageRating,
        },
      };
    }

    const investorRating = await ratingRepository.find({
      relations: ["investor"],
    });

    const filteredRatings = investorRating.filter((rating) => {
      return rating.investor && rating.investor.id === userRating.id;
    });

    const totalRatings = filteredRatings.length;

    const sumOfRatings = filteredRatings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );

    const averageRating = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

    console.log(averageRating);

    if (!investorRating) {
      return {
        statusCode: 400,
        data: { message: "User not found. Please sign up first." },
      };
    }

    return {
      statusCode: 201,
      data: {
        id: userRating.id,
        overAllRating: averageRating,
      },
    };
  },
};
