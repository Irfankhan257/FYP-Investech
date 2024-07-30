import { GoogleGenerativeAI } from "@google/generative-ai";

export const AiService = {
  askAI: async (aiPrompt) => {
    console.log("aiPrompt", aiPrompt);

    const previousResponse = "";
    const configuration = new GoogleGenerativeAI(
      "AIzaSyCU7NMx41fzhvpSoiaqk483u2tbqs5UUj8"
    );
    const modelId = "gemini-pro";
    const model = configuration.getGenerativeModel({ model: modelId });
    const prompt = `${
      previousResponse ? previousResponse + ". " : ""
    }${aiPrompt}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return {
      statusCode: 201,
      data: { text },
    };
  },
};
