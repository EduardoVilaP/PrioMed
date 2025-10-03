
import { GoogleGenAI, Type } from "@google/genai";
import { CareType, TriageResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getTriageResult = async (symptoms: string): Promise<TriageResult> => {
  try {
    const prompt = `
      Analise os seguintes sintomas para uma triagem médica inicial. 
      Responda APENAS com o objeto JSON.
      
      Sintomas: "${symptoms}"

      Tarefas:
      1. Determine o tipo de atendimento necessário ('Emergência', 'Urgência', 'Consulta de Rotina').
      2. Gere um resumo conciso da triagem (máximo 25 palavras) para o paciente.
      3. Atribua um score de prioridade de 1 a 100, onde 100 é a prioridade mais alta (risco de vida imediato).

      - 'Emergência': Risco de vida. Score de prioridade ~80-100. (ex: dor no peito, falta de ar severa).
      - 'Urgência': Necessita atenção rápida, sem risco de vida imediato. Score de prioridade ~40-79. (ex: febre alta, fratura).
      - 'Consulta de Rotina': Baixa urgência. Score de prioridade ~1-39. (ex: resfriado, check-up).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            careType: {
              type: Type.STRING,
              description: "O tipo de atendimento recomendado.",
              enum: [CareType.Emergencia, CareType.Urgencia, CareType.Consulta]
            },
            priorityScore: {
                type: Type.INTEGER,
                description: "Um score de prioridade de 1 (mais baixo) a 100 (mais alto)."
            },
            triageSummary: {
                type: Type.STRING,
                description: "Um resumo conciso da triagem para o paciente."
            }
          },
          required: ["careType", "priorityScore", "triageSummary"]
        },
      },
    });

    const jsonText = response.text;
    const result = JSON.parse(jsonText);
    
    if (Object.values(CareType).includes(result.careType) && result.priorityScore && result.triageSummary) {
      return result as TriageResult;
    }
    
    throw new Error("Resposta da IA em formato inesperado.");

  } catch (error) {
    console.error("Erro ao obter resultado da triagem da IA:", error);
    throw new Error("Não foi possível realizar a triagem com a IA. Verifique sua conexão ou tente novamente.");
  }
};
