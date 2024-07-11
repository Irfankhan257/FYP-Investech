import { log } from "console";
import { Rating, RatingId } from "../../Interfaces/RatingInterface";
import { Innovator } from "../../Models/Innovator";
import { Investor } from "../../Models/Investor";
import { Ratings } from "../../Models/Rating";
import { AppDataSource } from "../../data-source";

export const RatingService = {
  SaveUserRating: async (userRating: Rating) => {
    const ratingRepository = AppDataSource.getRepository(Ratings);
    const innovaterRepository = AppDataSource.getRepository(Innovator);
    const investorRepository = AppDataSource.getRepository(Investor);

    if (userRating.role === "innovator") {
      const innovaterRating = await innovaterRepository.findOneBy({
        id: userRating.id,
      });

      console.log("innovaterRating", innovaterRating);

      if (!innovaterRating) {
        return {
          statusCode: 400,
          data: { message: "User not found. Please sign up first." },
        };
      }
      const addUserRating = new Ratings();
      addUserRating.innovator = innovaterRating;
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
    addUserRating.investor = investorRating;
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
        return (
          rating.innovator &&
          rating.innovator.id &&
          rating.innovator.id == userRating.id
        );
      });

      if (!filteredRatings || filteredRatings.length === 0) {
        return {
          statusCode: 400,
          data: { message: "No ratings found for this user." },
        };
      }

      const totalRatings = filteredRatings.length;

      const sumOfRatings = filteredRatings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );

      const averageRating = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

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
      return (
        rating.investor &&
        rating.investor.id &&
        rating.investor.id == userRating.id
      );
    });

    const totalRatings = filteredRatings.length;

    const sumOfRatings = filteredRatings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );

    const averageRating = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

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
