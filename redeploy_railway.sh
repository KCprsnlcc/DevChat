#!/bin/bash

# Exit on error
set -e

echo "Installing Railway CLI if not already installed..."
if ! command -v railway &> /dev/null; then
    curl -fsSL https://railway.app/install.sh | sh
fi

echo "Logging into Railway..."
railway login --browserless

echo "Linking to existing project..."
railway link

echo "Ensuring PostgreSQL and Redis variables are set correctly..."
# Get the existing variables
POSTGRES_URL=$(railway variables get DATABASE_URL 2>/dev/null || echo "")
REDIS_URL=$(railway variables get REDIS_URL 2>/dev/null || echo "")

# Set variables if they exist
if [ ! -z "$POSTGRES_URL" ]; then
    echo "Setting DATABASE_URL..."
    railway variables set DATABASE_URL=$POSTGRES_URL
fi

if [ ! -z "$REDIS_URL" ]; then
    echo "Setting REDIS_URL..."
    railway variables set REDIS_URL=$REDIS_URL
fi

# Set other necessary variables
echo "Setting other necessary variables..."
railway variables set DEBUG=False DJANGO_SETTINGS_MODULE=chat_project.settings

echo "Deploying to Railway..."
railway up

echo "Opening the deployed app..."
railway open

echo "Deployment completed successfully!" 