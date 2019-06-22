from flask import Blueprint

homepage = Blueprint('homepage', __name__)

from . import views