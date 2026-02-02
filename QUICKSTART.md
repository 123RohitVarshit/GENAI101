# 🦷 AI Dentist - Quick Start Guide

## Setup in 5 Minutes

### 1. Get API Key (2 minutes)
1. Go to https://platform.moonshot.cn/
2. Sign up/login with your account
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy the key (starts with `sk-`)

### 2. Configure Environment (1 minute)
```bash
cd ai-dentist-app
cp .env.example .env.local
```

Edit `.env.local` and replace:
```
MOONSHOT_API_KEY=your_moonshot_api_key_here
```

With your actual key:
```
MOONSHOT_API_KEY=sk-your-actual-key-here
```

### 3. Install & Run (2 minutes)
```bash
# Install dependencies
npm install

# Initialize database
npm run db:init

# Start the app
npm run dev
```

### 4. Access the App
Open your browser and go to: **http://localhost:3000**

## First Use

1. **Create Your Profile** - Enter your name, age, and dental history
2. **Log Today's Routine** - Record your brushing, flossing, etc.
3. **Chat with AI** - Ask questions, get personalized advice

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Initialize/reset database
npm run db:init

# Run setup script
./start.sh
```

## Project Files Overview

```
ai-dentist-app/
├── src/app/           # Next.js pages & API
├── src/components/    # React components (Chat, Forms)
├── src/lib/           # Database & Kimi AI integration
├── db/                # SQLite database
├── package.json       # Dependencies
└── README.md          # Full documentation
```

## Features Included

✅ AI Chat with Kimi 2.5  
✅ Daily Dental Routine Tracking  
✅ Doctor Visit Records  
✅ Personal Profile & History  
✅ Smart Memory System  
✅ Local Data Storage  
✅ Responsive Design  

## Troubleshooting

**Port 3000 busy?**
```bash
npm run dev -- --port 3001
```

**Database errors?**
```bash
rm db/dentist.db && npm run db:init
```

**API not working?**
- Check your API key in `.env.local`
- Verify key at https://platform.moonshot.cn/

## Need Help?

See full documentation in `ai-dentist-app/README.md`

Happy dental tracking! 🦷✨