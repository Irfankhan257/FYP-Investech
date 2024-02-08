import { ideas } from "../../Interfaces/IdeasInterface";
import { Ideas } from "../../Models/Ideas";
import { Innovator } from "../../Models/Innovator";
import { AppDataSource } from "../../data-source";

export const IdeaService = {
  AddNewIdea: async (ideaDetails: ideas) => {
    const innovaterRepository = AppDataSource.getRepository(Innovator);

    const existingUser = await innovaterRepository.findOneBy({
      id: ideaDetails.userId,
    });

    if (!existingUser) {
      return {
        statusCode: 400,
        data: { message: "User not found. Please sign up first." },
      };
    }

    const addNewIdeaDetail = new Ideas();

    addNewIdeaDetail.ideaTitle = ideaDetails.title;
    addNewIdeaDetail.ideaDescription = ideaDetails.description;
    addNewIdeaDetail.innovator = ideaDetails.userId;

    await AppDataSource.manager.save(addNewIdeaDetail);

    return {
      statusCode: 201,
      data: {
        message: "Successfully created",
      },
    };
  },

  getAllIdeas: async () => {
    const ideasRepository = AppDataSource.getRepository(Ideas);

    const totalIdeas = await ideasRepository.find({
      order: {
        ideaTitle: "ASC",
        id: "DESC",
      },
    });

    return {
      statusCode: 201,
      data: {
        allIdeas: totalIdeas,
      },
    };
  },
};
