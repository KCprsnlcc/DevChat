#!/bin/bash

# Script to deploy the frontend to Vercel with Railway backend connection

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Navigate to the frontend directory (in case script is run from root)
cd "$(dirname "$0")"

# Check if user is logged in to Vercel
echo "Checking Vercel login status..."
vercel whoami &> /dev/null || {
    echo "You are not logged in to Vercel. Please login:"
    vercel login
}

# Ask for Railway backend URL
echo -e "\n===== RAILWAY BACKEND CONFIGURATION ====="
read -p "Enter your Railway backend URL (e.g., https://your-app-name.up.railway.app): " RAILWAY_URL

if [ -z "$RAILWAY_URL" ]; then
    echo "Error: Railway URL is required. Please run the script again and provide a valid URL."
    exit 1
fi

# Convert HTTP URL to WebSocket URL
WS_URL=${RAILWAY_URL/https:\/\//wss:\/\/}

echo -e "\nSetting up environment variables for Vercel deployment:"
echo "REACT_APP_API_URL = $RAILWAY_URL"
echo "REACT_APP_WS_URL = $WS_URL"

# Deploy to Vercel with environment variables
echo -e "\nDeploying to Vercel..."
vercel --prod \
  -e REACT_APP_API_URL="$RAILWAY_URL" \
  -e REACT_APP_WS_URL="$WS_URL"

echo -e "\n===== DEPLOYMENT COMPLETE ====="
echo "Your frontend is now deployed to Vercel and connected to your Railway backend."
echo "If you encounter any issues, please check the VERCEL_RAILWAY_GUIDE.md file." 