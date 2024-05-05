import { GoogleGenerativeAI } from "@google/generative-ai";

export const AiService = {
  askAI: async (aiPrompt) => {
    const configuration = new GoogleGenerativeAI(
      "AIzaSyDKM-enVJYATTV-Rmdmgh7sOrJ45ZVnUmA"
    );
    const modelId = "gemini-pro";
    const model = configuration.getGenerativeModel({ model: modelId });
    const prompt = aiPrompt;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return {
      statusCode: 201,
      data: { text },
    };
  },
};
