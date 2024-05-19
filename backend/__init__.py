from flask import Flask
from os import environ
from dotenv import load_dotenv

from . import fact_checker

load_dotenv()

def create_app():
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    # load configuration 
    app.config.from_mapping(
        SECRET_KEY=environ.get('SECRET_KEY'),
    )

    # register the blueprint
    app.register_blueprint(fact_checker.bp)



    return app