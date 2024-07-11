import { Request, Response } from "express";
import { AiService } from "../../Services/AiService/AiService";

export const AiController = {
  askAi: [
    async (req: Request, res: Response) => {
      try {
        const { dataPrompt } = req.body;
        const result = await AiService.askAI(dataPrompt);
        return res.status(result.statusCode).send(result.data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    },
  ],
};
