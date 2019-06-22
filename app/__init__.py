# *-* coding:utf-8 *-*
from flask import Flask
from config import config
from flask_bootstrap import Bootstrap
# 工厂函数
'''__init__.py 改变创建app实例的方式,不之间创建app,而是通过create_app函数里面创建,
再返回app对象,这样的好处就是调用的时候才创建,想创建多少就调用多少,而且每次调用都能应用不同的配置参数,
这里面这个create_app()就是应用的工厂方法!在工厂方法里面我们分别加载了配置扩展和蓝图!
Flask的蓝图功能,我们刚才工厂函数里面已经注册了蓝图了,我们要用蓝图对象路由'''
def create_app(ConfigName='DefultConfigName'):
	app = Flask(__name__)
	bootstrap = Bootstrap(app)
	app.config.from_object(config[ConfigName])
	#定义一个蓝图并将该蓝图注册到app中
	from .homepage import homepage
	app.register_blueprint(homepage)
	
	from .city import city
	app.register_blueprint(city, url_prefix='/city')#蓝本挂载，'/city/<other>'
	
	from .jobs import jobs
	app.register_blueprint(jobs, url_prefix='/type')
	
	from .salary import salary
	app.register_blueprint(salary, url_prefix='/salary')
	
	from .soft_ware import software
	app.register_blueprint(software, url_prefix='/software')
	
	from .recommend import recommend
	app.register_blueprint(recommend, url_prefix='/recommend')

	from .ranking_list import ranking
	app.register_blueprint(ranking, url_prefix='/rank')
	
	return app
