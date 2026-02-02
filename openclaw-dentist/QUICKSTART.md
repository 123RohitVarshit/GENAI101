# 🦷 Personal AI Dentist - Quick Start

Get your AI Dentist running in 5 minutes!

## Prerequisites

- [Openclaw](https://openclaw.ai) installed and running
- Node.js 18+ installed

## Install (3 Steps)

### 1. Copy to Openclaw Skills

```bash
# Navigate to the skill directory
cd openclaw-dentist

# Or if you cloned it:
cd /path/to/openclaw-dentist

# Run the installer
./install.sh
```

### 2. Copy to Openclaw Workspace

```bash
mkdir -p ~/.openclaw/workspace/skills/personal-ai-dentist
cp -r * ~/.openclaw/workspace/skills/personal-ai-dentist/
```

### 3. Restart Openclaw

```bash
openclaw restart
```

Or start a new session in your Openclaw interface.

## First Use

### 1. Set Up Your Profile

Send to Openclaw:
```
/dentist profile setup
```

The AI will ask about:
- Your name and basic info
- Current dental issues
- Past procedures
- Allergies and medications
- Your dentist's information

### 2. Log Your First Routine

```
/dentist routine
```

Answer the interactive questions about today's dental care.

### 3. Chat With Your AI Dentist

```
Hey dentist, how's my dental health?
```

Or ask specific questions:
```
What should I do about tooth sensitivity?
When was my last dentist visit?
How can I improve my flossing habits?
```

## Common Commands

### Daily Routines
```
/dentist routine              # Log today's routine
/dentist routines last 7      # View last 7 days
/dentist analyze              # Get health analysis
```

### Doctor Visits
```
/dentist visit add            # Add new visit
/dentist visits list          # List all visits
```

### Profile
```
/dentist profile              # View profile
/dentist profile update       # Update profile
```

## Available on All Channels

Once installed, use your AI Dentist via:
- WhatsApp
- Telegram
- Discord
- iMessage
- Slack
- Google Chat
- WebChat

## Data Location

Your data is stored locally at:
```
~/.openclaw/workspace/skills/personal-ai-dentist/data/dentist.db
```

**Private**: Never leaves your machine!

## Need Help?

1. Check full docs: [README.md](README.md)
2. Open an issue on GitHub
3. Join Openclaw Discord: https://discord.gg/clawd

---

**Ready to track your dental health?** 🦷

Just send: `/dentist routine`