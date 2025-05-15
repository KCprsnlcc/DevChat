#!/bin/bash

# Activate virtual environment if it exists
if [ -d ".venv" ]; then
    source .venv/bin/activate
fi

# Install requirements
pip install pip --upgrade


# Run the server with daphne
daphne -b 0.0.0.0 -p 8000 chat_project.asgi:application 