#!/bin/bash

# Script to deploy the frontend to Vercel with the specific Railway backend URL

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

# Railway backend URL
RAILWAY_URL="https://chat-app-production-5549.up.railway.app"
# Convert HTTP URL to WebSocket URL
WS_URL="wss://chat-app-production-5549.up.railway.app"

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
echo "After deployment, get your Vercel domain and add it to CORS_ALLOWED_ORIGINS in chat_project/settings.py"
echo "Then redeploy your backend to Railway." 