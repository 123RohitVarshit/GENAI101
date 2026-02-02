---
name: personal-ai-dentist
description: Personal AI Dentist that tracks daily dental routines, manages doctor visits, and provides personalized dental health advice. Truly personal - remembers everything about your dental health.
user-invocable: true
metadata:
  {
    "openclaw":
      {
        "emoji": "🦷",
        "homepage": "https://github.com/yourusername/openclaw-dentist",
        "requires": { "bins": ["node", "npm"] },
        "always": false
      },
  }
---

# 🦷 Personal AI Dentist

Your personal AI dental assistant that lives inside Openclaw. It tracks your daily dental routines, stores doctor visit records, and provides truly personalized advice based on your complete dental history.

## Features

- **Daily Routine Tracking**: Log brushing, flossing, mouthwash, water intake, sugary foods
- **Doctor Visit Records**: Store appointments, procedures, diagnoses, recommendations
- **AI-Powered Advice**: Get personalized dental health tips based on your history
- **Memory System**: Remembers everything about your dental health automatically
- **Pain & Issue Tracking**: Log discomfort and get appropriate advice

## Installation

1. Copy this skill to your Openclaw workspace:
   ```bash
   mkdir -p ~/.openclaw/workspace/skills/personal-ai-dentist
   cp -r * ~/.openclaw/workspace/skills/personal-ai-dentist/
   ```

2. Install dependencies:
   ```bash
   cd ~/.openclaw/workspace/skills/personal-ai-dentist
   npm install
   ```

3. Initialize the database:
   ```bash
   npm run db:init
   ```

4. Restart Openclaw or start a new session to load the skill

## Usage

Once installed, you can interact with your AI Dentist through any Openclaw channel (WhatsApp, Telegram, Discord, etc.):

### Daily Routine Tracking

**Log today's routine:**
```
/dentist routine
```
The AI will ask you about:
- Morning and night brushing
- Brushing duration
- Flossing
- Mouthwash usage
- Water intake
- Sugary foods consumed
- Any pain or discomfort
- Additional notes

**View recent routines:**
```
/dentist routines last 7 days
```

### Doctor Visit Management

**Add a new visit:**
```
/dentist visit add
```
Records:
- Visit date
- Doctor name and clinic
- Procedures performed
- Diagnosis
- Recommendations
- Next appointment
- Cost
- Notes

**List all visits:**
```
/dentist visits list
```

### AI Dental Consultation

**Ask for advice:**
```
Hey dentist, how's my brushing routine looking?
```

**Report an issue:**
```
I have sensitivity in my lower left molar when drinking cold water
```

**General questions:**
```
What toothpaste do you recommend for sensitive teeth?
When should I schedule my next cleaning?
Can you explain what my dentist said about gum disease?
```

### Profile Management

**View your dental profile:**
```
/dentist profile
```

**Update profile:**
```
/dentist profile update
```

## Data Storage

All your dental data is stored locally in:
- `~/.openclaw/workspace/skills/personal-ai-dentist/data/dentist.db`

This is a SQLite database that stays on your machine - no data is sent to external servers except when you chat with the AI.

## Database Schema

The skill maintains:
- **users**: Your profile and preferences
- **daily_routines**: Historical routine logs
- **doctor_visits**: Visit records and documents
- **chat_history**: Conversation history with AI
- **user_memory**: Important facts extracted from conversations

## Tools Available

The skill provides these tools to the Openclaw agent:

1. `dentist_routine_log` - Log daily dental routine
2. `dentist_routine_view` - View recent routines
3. `dentist_visit_add` - Add doctor visit record
4. `dentist_visit_list` - List all visits
5. `dentist_profile_view` - View your dental profile
6. `dentist_profile_update` - Update profile information
7. `dentist_analyze` - Get AI analysis of your dental health
8. `dentist_chat` - Chat with AI dentist about any concern

## Privacy & Security

- All data stored locally on your machine
- No dental data sent to external APIs except AI chat messages
- SQLite database with WAL mode for safety
- Optional: Encrypt database with custom key

## Customization

You can customize:
- Default routine questions in `config/routine-questions.json`
- AI system prompt in `config/system-prompt.md`
- Database location in `.env` file

## Troubleshooting

**Skill not loading:**
- Check that files are in `~/.openclaw/workspace/skills/personal-ai-dentist/`
- Restart Openclaw gateway
- Run `openclaw doctor` to check for issues

**Database errors:**
```bash
cd ~/.openclaw/workspace/skills/personal-ai-dentist
npm run db:reset
```

**Missing dependencies:**
```bash
npm install
```

## Contributing

Feel free to submit issues or PRs to improve this skill!

## License

MIT - Use freely for personal or commercial use.

---

Built with 🦷 for Openclaw by the community.