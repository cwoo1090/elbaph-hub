import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI;
function getAI() {
  if (!ai) ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return ai;
}

const SYSTEM_PROMPT = `You are Loki, an AI assistant for the ELBAPH community — a group of people interested in robotics, medtech, AI, and startups.

You have Google Search available. Follow these rules:
1. If you can confidently answer from your knowledge, answer directly.
2. If the question needs current/recent information, use Google Search and answer.
3. Always try to answer using Google Search first, even if the topic seems complex.
4. ONLY respond with exactly [DEEP_RESEARCH] (nothing else) if ALL of these are true:
   - The question explicitly asks for a comprehensive report or deep analysis
   - It would require investigating 10+ different sources
   - A single Google Search cannot produce a reasonable answer
   Do NOT use [DEEP_RESEARCH] for factual questions, opinions, summaries, or anything you can answer with one or two searches.
5. If previous conversation context is provided, use it to resolve follow-up questions and implied references before answering. Ignore the context only when it is clearly unrelated.

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
