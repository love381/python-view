# -*- coding:utf8 -*-
from . import recommend
from flask import render_template, current_app, abort, request, jsonify
import json
#flask框架中render_template()模块的使用
@recommend.route('/',methods=["GET","POST"]) #改变http请求方式获取资源和创建新资源
def index():
    #选择行业类型数据。
    current_app.cur.execute('SELECT type from data GROUP BY type ')
    results = current_app.cur.fetchall() #此函数返回多个元组
    result = [a[0] for a in results]
    #搜索页面四列的数据。
    current_app.cur.execute('select name,salary,location,size,url from data limit 40') #前40行
    datas = current_app.cur.fetchall()
    data = [a for a in datas]
    return render_template("recommend.html",result=result, data=data)  #对先引入.html，同时根据后面传入的参数对html进行修改渲染。
@recommend.route('/select',methods=["GET","POST"])
def select():
    #选择职业类型数据。
    type = request.args.get('type')
    current_app.cur.execute('SELECT one from data WHERE type=%s GROUP BY one ', (type,))
    datas = current_app.cur.fetchall()
    data = [a[0] for a in datas]
    return jsonify(data)  #jsonify的作用，就是把字典转成json字符串。
@recommend.route('/detail',methods=["GET","POST"])
def detail():
    if request.method == "POST":
        type = request.form.get('type') #获取post请求的参数
        one = request.form.get('one')
        key = request.form.get('key')
        #print type, one ,key
        if type!='empty' and one!='empty' and key != 'empty':
            current_app.cur.execute('SELECT name,salary,location,size,url FROM (SELECT * FROM data WHERE type=%s and one=%s) data WHERE NAME like %s LIMIT 40',
                                    (type,one,'%'+key+'%',))
            datas = current_app.cur.fetchall()
            data = [a for a in datas]
            return jsonify(data)
        elif type!='empty'and one=='empty' and key != 'empty':
            current_app.cur.execute(
                'SELECT name,salary,location,size,url FROM (SELECT * FROM data WHERE type=%s ) data WHERE NAME like %s LIMIT 40',
                (type, '%' + key + '%',))
            datas = current_app.cur.fetchall()
            data = [a for a in datas]
            return jsonify(data)
        elif type!='empty'and one=='empty' and key == 'empty':
            current_app.cur.execute(
                'SELECT name,salary,location,size,url FROM (SELECT * FROM data WHERE type=%s ) data LIMIT 40',
                (type,))
            datas = current_app.cur.fetchall()
            data = [a for a in datas]
            return jsonify(data)
        elif type !='empty' and one != 'empty' and key == 'empty':
            current_app.cur.execute(
                'SELECT name,salary,location,size,url FROM (SELECT * FROM data WHERE type=%s and one=%s ) data LIMIT 40',
                (type,one))
            datas = current_app.cur.fetchall()
            data = [a for a in datas]
            return jsonify(data)
        elif type=='empty'and key != 'empty':
            current_app.cur.execute(
                'SELECT name,salary,location,size,url FROM  data WHERE NAME like %s LIMIT 40',
                ('%' + key + '%',))
            datas = current_app.cur.fetchall()
            data = [a for a in datas]
            return jsonify(data)
