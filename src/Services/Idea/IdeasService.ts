import { Equal } from "typeorm";
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
    addNewIdeaDetail.ideaTag = ideaDetails.ideaTagId;

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
      relations: ["ideaTag", "innovator"],
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

  getIdeasByInnovatorId: async (innovatorId: number) => {
    console.log("innovatorId", innovatorId);
    const ideasRepository = AppDataSource.getRepository(Ideas);

    const innovatorRepository = AppDataSource.getRepository(Innovator);
    const existingInnovator = await innovatorRepository.findOneBy({
      id: innovatorId,
    });

    if (!existingInnovator) {
      return {
        statusCode: 404,
        data: { message: "Innovator not found." },
      };
    }

    const ideasByInnovator = await ideasRepository.find({
      where: {
        innovator: Equal(innovatorId),
      },
      relations: ["ideaTag", "innovator"],
      order: {
        ideaTitle: "ASC",
        id: "DESC",
      },
    });

    return {
      statusCode: 200,
      data: {
        innovatorIdeas: ideasByInnovator,
      },
    };
  },

  searchIdeas: async (searchTerm: string, tagId?: number) => {
    const ideasRepository = AppDataSource.getRepository(Ideas);

    const query = ideasRepository
      .createQueryBuilder("ideas")
      .leftJoinAndSelect("ideas.ideaTag", "ideaTag")
      .leftJoinAndSelect("ideas.innovator", "innovator");

    if (searchTerm) {
      query.andWhere(
        "ideas.ideaTitle LIKE :searchTerm OR ideas.ideaDescription LIKE :searchTerm",
        {
          searchTerm: `%${searchTerm}%`,
        }
      );
    }

    if (tagId) {
      query.andWhere("ideaTag.id = :tagId", { tagId });
    }

    query.orderBy("ideas.ideaTitle", "ASC").addOrderBy("ideas.id", "DESC");

    const results = await query.getMany();

    return {
      statusCode: 200,
      data: {
        ideas: results,
      },
    };
  },
};
