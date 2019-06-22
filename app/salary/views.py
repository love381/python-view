# coding:utf-8
from . import salary
from flask import url_for, render_template, current_app, abort, request 
import json

@salary.route('/<salary_name>')
def index(salary_name):
	return '测试页面，请返回'