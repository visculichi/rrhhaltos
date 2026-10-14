
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini client with the required environment variable
// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-3-flash-preview';

export const generateHRResponse = async (
  prompt: string, 
  history: string[] = []
): Promise<string> => {
  try {
    const systemInstruction = `
      actúas como un asistente de recursos humanos corporativo llamado "nexo".
      tu tono es profesional, minimalista, empático y breve.
      respondes siempre en español y todo en minúsculas.
      tus respuestas deben transmitir orden y calma.
      ayudas a los empleados con dudas sobre vacaciones, recibos de sueldo y políticas de oficina.
    `;

    // Construct a simple prompt context since we aren't using the full Chat session object 
    // for this lightweight implementation to keep state management simple in the UI.
    const fullPrompt = `
      historial de conversación:
      ${history.join('\n')}
      
      usuario: ${prompt}
    `;

    // Always use ai.models.generateContent to query GenAI with both the model name and prompt.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    // Directly access the .text property of GenerateContentResponse (do not use text())
    return response.text || "no he podido procesar tu solicitud en este momento.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "lo siento, hubo un error de conexión. por favor intenta más tarde.";
  }
};
