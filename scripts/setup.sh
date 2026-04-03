#!/bin/bash
# Interventional Spine Trainer - First-time setup

set -e

echo "========================================="
echo "  Interventional Spine Trainer Setup"
echo "========================================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed."
    echo "Please install it from: https://nodejs.org"
    echo "(Download the LTS version)"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "Found Node.js $NODE_VERSION"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

# Initialize database
echo ""
echo "Setting up database..."
mkdir -p data
npx drizzle-kit push

echo ""
echo "========================================="
echo "  Setup complete!"
echo ""
echo "  To start the app, run:"
echo "    npm run dev"
echo ""
echo "  Then open http://localhost:3000"
echo "========================================="
