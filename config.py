# -*- coding:utf8 -*-
import os
basedir = os.path.abspath(os.path.dirname(__file__))  #返回文件绝对路径
class Config:
    SECRET_KEY = 'qwertyuioplkjhgf'  #Flask（以及相关的扩展extension）需要进行加密用到SECRET_KEY

class default(Config):
    DEBUG = False  #是否开启debug模式
config = {
    "DefultConfigName": default
}
