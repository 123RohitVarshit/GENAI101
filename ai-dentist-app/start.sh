#!/bin/bash

echo "🦷 AI Dentist - Setup Script"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check for package.json
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Are you in the ai-dentist-app directory?"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo ""
    echo "⚠️  Environment file not found!"
    echo "📝 Please create .env.local file with your Moonshot AI API key:"
    echo ""
    echo "   cp .env.example .env.local"
    echo ""
    echo "   Then edit .env.local and add your API key:"
    echo "   MOONSHOT_API_KEY=your_api_key_here"
    echo ""
    echo "🔑 Get your API key from: https://platform.moonshot.cn/"
    exit 1
fi

# Check if API key is set
if grep -q "your_moonshot_api_key_here" .env.local; then
    echo ""
    echo "⚠️  Please set your MOONSHOT_API_KEY in .env.local file"
    echo "🔑 Get your API key from: https://platform.moonshot.cn/"
    exit 1
fi

# Initialize database
echo ""
echo "🗄️  Initializing database..."
npm run db:init

# Start the app
echo ""
echo "🚀 Starting AI Dentist..."
echo ""
echo "   Open http://localhost:3000 in your browser"
echo ""
npm run dev