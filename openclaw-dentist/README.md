# 🦷 Personal AI Dentist for Openclaw

A comprehensive dental health tracking skill for Openclaw that provides truly personal AI dental assistance. Track daily routines, manage doctor visits, and get personalized advice - all through your favorite messaging platform.

## Why Openclaw?

Openclaw is the perfect platform for a personal AI dentist because:

✅ **Always Available** - Runs 24/7 on your machine  
✅ **Multi-Channel** - Chat via WhatsApp, Telegram, Discord, iMessage, Slack  
✅ **Persistent Memory** - Remembers everything across conversations  
✅ **Local-First** - Your dental data stays on your machine  
✅ **Truly Personal** - AI learns your patterns and provides contextual advice  
✅ **Voice & Text** - Use voice commands or text messaging  

## What This Skill Provides

### 📝 Daily Dental Routine Tracking
Log your daily habits:
- Morning & night brushing
- Flossing habits
- Mouthwash usage
- Water intake
- Sugary food consumption
- Pain or discomfort notes
- Custom observations

### 🏥 Doctor Visit Management
Keep records of:
- Appointment dates & clinics
- Procedures performed
- Diagnoses & recommendations
- Next appointment dates
- Costs & insurance info
- Doctor contacts

### 🧠 AI-Powered Analysis
Get personalized insights:
- Routine pattern analysis
- Habit improvement suggestions
- Progress tracking over time
- Pain trend monitoring
- Appointment reminders

### 💬 Natural Conversations
Chat naturally with your AI dentist:
- "How's my brushing routine looking?"
- "I have sensitivity in my left molar"
- "When should I visit the dentist?"
- "What toothpaste do you recommend?"

## Installation

### Prerequisites

