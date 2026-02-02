#!/bin/bash

# Openclaw AI Dentist - Quick Setup Script

set -e

echo "🦷 Personal AI Dentist - Openclaw Skill Setup"
echo "=============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running in correct directory
if [ ! -f "SKILL.md" ]; then
    echo -e "${RED}Error: Please run this script from the openclaw-dentist directory${NC}"
    exit 1
fi

# Check for Node.js
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ required. Current: $(node --version)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm found: $(npm --version)${NC}"

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🗄️  Initializing database..."
npm run db:init

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "📁 Skill location:"
echo "   $(pwd)"
echo ""
echo "🚀 Next steps:"
echo ""
echo "   1. Copy this skill to your Openclaw workspace:"
echo "      mkdir -p ~/.openclaw/workspace/skills/personal-ai-dentist"
echo "      cp -r * ~/.openclaw/workspace/skills/personal-ai-dentist/"
echo ""
echo "   2. Restart Openclaw or start a new session"
echo ""
echo "   3. Start using your AI Dentist:"
echo "      /dentist profile setup"
echo ""
echo "📚 Documentation:"
echo "   - README.md for full documentation"
echo "   - SKILL.md for Openclaw skill reference"
echo ""
echo -e "${YELLOW}🦷 Happy dental tracking!${NC}"