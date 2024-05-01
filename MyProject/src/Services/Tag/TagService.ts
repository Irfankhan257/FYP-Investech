import { Tags } from "../../Models/Tags";
import { AppDataSource } from "../../data-source";

export const TagsService = {

  fetchTags: async () => {
    const tagRepository = AppDataSource.getRepository(Tags);

    const totaltags = await tagRepository.find({
      order: {
        id: "DESC",
      },
    });

    return {
      statusCode: 201,
      data: {
        allTags: totaltags,
      },
    };
  },
};
