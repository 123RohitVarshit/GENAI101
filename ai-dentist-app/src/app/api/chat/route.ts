import { NextResponse } from 'next/server';
import { sendMessageToKimi, extractImportantInfo } from '@/lib/kimi';
import { saveChatMessage, getChatHistory, getUserContextForAI, saveUserMemory } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { userId, message } = await request.json();

    if (!userId || !message) {
      return NextResponse.json(
        { error: 'Missing userId or message' },
        { status: 400 }
      );
    }

    // Save user message
    await saveChatMessage(userId, 'user', message);

    // Get chat history for context
    const chatHistory = await getChatHistory(userId, 20);
    const messages = chatHistory.map((msg: any) => ({
      role: msg.role,
      content: msg.content
    }));

    // Get user context from database
    const userContext = getUserContextForAI(userId);

    // Get response from Kimi
    const response = await sendMessageToKimi(messages, userContext);

    // Save AI response
    await saveChatMessage(userId, 'assistant', response);

    // Extract and save important information
    const importantInfo = await extractImportantInfo(message);
    if (importantInfo) {
      await saveUserMemory(
        userId,
        importantInfo.category,
        importantInfo.key,
        importantInfo.value,
        2
      );
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}