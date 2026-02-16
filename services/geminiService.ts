
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export async function editHairstyle(base64Image: string, stylePrompt: string): Promise<string> {
  const ai = getAIClient();
  const mimeType = base64Image.split(';')[0].split(':')[1];
  const imageData = base64Image.split(',')[1];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: imageData,
            mimeType: mimeType,
          },
        },
        {
          text: `${SYSTEM_INSTRUCTION}\n\nSpecific Request: Apply the following hairstyle: ${stylePrompt}`,
        },
      ],
    },
  });

  if (!response.candidates?.[0]?.content?.parts) {
    throw new Error('No content returned from AI');
  }

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  throw new Error('No image returned in the AI response');
}
