# app/__init__.py

from flask import Flask
import sqlite3
import os

# Initialize the Flask app
def create_app():
    app = Flask(__name__)

    # Database setup: You can also set a config variable for database path if needed
    app.config['DATABASE'] = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'trading_journal.db')

    # Initialize routes
    from . import routes  # This will import the routes defined in `routes.py` (explained below)
    
    # Register blueprints or other app configuration here if needed
    app.register_blueprint(routes.bp)  # Register the blueprint if you use it

    return app
