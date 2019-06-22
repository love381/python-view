# -*- coding:utf8 -*-
from . import ranking
from flask import render_template, current_app, abort, request, url_for
import json
@ranking.route('/')
def index():
    #竞争最激烈的岗位
    current_app.cur.execute('select name,times,datailLink from geted_hotjob group by times order by times desc limit 10;')
    datas = current_app.cur.fetchall()
    data = [[a[0],a[1],a[2]] for a in datas]
    #增长最快
    current_app.cur.execute('select name,times,datailLink from geted_risejob group by times order by times desc limit 10;')
    datas = current_app.cur.fetchall()
    data1 = [[a[0],a[1],a[2]] for a in datas]
    #关注
    current_app.cur.execute('select name,times,datailLink from geted_attention group by times order by times desc limit 10;')
    datas = current_app.cur.fetchall()
    data2 = [[a[0],a[1],a[2]] for a in datas]
    #冷门
    current_app.cur.execute('select name,times,datailLink from geted_coldjob group by times order by times desc limit 10;')
    datas = current_app.cur.fetchall()
    data3 = [[a[0],a[1],a[2]] for a in datas]
    return render_template("rank.html",data=data, data1=data1, data2=data2, data3=data3)