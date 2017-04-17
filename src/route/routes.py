# ######################################################################################################################
# The setup logic for all application routes.
# ######################################################################################################################

from flask import Flask

import route
import route.authentication


def init_routes(flask_app: Flask) -> None:
    """
    Sets up the application routes on the Flask object by looking into each area package's __init__.py and running its
    route initialization.
    :param flask_app: The Flask application.
    """
    route.init_routes(flask_app)
    route.authentication.init_routes(flask_app)
