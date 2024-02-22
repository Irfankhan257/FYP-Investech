import { Request, Response } from "express";
import { Rating, RatingId } from "../../Interfaces/RatingInterface";
import { RatingService } from "../../Services/Rating/RatingService";

export const RatingController = {
  SaveUserRatings: async (req: Request, res: Response) => {
    try {
      const { id, rating, role } = req.body;
      const userRating: Rating = {
        id: id,
        rating: rating,
        role: role,
      };
      const result = await RatingService.SaveUserRating(userRating);
      return res.status(result.statusCode).send(result.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  },

  FetchUserRatings: async (req: Request, res: Response) => {
    try {
      let id = +req.param.id;
      let role = req.param.role as string;
      const userRating: RatingId = {
        id: id,
        role: role,
      };
      const result = await RatingService.FetchUserRating(userRating);
      return res.status(result.statusCode).send(result.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
};
