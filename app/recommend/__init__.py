from flask import Blueprint

recommend = Blueprint('recommend', __name__)
from . import views