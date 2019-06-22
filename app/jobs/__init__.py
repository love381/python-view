# *-* coding:utf-8 *-*

from flask import Blueprint

jobs = Blueprint('jobs', __name__)
from . import views