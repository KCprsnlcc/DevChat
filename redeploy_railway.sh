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

echo "Creating a new service for the app..."
railway add --service chat-app

echo "Adding PostgreSQL database..."
railway add --database postgres || echo "PostgreSQL already exists or couldn't be added"

echo "Adding Redis database..."
railway add --database redis || echo "Redis already exists or couldn't be added"

echo "Setting environment variables..."
railway variables --set DEBUG=False --set DJANGO_SETTINGS_MODULE=chat_project.settings

echo "Deploying to Railway..."
railway up

echo "Opening the deployed app..."
railway open

echo "Deployment completed successfully!" 