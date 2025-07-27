import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// The API key is injected from the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function reviewCodeWithGemini(code: string): Promise<string> {
  if (!process.env.API_KEY) {
    // This provides a user-friendly error in case the key is missing.
    return "Error: API_KEY is not configured. Please ensure the API_KEY environment variable is set.";
  }
  
  if (!code.trim()) {
    return "Please provide some code to review.";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Here is the code to review:\n\n\`\`\`\n${code}\n\`\`\``,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION
        }
    });
    
    return response.text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while communicating with the AI: ${error.message}\n\nPlease check your API key and network connection.`;
    }
    return "An unknown error occurred while reviewing the code.";
  }
}
