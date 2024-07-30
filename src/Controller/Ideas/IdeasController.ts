import { Request, Response } from "express";
import { ideas } from "../../Interfaces/IdeasInterface";
import { IdeaService } from "../../Services/Idea/IdeasService";

export const IdeaController = {
  addIdea: [
    async (req: Request, res: Response) => {
      try {
        const { userId, title, description } = req.body;
        const addTitle: ideas = {
          title: title,
          description: description,
          userId: userId,
        };
        const result = await IdeaService.AddNewIdea(addTitle);
        return res.status(result.statusCode).send(result.data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    },
  ],

  getAllIdeas: [
    async (req: Request, res: Response) => {
      try {
        const result = await IdeaService.getAllIdeas();
        return res.status(result.statusCode).send(result.data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    },
  ],

  getIdeasByInnovatorId: [
    async (req: Request, res: Response) => {
      try {
        const { innovatorId } = req.query;
        const userId = parseInt(innovatorId as string, 10);

        if (isNaN(userId)) {
          return res.status(400).json({ message: "Invalid innovator ID" });
        }

        const result = await IdeaService.getIdeasByInnovatorId(userId);
        return res.status(result.statusCode).send(result.data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    },
  ],
};
