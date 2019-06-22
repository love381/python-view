# *-* coding: utf-8 *-*
from . import jobs
from flask import url_for, render_template, current_app, abort, request
import json

@jobs.route('/<type>')
def index(type):
    # print type
    if '000' not in type:
        ans = type.split('_')
        type = ans[1]
        location_name = ans[0]
        # print location_name,type
        #查广州
        current_app.cur.execute('select one,count(*) from totals where type=%s AND location=%s group by one order by count(*) DESC',(type,location_name))
        city_result = current_app.cur.fetchall()
        #某行业下的one，pie图
        # print city_result
        city_pie = [ [x[0].encode('utf-8'),int(x[1])] for x in city_result]
        city_pie = json.dumps(city_pie)
        #在某城市下的公司规模
        current_app.cur.execute('select size,count(*) from totals where type=%s AND location=%s group by size order by count(*) DESC',(type,location_name))
        size_result = current_app.cur.fetchall()
        companysize = [[a[0].encode('utf-8'), int(a[1])] for a in size_result]
        companysize = json.dumps(companysize)

        # 查全国
        current_app.cur.execute('select location,count(*) from totals  where type=%s group by location order by count(*) DESC limit 30',(type,))
        datas = current_app.cur.fetchall()
        data = [int(a[1]) for a in datas]
        city = [b[0].encode('utf-8') for b in datas]
        data = json.dumps(data)
        typename = json.dumps(type)
        city = json.dumps(city)
        #公司规模
        current_app.cur.execute(
            'select size,count(*) from totals  where type=%s group by size order by count(*) DESC limit 30',
            (type,))
        results = current_app.cur.fetchall()
        result = [[a[0].encode('utf-8'), int(a[1])] for a in results]
        result = json.dumps(result)
        location_name = json.dumps(location_name)
        return render_template('jobs.html',companysize=companysize,location_name=location_name,city_pie=city_pie,data=data, city=city,typename=typename, result=result)
    if '000' in type:
        # print "in"
        #深圳-3000-5000
        sum=0
        x = type.split('-')#x[0]=1000,x[1]=3000
        city_name = x[0] #城市的名字，如：深圳，广州，北京...
        # print city_name
        s1 = str(x[1])   #工资的左  3000
        s2 = str(x[2])   #工资的右  5000

        s1 = int(s1)
        s2 = int(s2)
        # print s1,s2,city_name
        #
        current_app.cur.execute('select type,count(*) from totals where location=%s AND  (salary BETWEEN %s AND %s) group by type order by count(*) DESC'
                                ,(city_name,int(s1),int(s2)))
        sal_result = current_app.cur.fetchall()
        # print sal_result
        typename = json.dumps(str(s1)+'-'+str(s2)) #3000-5000

        jobcount = [int(key[1]) for key in sal_result]
        jobtype = [key[0].encode('utf-8') for key in sal_result]
        for x in jobcount:
            sum+=x
        jobcount = json.dumps(jobcount)
        jobtype = json.dumps(jobtype)

        # 半环形图需要的数据，[['a',1],['b',2],['c',3]...]
        banhuan = current_app.cur.execute('select size,count(*) from totals where location=%s AND (salary BETWEEN %s AND %s) group by size order by count(*) DESC',(city_name,int(s1),int(s2)))
        banhuan = current_app.cur.fetchall()  # 获取查询结果
        # print banhuan
        banhuan = json.dumps(banhuan)

        #didian
        current_app.cur.execute(
            'select location,count(*) from totals where location=%s AND (salary BETWEEN %s AND %s) group by location order by count(*) DESC limit 30',(city_name,int(s1),int(s2)))
        didian_result = current_app.cur.fetchall()
        # print didian_result
        didian_count = [int(key[1]) for key in didian_result]
        didian_name = [key[0].encode('utf-8') for key in didian_result]
        didian_count = json.dumps(didian_count)
        didian_name = json.dumps(didian_name)
        city_name = json.dumps(city_name)

        return render_template('salary_jobtype.html',sum=sum,city_name=city_name,didian_name=didian_name,didian_count=didian_count,type=type, jobtype=jobtype, jobcount=jobcount,typename=typename,banhuan=banhuan)


