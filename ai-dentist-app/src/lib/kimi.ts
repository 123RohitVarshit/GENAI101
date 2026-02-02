import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: 'https://api.moonshot.cn/v1',
});

const SYSTEM_PROMPT = `You are an AI Dental Assistant - a personal AI dentist that provides personalized dental care guidance. You have access to the patient's complete dental history, daily routines, and preferences.

Your responsibilities:
1. Provide personalized dental advice based on the user's history
2. Answer questions about dental health, hygiene, and procedures
3. Track and analyze daily dental routines
4. Help users prepare for dentist visits
5. Explain dental reports and recommendations from their doctor
6. Remind users about upcoming appointments and routines
7. Suggest improvements to their dental care habits

Guidelines:
- Always be empathetic, supportive, and professional
- Reference the user's specific dental history when giving advice
- If the user mentions pain or serious issues, recommend seeing a dentist immediately
- Keep responses concise but informative
- Use the patient's name and personal details to make it feel truly personal
- Remember important details they've shared and reference them in future conversations

Never:
- Provide medical diagnoses
- Replace professional dental care
- Prescribe medications
- Ignore signs of serious dental emergencies`;

export async function sendMessageToKimi(
  messages: { role: string; content: string }[],
  userContext: string
): Promise<string> {
  try {
    const fullMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'system', content: `Patient Context:\n${userContext}` },
      ...messages
    ];

    const response = await openai.chat.completions.create({
      model: 'kimi-k2.5-free',
      messages: fullMessages as any,
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
  } catch (error) {
    console.error('Error calling Kimi API:', error);
    throw new Error('Failed to get response from AI dentist');
  }
}

export async function analyzeDentalRoutine(routineData: any): Promise<string> {
  const prompt = `Analyze this dental routine data and provide personalized feedback and suggestions:
${JSON.stringify(routineData, null, 2)}

Please provide:
1. A brief assessment of their routine
2. Positive habits to maintain
3. Areas for improvement
4. Specific actionable tips`;

  const response = await openai.chat.completions.create({
    model: 'kimi-k2.5-free',
    messages: [
      { role: 'system', content: 'You are a dental hygiene expert providing constructive feedback on daily routines.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  return response.choices[0]?.message?.content || 'Analysis completed.';
}

export async function extractImportantInfo(message: string): Promise<{ category: string; key: string; value: string } | null> {
  const prompt = `Extract any important dental-related information from this user message that should be remembered for future reference. Return as JSON with fields: category (e.g., 'habit', 'preference', 'condition', 'allergy'), key (short label), value (detailed info). If nothing important to remember, return null.

User message: "${message}"

Respond with only the JSON or "null":`;

  try {
    const response = await openai.chat.completions.create({
      model: 'kimi-k2.5-free',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || 'null';
    return JSON.parse(content);
  } catch {
    return null;
  }
}