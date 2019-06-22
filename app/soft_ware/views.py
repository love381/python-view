# coding:utf-8
from flask import render_template, current_app
from . import software
from .geo_info import geo_info
import json


@software.route('/language')
def index():
    #最火爆的全国web前端前20名职位量及平均工资详情信息的获取。
    current_app.cur.execute('SELECT workspace,avg(wage),COUNT(*) from web GROUP BY workspace having count(*)>=809 ORDER BY avg(wage) DESC')
    result = current_app.cur.fetchall()
    #地点，平均工资，数量
    city   = [x[0].encode('utf-8') for x in result]
    a_vg   = [int(x[1]) for x in result]
    counts = [int(x[2]) for x in result]
    city = json.dumps(city)
    a_vg = json.dumps(a_vg)
    counts = json.dumps(counts)

    #最具人气15大编程语言下钻前数据数据的获取。
    current_app.cur.execute('select name,counts from language1 ORDER BY counts DESC ')
    result1 = current_app.cur.fetchall()
    di = [dict(name=x[0].encode('utf-8'),y=int(x[1]),drilldown=x[0].encode('utf-8'))  for x in result1]

    #15大编程语言平均工资排行数据获取。
    current_app.cur.execute('select name,sal from sal order by sal DESC') #order by对结果进行排序DESC为降序
    language_result = current_app.cur.fetchall()
    language_name = [x[0].encode('utf-8') for x in language_result]
    value = [int(x[1]) for x in language_result]
    language_name = json.dumps(language_name)
    value = json.dumps(value)

    #java(下钻)
    current_app.cur.execute('select workspace,count(*) from java group by workspace order by count(*) DESC limit 20')
    java_result = current_app.cur.fetchall()
    # print java_result
    java_result1 = [[x[0].encode('utf-8'),int(x[1])] for x in java_result]
    java_result1 = json.dumps(java_result1)
    #c++(下钻)
    current_app.cur.execute('select workspace,count(*) from cplus group by workspace order by count(*) DESC limit 20')
    c_plus_plus_result = current_app.cur.fetchall()
    c_plus_plus1 = [[x[0].encode('utf-8'),int(x[1])] for x in c_plus_plus_result]
    c_plus_plus1 = json.dumps(c_plus_plus1)
    #c
    current_app.cur.execute('select workspace,count(*) from c group by workspace order by count(*) DESC limit 20')
    c_result1 = current_app.cur.fetchall()
    c_result = [[x[0].encode('utf-8'), int(x[1])] for x in c_result1]
    c_result = json.dumps(c_result)
    # print c_plus_plus1
    #javascript下钻
    current_app.cur.execute('select workspace,count(*) from javascript group by workspace order by count(*) DESC limit 20')
    javascript_result = current_app.cur.fetchall()
    javascript_result1 = [[x[0].encode('utf-8'),int(x[1])] for x in javascript_result]
    javascript_result1 = json.dumps(javascript_result1)
    # print javascript_result1
    # #c#下钻
    current_app.cur.execute('select workspace,count(*) from c_sharp group by workspace order by count(*) DESC limit 20')
    c_sharp_result = current_app.cur.fetchall()
    c_sharp_result1 = [[x[0].encode('utf-8'),int(x[1])] for x in c_sharp_result]
    c_sharp_result1 = json.dumps(c_sharp_result1)
    # #php
    current_app.cur.execute('select workspace,count(*) from php group by workspace order by count(*) DESC limit 20')
    php_result = current_app.cur.fetchall()
    php_result1 = [[x[0].encode('utf-8'),int(x[1])] for x in php_result]
    php_result1 = json.dumps(php_result1)
    #R语言
    current_app.cur.execute('select workspace,count(*) from r group by workspace order by count(*) DESC limit 20')
    r_result1 = current_app.cur.fetchall()
    r_result = [[x[0].encode('utf-8'), int(x[1])] for x in r_result1]
    r_result = json.dumps(r_result)
    #perl
    current_app.cur.execute('select workspace,count(*) from perl group by workspace order by count(*) DESC limit 20')
    perl = current_app.cur.fetchall()
    perll = [[x[0].encode('utf-8'), int(x[1])] for x in perl]
    perll = json.dumps(perll)
    #html
    current_app.cur.execute('select workspace,count(*) from html group by workspace order by count(*) DESC limit 20')
    html_result1 = current_app.cur.fetchall()
    html_result = [[x[0].encode('utf-8'), int(x[1])] for x in html_result1]
    html_result = json.dumps(html_result)
    #python
    current_app.cur.execute('select workspace,count(*) from python group by workspace order by count(*) DESC limit 20')
    python_result1 = current_app.cur.fetchall()
    python_result = [[x[0].encode('utf-8'), int(x[1])] for x in python_result1]
    python_result = json.dumps(python_result)
    #go
    current_app.cur.execute('select workspace,count(*) from go group by workspace order by count(*) DESC limit 20')
    go_result1 = current_app.cur.fetchall()
    go_result = [[x[0].encode('utf-8'), int(x[1])] for x in go_result1]
    go_result = json.dumps(go_result)
    #ruby
    current_app.cur.execute('select workspace,count(*) from ruby group by workspace order by count(*) DESC limit 20')
    ruby_result1 = current_app.cur.fetchall()
    ruby_result = [[x[0].encode('utf-8'), int(x[1])] for x in ruby_result1]
    ruby_result = json.dumps(ruby_result)
    #swift
    current_app.cur.execute('select workspace,count(*) from swift group by workspace order by count(*) DESC limit 20')
    swift_result1 = current_app.cur.fetchall()
    swift_result = [[x[0].encode('utf-8'), int(x[1])] for x in swift_result1]
    swift_result = json.dumps(swift_result)
    #objective_c
    current_app.cur.execute('select workspace,count(*) from objective_c group by workspace order by count(*) DESC limit 20')
    objective_c_result1 = current_app.cur.fetchall()
    objective_c_result = [[x[0].encode('utf-8'), int(x[1])] for x in objective_c_result1]
    objective_c_result = json.dumps(objective_c_result)
    #visual_basic
    current_app.cur.execute('select workspace,count(*) from visual_basic group by workspace order by count(*) DESC limit 20')
    visual_basic_result1 = current_app.cur.fetchall()
    visual_basic_result = [[x[0].encode('utf-8'), int(x[1])] for x in visual_basic_result1]
    visual_basic_result = json.dumps(visual_basic_result)




    return render_template('softlanguage.html',c_result=c_result,visual_basic_result=visual_basic_result,swift_result=swift_result,ruby_result=ruby_result,go_result=go_result,objective_c_result=objective_c_result,python_result=python_result,html_result=html_result,r_result=r_result,perll=perll,php_result=php_result1,c_sharp_result1=c_sharp_result1,javascript_result1=javascript_result1,c_plus_plus1=c_plus_plus1,java_result1=java_result1,di=di,city=city,a_vg=a_vg,counts=counts,language_name=language_name,value=value)