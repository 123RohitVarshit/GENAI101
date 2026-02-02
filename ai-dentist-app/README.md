# AI Dentist - Personal Dental Assistant

A comprehensive AI-powered personal dentist application that helps users track their daily dental routines, store doctor visit records, and receive personalized dental advice through an AI chat interface powered by Kimi 2.5.

## Features

🦷 **AI-Powered Chat Interface**
- Chat with your personal AI dentist powered by Kimi 2.5
- Personalized responses based on your dental history
- Remembers everything about your dental health
- Provides tailored advice and recommendations

📊 **Daily Routine Tracking**
- Log your daily brushing habits (morning/night)
- Track flossing, mouthwash usage, and water intake
- Monitor sugary food consumption
- Record any pain or discomfort
- Get AI-powered feedback on your routine

🏥 **Doctor Visit Management**
- Store all your dental visit records
- Track procedures, diagnoses, and recommendations
- Keep doctor and clinic information
- Monitor costs and next appointments
- Upload and store documents (X-rays, reports)

👤 **Comprehensive User Profiles**
- Personal information and dental history
- Current issues and past procedures
- Allergies and medications
- Dentist contact information
- Insurance details

🧠 **Intelligent Memory System**
- AI automatically extracts important information from conversations
- Remembers your preferences and habits
- Provides contextual advice based on your history
- Learns from your daily routines

## Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (Better-sqlite3)
- **AI Model**: Kimi 2.5 (via Moonshot AI API)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Moonshot AI API key (get it from https://platform.moonshot.cn/)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd ai-dentist-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your Moonshot AI API key:
   ```
   MOONSHOT_API_KEY=your_api_key_here
   ```

4. **Initialize the database:**
   ```bash
   npm run db:init
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Getting a Moonshot AI API Key

1. Visit [Moonshot AI Platform](https://platform.moonshot.cn/)
2. Sign up for an account
3. Navigate to the API keys section
4. Create a new API key
5. Copy the key to your `.env.local` file

## Usage

### First Time Setup

1. When you first open the app, you'll be prompted to create your profile
2. Enter your basic information and dental history
3. Your profile helps the AI provide personalized advice

### Daily Routine

1. Navigate to the "Daily Routine" tab
2. Log your daily dental activities
3. Get instant AI feedback on your habits
4. Track your progress over time

### Chat with AI Dentist

1. Go to the "Chat with AI" tab
2. Ask questions about your dental health
3. The AI remembers your history and provides personalized advice
4. Share any concerns or symptoms

### Doctor Visits

1. Visit the "Doctor Visits" tab
2. Add records of your dental appointments
3. Store diagnoses, recommendations, and documents
4. Track your dental history

### Examples of What You Can Ask the AI

- "How's my brushing routine looking this week?"
- "I have sensitivity in my lower left tooth, what should I do?"
- "When should I schedule my next cleaning?"
- "What toothpaste do you recommend for my gum issues?"
- "Can you explain what my dentist said about my X-rays?"
- "I'm nervous about my upcoming root canal, any advice?"

## Architecture

### Database Schema

The app uses SQLite with the following tables:

- **users**: User profiles and basic info
- **dental_profiles**: Extended dental information
- **daily_routines**: Daily dental routine logs
- **doctor_visits**: Dental appointment records
- **chat_history**: Conversation history with AI
- **user_memory**: Important facts extracted for personalization

### AI Integration

The app integrates with Kimi 2.5 through Moonshot AI's API:

- System prompt defines the AI as a professional dental assistant
- User context (profile + history) is sent with each request
- Chat history provides conversation continuity
- AI extracts and stores important information automatically

### Personalization

The memory system:

1. Analyzes user messages for important dental information
2. Stores key facts in the user_memory table
3. Includes relevant memories in AI context
4. References personal history in responses

## Project Structure

```
ai-dentist-app/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   │   ├── chat/      # Chat endpoint
│   │   │   ├── profile/   # Profile endpoints
│   │   │   ├── routine/   # Daily routine endpoints
│   │   │   └── visit/     # Doctor visit endpoints
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Main page
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   ├── ChatInterface.tsx    # AI chat UI
│   │   ├── ProfileSetup.tsx     # User profile form
│   │   ├── RoutineTracker.tsx   # Daily routine form
│   │   └── VisitTracker.tsx     # Doctor visits UI
│   ├── lib/
│   │   ├── db.ts          # Database operations
│   │   └── kimi.ts        # Kimi AI integration
│   └── types/
│       └── index.ts       # TypeScript types
├── db/                    # SQLite database
├── scripts/
│   └── init-db.js         # Database initialization
├── package.json
├── tsconfig.json
└── README.md
```

## Customization

### Modifying AI Behavior

Edit `src/lib/kimi.ts` to customize:
- System prompt
- Response temperature
- Max tokens
- Analysis logic

### Adding New Questions

Modify the routine tracker in `src/components/RoutineTracker.tsx` to add:
- New input fields
- Additional tracking metrics
- Custom questions

### Styling

Tailwind CSS is used throughout. Customize colors in:
- `tailwind.config.js` - Color themes
- Component files - Individual styles

## Data Privacy

- All data is stored locally in SQLite database
- No data is sent to external servers except AI chat queries
- User data is isolated per user ID
- Consider backing up the `db/dentist.db` file

## Future Enhancements

- [ ] Photo upload for dental images
- [ ] Push notifications for reminders
- [ ] Dental appointment scheduling
- [ ] Progress reports and analytics
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] Data export functionality

## Troubleshooting

### Database Issues

If you encounter database errors:
```bash
rm -rf db/dentist.db
npm run db:init
```

### API Key Issues

If AI responses fail:
1. Check your API key in `.env.local`
2. Verify the key is valid on Moonshot AI platform
3. Check API usage limits

### Port Already in Use

If port 3000 is busy:
```bash
npm run dev -- --port 3001
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For questions or issues:
1. Check the troubleshooting section
2. Open an issue on GitHub
3. Contact the maintainers

---

Built with ❤️ and 🤖 using Next.js, Kimi 2.5, and OpenCode