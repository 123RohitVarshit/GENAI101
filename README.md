# 🦷 Personal AI Dentist

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Openclaw](https://img.shields.io/badge/Built%20for-Openclaw-blue)](https://openclaw.ai)

> Your personal AI dental assistant that tracks daily routines, manages doctor visits, and provides truly personalized dental health advice. Built with Openclaw and Kimi 2.5.

## 🚀 Two Ways to Use

This repository contains **two implementations** of the Personal AI Dentist:

### Option 1: Openclaw Skill (Recommended) 🦞
**Run as a skill within Openclaw** - Your AI assistant that lives on your machine and integrates with WhatsApp, Telegram, Discord, iMessage, and more.

**Best for:** Users who want a truly personal AI assistant available 24/7 on their messaging platforms.

```bash
cd openclaw-dentist
./install.sh
```

[📖 Openclaw Skill Docs](./openclaw-dentist/README.md)

### Option 2: Standalone Web App 💻
**Run as a standalone Next.js web application** - A complete web-based dental tracking system with built-in AI chat.

**Best for:** Users who want a web-based interface or want to customize the UI.

```bash
cd ai-dentist-app
npm install
npm run dev
```

[📖 Web App Docs](./ai-dentist-app/README.md)

---

## ✨ Features

### 📝 Daily Dental Routine Tracking
- Log morning & night brushing habits
- Track flossing, mouthwash usage
- Monitor water intake and sugary foods
- Record pain, sensitivity, and discomfort
- Get AI-powered feedback on your routine

### 🏥 Doctor Visit Management
- Store dental appointment records
- Track procedures, diagnoses, recommendations
- Keep doctor and clinic information
- Monitor costs and next appointments
- Upload documents (X-rays, reports)

### 🧠 AI-Powered Personalization
- **Truly personal** - remembers everything about your dental health
- Context-aware conversations
- Pattern analysis and insights
- Proactive health suggestions
- Natural language chat interface

### 🔒 Privacy First
- Local SQLite database storage
- Data never leaves your machine (Openclaw skill)
- Complete data ownership
- Easy backup and export

---

## 📦 Repository Structure

```
.
├── openclaw-dentist/          # ⭐ Recommended: Openclaw skill
│   ├── SKILL.md               # Skill definition for Openclaw
│   ├── README.md              # Detailed documentation
│   ├── QUICKSTART.md          # 5-minute setup guide
│   ├── install.sh             # Automated installer
│   ├── tools/                 # CLI tools for dental tracking
│   ├── lib/                   # Database operations
│   ├── config/                # Configuration files
│   └── data/                  # SQLite database (local storage)
│
├── ai-dentist-app/            # Standalone Next.js web app
│   ├── README.md              # Web app documentation
│   ├── src/                   # Next.js source code
│   │   ├── app/               # API routes and pages
│   │   ├── components/        # React components
│   │   └── lib/               # Database & Kimi AI integration
│   └── package.json           # Dependencies
│
├── index.html                 # Demo landing page
└── README.md                  # This file
```

---

## 🦞 Quick Start: Openclaw Skill

### Prerequisites
- [Openclaw](https://openclaw.ai) installed
- Node.js 18+

### Install in 3 Steps

```bash
# 1. Clone this repository
git clone https://github.com/yourusername/personal-ai-dentist.git
cd personal-ai-dentist/openclaw-dentist

# 2. Run the installer
./install.sh

# 3. Copy to Openclaw and restart
mkdir -p ~/.openclaw/workspace/skills/personal-ai-dentist
cp -r * ~/.openclaw/workspace/skills/personal-ai-dentist/
openclaw restart
```

### Start Using

Once installed, chat with your AI Dentist through any Openclaw channel:

```
/dentist routine              # Log today's dental routine
/dentist routines last 7      # View last 7 days
/dentist visit add            # Add doctor visit
/dentist analyze              # Get health analysis
```

Or chat naturally:
```
"How's my brushing routine looking?"
"I have sensitivity in my molar"
"When should I visit the dentist?"
```

**Full Guide:** [openclaw-dentist/README.md](./openclaw-dentist/README.md)

---

## 💻 Quick Start: Web App

### Prerequisites
- Node.js 18+
- Moonshot AI API key (get from https://platform.moonshot.cn/)

### Install in 3 Steps

```bash
# 1. Clone and navigate
git clone https://github.com/yourusername/personal-ai-dentist.git
cd personal-ai-dentist/ai-dentist-app

# 2. Install dependencies and setup
npm install
cp .env.example .env.local
# Edit .env.local and add your MOONSHOT_API_KEY

# 3. Initialize database and run
npm run db:init
npm run dev
```

Open http://localhost:3000

**Full Guide:** [ai-dentist-app/README.md](./ai-dentist-app/README.md)

---

## 🤔 Which One Should I Choose?

### Choose Openclaw Skill if:
- ✅ You want 24/7 availability via messaging apps
- ✅ You prefer conversational interfaces
- ✅ You want voice command support
- ✅ You want automatic reminders and proactive suggestions
- ✅ You already use or want to try Openclaw

### Choose Web App if:
- ✅ You prefer a visual web interface
- ✅ You want to customize the UI/UX
- ✅ You want to deploy as a web service
- ✅ You don't need messaging integration

---

## 🛠️ Tech Stack

**Openclaw Skill:**
- Openclaw (AI assistant framework)
- Node.js + SQLite (better-sqlite3)
- Kimi 2.5 via Moonshot AI API

**Web App:**
- Next.js 14 + React + TypeScript
- Tailwind CSS
- SQLite (better-sqlite3)
- Kimi 2.5 via Moonshot AI API

---

## 📊 Database Schema

Both implementations use the same SQLite schema:

- **users** - Profile and preferences
- **dental_profiles** - Extended dental information
- **daily_routines** - Historical routine logs
- **doctor_visits** - Visit records
- **chat_history** - Conversation history
- **user_memory** - Important facts for personalization

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Ways to Contribute:
- 🐛 Report bugs
- 💡 Suggest new features
- 📚 Improve documentation
- 🔧 Add new integrations
- 🧪 Write tests

---

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

See [LICENSE](./openclaw-dentist/LICENSE) for details.

---

## 🙏 Acknowledgments

- Built for [Openclaw](https://openclaw.ai) - The personal AI assistant
- Powered by [Kimi 2.5](https://www.moonshot.cn/) - Moonshot AI's powerful model
- Inspired by the need for truly personal healthcare tracking

---

## 📞 Support

- **Open an issue** on GitHub
- **Openclaw Discord:** https://discord.gg/clawd
- **Documentation:** See individual README files in each project folder

---

## 🦷 Ready to Start?

**Choose your path:**

```bash
# Openclaw Skill (Recommended)
cd openclaw-dentist && ./install.sh

# OR Web App
cd ai-dentist-app && npm install && npm run dev
```

**Start tracking your dental health today!** 🦷✨