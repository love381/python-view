# -*- coding:utf8 -*-
from . import city
from flask import render_template, current_app, abort, request, url_for,flash
import json
#使用同一个视图函数来显示不同的城市信息。<>内需要起一个动态变量的名字
@city.route('/<city>')
def index(city): #<>尖括号内起的名字return不能直接使用，需要再函数括号中定义一遍
	current_app.cur.execute('select type,count(*) from totals WHERE location=%s group by type order by count(*) desc limit 30',(city,))
	datas = current_app.cur.fetchall()
	#职位总览
	flash(u"您当前浏览的城市是："+city)
	data = [[a[0].encode('utf-8'),int(a[1]) ]for a in datas]
	data = json.dumps(data)
	cityname = json.dumps(city)

	#需求量排名靠前的城市所需要的数据
	current_app.cur.execute('select one,count(*) from totals WHERE location=%s group by one order by count(*) desc limit 30', (city,))
	JC_result = current_app.cur.fetchall() #返回列表形式[]，[()]，没有数据的时候会抛出异常
	JC_jobname = [a[0].encode('utf-8') for a in JC_result]
	JC_count = [int(a[1]) for a in JC_result]
	JC_count = json.dumps(JC_count)
	JC_jobname = json.dumps(JC_jobname)
	
	#工资所需数据
	current_app.cur.execute('select salary,count(*) from totals where location=%s group by salary order by count(*) DESC limit 100',(city,))
	result = current_app.cur.fetchall()  #返回列表形式[]，[()]，没有数据的时候会抛出异常
	sal_data = [[a[0].encode('utf-8'), int(a[1])] for a in result]
	# print sal_data
	sum1=0;sum2=0;sum3=0;sum4=0;sum5=0;sum6=0;sum7=0;sum8=0;sum9=0;sum10=0;sum11=0;sum12=0;
	for x in sal_data:
	    y = int(x[0])
	    # print y
	    if 1000 <= y <= 3000:
	        x[0]="1000-3000"
	        sum1 += x[1]
	    elif 3000 <= y <= 5000:
	        x[0]="3000-5000"
	        sum2 += x[1]
	    elif 5000 <= y <= 7000:
	        x[0]="5000-7000"
	        sum3 += x[1]
	    elif 6000 <= y <= 8000:
	        x[0]="6000-8000"
	        sum4 += x[1]
	    elif 8000 <= y <= 10000:
	        x[0]="8000-10000"
	        sum5 += x[1]
	    elif 10000 <= y <= 13000:
	        x[0]="10000-13000"
	        sum6 += x[1]
	    elif 13000 <= y <= 15000:
	        x[0]="13000-15000"
	        sum7 += x[1]
	    elif 15000 <= y <= 20000:
	        x[0]="15000-20000"
	        sum8 += x[1]
	    elif 20000 <= y <= 25000:
	        x[0]="20000-25000"
	        sum9 += x[1]
	    elif 25000 <= y <= 30000:
	        x[0]="25000-30000"
	        sum10 += x[1]
	    elif 30000 <= y <=50000:
	        x[0]="30000-50000"
	        sum11 += x[1]
	    elif 50000 <= y <=100000:
	        x[0]="50000-100000"
	        sum12 += x[1]

	       
	sal_data1 = [["1000-3000",sum1],["3000-5000",sum2],["5000-7000",sum3],["6000-8000",sum4],["8000-10000",sum5],["10000-13000",sum6],["13000-15000",sum7],["15000-20000",sum8],["20000-25000",sum9],["25000-30000",sum10],["30000-50000",sum11],["50000-100000",sum12]]

	sal_data=[]
	for index,x in enumerate(sal_data1):    #删除值为0的数据，不做分析
         if x[1]!=0:
             sal_data.append(x);

	sal_data = json.dumps(sal_data)
	# print sal_data
	
	#公司规模
	jobsize = current_app.cur.execute('select size,count(*) from totals where location=%s group by size order by count(*) DESC',(city,))
	jobsize = current_app.cur.fetchall() #返回列表形式[]，[()]，没有数据的时候会抛出异常
	jobsize = json.dumps(jobsize)
	return render_template("city.html",city=city,cityname=cityname,data=data,JC_jobname=JC_jobname,JC_count=JC_count,sal_data=sal_data,jobsize=jobsize)