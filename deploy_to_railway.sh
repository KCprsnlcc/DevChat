#!/bin/bash

# Exit on error
set -e

echo "Installing Railway CLI if not already installed..."
if ! command -v railway &> /dev/null; then
    curl -fsSL https://railway.app/install.sh | sh
fi

echo "Logging into Railway..."
railway login --browserless

echo "Creating a new Railway project..."
railway init

echo "Creating a new service..."
railway service create

echo "Adding PostgreSQL service..."
railway add --plugin postgresql

echo "Adding Redis service..."
railway add --plugin redis

echo "Linking the project..."
railway link

echo "Linking the service..."
railway service

echo "Adding environment variables..."
SECRET_KEY=$(python -c 'import secrets; print(secrets.token_hex(32))')
railway variables set SECRET_KEY=$SECRET_KEY DEBUG=False DJANGO_SETTINGS_MODULE=chat_project.settings

# Connect PostgreSQL and Redis
echo "Connecting PostgreSQL and Redis services..."
POSTGRES_URL=$(railway variables get DATABASE_URL)
REDIS_URL=$(railway variables get REDIS_URL)
railway variables set DATABASE_URL=$POSTGRES_URL REDIS_URL=$REDIS_URL

echo "Deploying to Railway..."
railway up

echo "Opening the deployed app..."
railway open

echo "Deployment completed successfully!" 