#!/bin/bash

# Script to deploy the frontend to Vercel

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

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment complete! Check the Vercel dashboard for details."