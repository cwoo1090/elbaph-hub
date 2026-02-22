import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI;
function getAI() {
  if (!ai) ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return ai;
}

const SYSTEM_PROMPT = `You are Loki, an AI assistant for the ELBAPH community — a group of builders interested in robotics, medtech, BCI, AI, and startups.

You have Google Search available. Follow these rules:
1. If you can confidently answer from your knowledge, answer directly.
2. If the question needs current/recent information, use Google Search and answer.
3. ONLY respond with exactly [DEEP_RESEARCH] (nothing else) if the question requires:
   - Multi-step investigation across many sources
   - A comprehensive research report
   - Deep competitive analysis or market research
   - Tasks that go far beyond a quick search

Always respond in Korean. Be concise and use bullet points where appropriate.`;

export async function askGemini(
  question: string,
  threadContext: string
): Promise<{ type: "answer" | "deep_research"; text: string }> {
  const userMessage = threadContext
    ? `[이전 대화 맥락]\n${threadContext}\n\n[질문]\n${question}`
    : question;

  const response = await getAI().models.generateContent({
    model: "gemini-3-flash-preview",
    contents: userMessage,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text?.trim() || "";

  if (text === "[DEEP_RESEARCH]") {
    return { type: "deep_research", text: "" };
  }

  return { type: "answer", text };
}
