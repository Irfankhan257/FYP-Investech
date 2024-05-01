import { Request, Response } from "express";
import { TagsService } from "../../Services/Tag/TagService";

export const TagsController = {
  getAllTags: [
    async (req: Request, res: Response) => {
      try {
        const result = await TagsService.fetchTags();
        return res.status(result.statusCode).send(result.data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    },
  ],
};
