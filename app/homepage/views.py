# *-* coding: utf-8 *-*
from . import homepage
from flask import url_for, render_template, current_app, abort, redirect, request,app
import MySQLdb as mysql
import json
from ..soft_ware.geo_info import geo_info

@homepage.route('/')
def index():
    current_app.cur.execute('select location,count(*) from totals group by location order by count(*) desc')
    result = current_app.cur.fetchall()
    #地图数据
    data = [dict(name=x[0].encode('utf-8'), value=int(x[1])) for x in result]
    data = json.dumps(data)
    geoMap = json.dumps(geo_info)#地图上地区的位置信息
    #需求分布数据
    current_app.cur.execute(
        'select location,count(*) from totals group by location order by count(*) desc limit 30')
    datas = current_app.cur.fetchall()
    data1 = [int(a[1]) for a in datas]
    city = [b[0].encode('utf-8') for b in datas]
    # print data1
    data1 = json.dumps(data1)
    city = json.dumps(city)
    #全球各工资段职位需求
    current_app.cur.execute('select salary,count(*) from totals group by salary order by count(*) DESC')
    sal_result = current_app.cur.fetchall()
    result_sal = [[a[0].encode('utf-8'), int(a[1])] for a in sal_result]
    sum1 = 0
    sum2 = 0
    sum3 = 0
    sum4 = 0
    sum5 = 0
    sum6 = 0
    sum7 = 0
    sum8 = 0
    sum9 = 0
    sum10 = 0
    sum11 = 0
    sum12 = 0
    for x in result_sal:
        y = int(x[0])
        if 1000 <= y <= 3000:
            x[0] = "1000-3000"
            sum1 += x[1]
        elif 3000 <= y <= 5000:
            x[0] = "3000-5000"
            sum2 += x[1]
        elif 5000 <= y <= 7000:
            x[0] = "5000-7000"
            sum3 += x[1]
        elif 6000 <= y <= 8000:
            x[0] = "6000-8000"
            sum4 += x[1]
        elif 8000 <= y <= 10000:
            x[0] = "8000-10000"
            sum5 += x[1]
        elif 10000 <= y <= 13000:
            x[0] = "10000-13000"
            sum6 += x[1]
        elif 13000 <= y <= 15000:
            x[0] = "13000-15000"
            sum7 += x[1]
        elif 15000 <= y <= 20000:
            x[0] = "15000-20000"
            sum8 += x[1]
        elif 20000 <= y <= 25000:
            x[0] = "20000-25000"
            sum9 += x[1]
        elif 25000 <= y <= 30000:
            x[0] = "25000-30000"
            sum10 += x[1]
        elif 30000 <= y <= 50000:
            x[0] = "30000-50000"
            sum11 += x[1]
        elif 50000 <= y <= 100000:
            x[0] = "50000-100000"
            sum12 += x[1]

    sal_data1 = [["1000-3000", sum1], ["3000-5000", sum2], ["5000-7000", sum3], ["6000-8000", sum4],
                 ["8000-10000", sum5], ["10000-13000", sum6], ["13000-15000", sum7], ["15000-20000", sum8],
                 ["20000-25000", sum9], ["25000-30000", sum10], ["30000-50000", sum11], ["50000-100000", sum12]]

    sal_data = []
    for index, x in enumerate(sal_data1):  # 删除值为0的数据，不做分析
        if x[1] != 0:
            sal_data.append(x);
    # sal_data = json.dumps(sal_data)
    sal_x = []
    sal_y = []
    for x in sal_data:
        sal_x.append(x[0])
        sal_y.append(x[1])
    sal_x = json.dumps(sal_x)
    sal_y = json.dumps(sal_y)

    #全国pie图
    pie = current_app.cur.execute('select type,count(*) from totals GROUP BY type order BY count(*) DESC limit 10')
    getpie = current_app.cur.fetchall()
    getpie1 = [[x[0].encode('utf-8'),int(x[1])] for x in getpie]
    getpie1 = json.dumps(getpie1)

    return render_template('homepage.html',data=data,geoCoordMap=geoMap,data1=data1,city=city,sal_x=sal_x,sal_y=sal_y,getpie1=getpie1)

#在第一个请求之前连接数据库
@homepage.before_app_first_request
def mysql_connect():
    current_app.conn = mysql.connect(host='127.0.0.1', user='root', passwd='123456', charset='utf8', db='scrapy_for_match')  #连接mysql的方法
    current_app.cur = current_app.conn.cursor()  #所有的查询，都在连接con的一个模块cursor上面运行的
#在每次app发起请求前检测数据库连接是否正常，不正常的话重新连接mysql数据库
@homepage.before_app_request
def tell_mysql():
    try:
        current_app.conn.ping()
    except:
        current_app.conn = mysql.connect(host='127.0.0.1', user='root', passwd='123456', charset='utf8', db='scrapy_for_match')
        current_app.cur = current_app.conn.cursor()

