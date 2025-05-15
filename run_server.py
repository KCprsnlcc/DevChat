#!/usr/bin/env python
import os
import sys
import subprocess
from django.core.management import execute_from_command_line

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chat_project.settings")
    
    # Install daphne if not already installed
    try:
        import daphne
    except ImportError:
        print("Installing daphne...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "daphne"])
    
    # Run the server with daphne
    from daphne.cli import CommandLineInterface
    
    sys.argv = ["daphne", "chat_project.asgi:application"]
    CommandLineInterface.entrypoint() 