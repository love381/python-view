# *-* coding:utf-8 *-*
from flask import Blueprint

software = Blueprint('soft_ware', __name__)

from . import views
