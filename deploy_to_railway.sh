#!/bin/bash

# Exit on error
set -e

echo "Installing Railway CLI if not already installed..."
if ! command -v railway &> /dev/null; then
    curl -fsSL https://railway.app/install.sh | sh
fi

echo "Logging into Railway..."
railway login

echo "Creating a new Railway project..."
railway init

echo "Adding environment variables..."
railway variables set SECRET_KEY="$(python -c 'import secrets; print(secrets.token_hex(32))')"
railway variables set DEBUG=False

echo "Deploying to Railway..."
railway up

echo "Opening the deployed app..."
railway open

echo "Deployment completed successfully!" 