- Openclaw installed and running ([Install Openclaw](https://openclaw.ai))
- Node.js 18+ installed
- npm or pnpm

### Quick Install

1. **Clone this repository:**
```bash
cd ~/.openclaw/workspace/skills
git clone https://github.com/yourusername/openclaw-dentist.git personal-ai-dentist
cd personal-ai-dentist
```

2. **Install dependencies:**
```bash
npm install
```

3. **Initialize database:**
```bash
npm run db:init
```

4. **Restart Openclaw** or start a new session

### Alternative: Manual Install

1. Copy the `openclaw-dentist` folder to `~/.openclaw/workspace/skills/personal-ai-dentist/`
2. Run `npm install` in that directory
3. Run `npm run db:init`
4. Restart Openclaw

## Usage

Once installed, your AI Dentist is available through any Openclaw channel:

### Getting Started

**Set up your profile:**
```
/dentist profile setup
```
The AI will ask for your name, age, current dental issues, past procedures, and dentist info.

### Daily Routine Commands

**Log today's routine:**
```
/dentist routine
```
The AI will guide you through logging your daily dental activities with an interactive conversation.

**View recent routines:**
```
/dentist routines last 7 days
/dentist routines last 30 days
```

**Get routine analysis:**
```
/dentist analyze
```

### Doctor Visit Commands

**Add a new visit:**
```
/dentist visit add
```

**List all visits:**
```
/dentist visits list
```

**View upcoming appointments:**
```
/dentist appointments
```

### AI Consultation

**Ask questions naturally:**
```
Hey dentist, how's my brushing routine this week?
```

```
I have sensitivity when drinking cold water. What should I do?
```

```
Can you remind me when my last cleaning was?
```

```
What toothpaste do you recommend for my gum issues?
```

### Profile Commands

**View your profile:**
```
/dentist profile
```

**Update profile:**
```
/dentist profile update
```

## Data Storage

All your dental data is stored **locally** in:
```
~/.openclaw/workspace/skills/personal-ai-dentist/data/dentist.db
```

- **SQLite database** with WAL mode for safety
- **No cloud storage** - your data never leaves your machine
- **Encrypted at rest** (optional, configure in settings)
- **Easy backup** - just copy the .db file

## Features

### 🎯 Smart Reminders
- Daily routine logging reminders
- Appointment notifications
- Habit improvement suggestions
- Pain tracking alerts

### 📊 Visual Analytics
- Routine consistency charts
- Habit progression over time
- Pain/symptom tracking
- Visit cost summaries

### 🔒 Privacy First
- Local database storage
- No external API calls for data storage
- End-to-end encryption option
- Complete data ownership

### 🤖 AI Capabilities
- Context-aware conversations
- Pattern recognition in routines
- Personalized recommendations
- Proactive health suggestions

## Database Schema

The skill maintains these tables:

- **users** - Your profile and preferences
- **dental_profiles** - Extended dental information (issues, procedures, allergies)
- **daily_routines** - Historical routine logs with all metrics
- **doctor_visits** - Complete visit records and documents
- **chat_history** - Conversation context for AI
- **user_memory** - Extracted important facts for personalization

## Configuration

### Environment Variables

Create a `.env` file in the skill directory:

```env
# Optional: Custom database location
DB_PATH=/custom/path/to/dentist.db

# Optional: Enable encryption
DB_ENCRYPT=true
DB_PASSWORD=your_secure_password

# Optional: Set default user
DEFAULT_USER_NAME=Your Name
```

### Customize Questions

Edit `config/questions.json` to:
- Add custom routine questions
- Modify existing questions
- Change field types or ranges

### AI System Prompt

Modify `config/system-prompt.md` to:
- Change AI personality
- Adjust communication style
- Add specialized instructions

## Integration with Openclaw Features

### Multi-Agent Support
Each Openclaw agent can have its own dental profile and data. Perfect for family use:
- Dad's dental profile
- Mom's dental profile  
- Kid's dental profiles

### Channel Integration
Access your AI Dentist from:
- **WhatsApp** - Log routines on the go
- **Telegram** - Quick check-ins
- **Discord** - Family dental tracking
- **iMessage** - Native iOS experience
- **Slack** - Workplace wellness

### Voice Commands
Use voice wake feature:
- "Hey Claw, log my dental routine"
- "Ask my dentist about my brushing habits"

### Cron Jobs
Set up automated reminders:
```
/dentist remind daily 20:00 "Log your dental routine"
/dentist remind weekly "Review your dental health"
```

## Troubleshooting

### Skill not appearing

1. Check skill location:
```bash
ls -la ~/.openclaw/workspace/skills/personal-ai-dentist/
```

2. Restart Openclaw:
```bash
openclaw restart
```

3. Check skill is loaded:
```bash
openclaw skills list
```

### Database errors

**Reset database:**
```bash
cd ~/.openclaw/workspace/skills/personal-ai-dentist
npm run db:reset
```

**Check database permissions:**
```bash
ls -la data/
```

### Missing dependencies

```bash
cd ~/.openclaw/workspace/skills/personal-ai-dentist
npm install
```

### Permission denied errors

Ensure the tools are executable:
```bash
chmod +x tools/*.js
```

## Advanced Usage

### Backup Your Data

```bash
# Create backup
cp ~/.openclaw/workspace/skills/personal-ai-dentist/data/dentist.db \
   ~/backups/dentist-backup-$(date +%Y%m%d).db

# Restore backup
cp ~/backups/dentist-backup-20240101.db \
   ~/.openclaw/workspace/skills/personal-ai-dentist/data/dentist.db
```

### Export Data

```bash
# Export to JSON (feature coming soon)
/dentist export --format=json
```

### Custom Integrations

The skill provides these internal tools:
- `tools/routine-log.js` - Log routines
- `tools/routine-view.js` - View routines
- `tools/visit-add.js` - Add visits
- `tools/visit-list.js` - List visits
- `tools/profile-view.js` - View profile
- `tools/profile-update.js` - Update profile
- `tools/analyze.js` - Analyze health
- `tools/chat.js` - Chat context

## Development

### Adding New Features

1. Add database schema in `scripts/init-db.js`
2. Add database functions in `lib/db.js`
3. Create tool script in `tools/`
4. Update `SKILL.md` with new capabilities
5. Test with Openclaw

### Testing

```bash
# Test database
npm run db:init

# Test tools
node tools/routine-view.js --days=7
```

## Roadmap

- [ ] Image upload for dental X-rays
- [ ] Export to PDF for dental records
- [ ] Integration with calendar for appointments
- [ ] Multiple user support in single database
- [ ] Dental cost tracking and insurance management
- [ ] Integration with health apps (Apple Health, Google Fit)
- [ ] Voice note recording for pain descriptions

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License - Feel free to use personally or commercially.

## Support

- Open an issue on GitHub
- Join the Openclaw Discord and ask in #skills channel
- Check Openclaw documentation: https://docs.openclaw.ai

## Credits

Built for Openclaw - the personal AI assistant framework.

---

**Start tracking your dental health today!** 🦷✨

Just message your Openclaw assistant: `/dentist routine`