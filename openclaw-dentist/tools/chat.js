#!/usr/bin/env node
// Tool: dentist_chat_context - Get context for AI dentist chat

import { getUserContextForAI, getOrCreateDefaultUser, saveChatMessage, getChatHistory } from '../lib/db.js';

const args = process.argv.slice(2);

// Parse command
const commandArg = args.find(arg => arg.startsWith('--command='));
const command = commandArg ? commandArg.replace('--command=', '') : 'context';

try {
  const user = getOrCreateDefaultUser();
  
  if (command === 'context') {
    // Get full context for AI
    const context = getUserContextForAI(user.id);
    const history = getChatHistory(user.id, 10);
    
    console.log(JSON.stringify({
      type: 'chat_context',
      userId: user.id,
      context: context,
      recentHistory: history.map(h => ({ role: h.role, content: h.content })),
      message: 'Chat context loaded'
    }));
  } else if (command === 'save') {
    // Save a message
    const roleArg = args.find(arg => arg.startsWith('--role='));
    const contentArg = args.find(arg => arg.startsWith('--content='));
    
    if (roleArg && contentArg) {
      const role = roleArg.replace('--role=', '');
      const content = contentArg.replace('--content=', '');
      
      saveChatMessage(user.id, role, content);
      
      console.log(JSON.stringify({
        success: true,
        message: 'Message saved'
      }));
    }
  } else {
    console.log(JSON.stringify({
      type: 'help',
      commands: ['context', 'save']
    }));
  }
} catch (error) {
  console.error(JSON.stringify({
    success: false,
    error: error.message
  }));
  process.exit(1);
}