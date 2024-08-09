import { Request, Response } from "express";
import { ideas } from "../../Interfaces/IdeasInterface";
import { IdeaService } from "../../Services/Idea/IdeasService";

export const IdeaController = {
  addIdea: [
    async (req: Request, res: Response) => {
      try {
        const { userId, title, description, tagId } = req.body;
        const addTitle: ideas = {
          title: title,
          description: description,
          userId: userId,
          ideaTagId: tagId,
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

  searchIdeas:[ async (req: Request, res: Response) => {
    try {
      const { searchTerm, tagId } = req.query;

      // Convert tagId to a number if it's provided
      const parsedTagId = tagId ? parseInt(tagId as string, 10) : undefined;

      // Call the service method to search for ideas
      const result = await IdeaService.searchIdeas(
        searchTerm as string,
        parsedTagId
      );

      // Send the result back to the client
      return res.status(result.statusCode).json(result.data);
    } catch (error) {
      console.error("Error searching for ideas:", error);
      return res.status(500).json({
        message: "An error occurred while searching for ideas.",
      });
    }
  }],
};
