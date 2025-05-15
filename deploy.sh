#!/bin/bash

# Script to deploy both backend and frontend

echo "=== Starting deployment process ==="

# Deploy backend to Railway
echo "Deploying backend to Railway..."
if [ -f "./deploy_to_railway.sh" ]; then
    bash ./deploy_to_railway.sh
else
    echo "Railway deployment script not found. Skipping backend deployment."
fi

# Deploy frontend to Vercel
echo "Deploying frontend to Vercel..."
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
echo "Checking Vercel login status..."
vercel whoami &> /dev/null || {
    echo "You are not logged in to Vercel. Please login:"
    vercel login
}

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "=== Deployment complete! ==="
echo "Backend URL: https://chat-app-production-5549.up.railway.app"
echo "Frontend URL: https://dev-chat-kappa.vercel.app" 