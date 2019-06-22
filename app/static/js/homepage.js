/**
 * Created by Administrator on 2017/3/25.
 */
//spline
function zhuxing(data1,city) {
    var chart = {
        type: 'spline',
        selectionMarkerFill: 'rgba(0,0,0, 0.2)',  //选中样式
        zoomType: 'x',                           //x轴扩大
        panning: true,
        panKey: 'shift',
        backgroundColor: null
   };
   var title = {
      text: '岗位需求量前30名的城市'
   };
   var subtitle = {
      text: '全国需求量排行（鼠标拖动可放大）'
   };
   //鼠标悬停提示
   var tooltip = {
      pointFormat: '岗位分布量: <b>{point.y:f} </b>'
   };
   var xAxis = {
      categories: city,
      crosshair: true,
       labels: {
                            rotation: 0,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif',
                                writingMode:'tb-rl'    //文字竖排样式
                            }
                        }
   };
   var yAxis = {
      min: 0,
      title: {
         text: '分布数量'
      }
   };
   var plotOptions = {
      series: {
         pointPadding: 0.2,
         borderWidth: 0,
          events:{
             click:function(e){
                 window.open('/city/'+e.point.category);
                 // window.location.href="/city/"+e.point.category;    //转到一个新的网页
                //alert(e.point.category)
             }
          }
      }
   };
   //图右下角图标
   var credits = {
       text: '全国需求量排行图',
       href: '',
       enabled: true
   };
   //图下中间的系列标
   var series= [{
       name: '岗位分布',
        data: data1
   }];
   //初始化图
   var json = {};
   json.chart = chart;
   json.title = title;
   json.subtitle = subtitle;
   json.tooltip = tooltip;
   json.xAxis = xAxis;
   json.yAxis = yAxis;
   json.series = series;
   json.plotOptions = plotOptions;
   json.credits = credits;
   $('#container').highcharts(json);
}

//工资
function sal(sal_x,sal_y) {
    var chart = {
        type: 'column',
        selectionMarkerFill: 'rgba(0,0,0, 0.2)',  //选中样式
        zoomType: 'x',                           //x轴扩大
        panning: true,
        panKey: 'shift',
        // plotBackgroundImage: '/1488595777591.jpg' //设置图表的背景图片
        backgroundColor: null
   };
   var title = {
      text: '全国各工资段职位量需求'
   };
   var subtitle = {
      text: '本次统计12个工资段（鼠标拖动可放大）'
   };
   //鼠标悬停提示信息
   var tooltip = {
      pointFormat: '职位数: <b>{point.y:f} </b>'
   };
   var xAxis = {
      categories: sal_x,
      crosshair: true
       // labels: {
       //                      rotation: 0,
       //                      // style: {
       //                      //     fontSize: '13px',
       //                      //     fontFamily: 'Verdana, sans-serif',
       //                      //     writingMode:'tb-rl'    //文字竖排样式
       //                      // }
       //                  }
   };
   var yAxis = {
      min: 0,
      title: {
         text: '区间段职位数'
      }
   };
   var plotOptions = {
      series: {
         pointPadding: 0.2,
         borderWidth: 0
      }
   };
   var credits = {
       text: '全国工资段分布图',
       href: '',
       enabled: true
   };
   var series= [{
       name: '岗位分布',
        data: sal_y
   }];
   var json = {};
   json.chart = chart;
   json.title = title;
   json.subtitle = subtitle;
   json.tooltip = tooltip;
   json.xAxis = xAxis;
   json.yAxis = yAxis;
   json.series = series;
   json.plotOptions = plotOptions;
   json.credits = credits;
   $('#container1').highcharts(json);
}

//行业pie
function alljob(getpie1){
    var chart = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: null
        };
    var title = {
            text: '全国各行业占比分析'
        };
    var subtitle = {
            text: '本次分析前10名详情'
        };
    var tooltip = {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        };
    var plotOptions = {
            pie: {
                allowPointSelect: true, //是否可选取多个点
                cursor: 'pointer',//游标
                dataLabels: {
                    enabled: false //图上是否显示数据标签
                },
                showInLegend: true //是否显示图例说明
            }
        };
    var credits = {
       text: '全国10大行业比例图',
       href: '',
      enabled: true
    };
    //悬停显示信息的获取
    var series = [{
            type: 'pie',
            name: '行业类别',
            data: getpie1
        }];
    var json = {};
    json.chart = chart;
    json.credits = credits;
    json.title = title;
    json.subtitle = subtitle;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;
    $('#container2').highcharts(json);
}

//全国地图
function mapLoad(data,geoCoordMap) {
     var myChart = echarts.init(document.getElementById('map_china_wrap'));
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

option = {
    backgroundColor: null,
    title: {
        text: '全国招聘职位分布 ',
        //subtext: 'data from PM25.in',
        //sublink: 'http://www.pm25.in',
        x:'center',
        textStyle: {
            color: 'black'//提示标签字体颜色

        }
    },
    tooltip: {
        trigger: 'item',
        //对应的鼠标悬浮效果
        formatter: function (params) {
            return params.name + ' : ' + params.value[2];
        }
    },
    legend: {
        orient: 'vertical',
        y: 'bottom',
        x:'right',
        data:['pm2.5'],
        textStyle: {
            color: 'black'
        }
    },
    //左侧小导航图标
    visualMap: {
        min: 0,
        max: 15000,
        calculable: true,
        color: ['#d94e5d','#eac736','#50a3ba'],
        textStyle: {
            color: 'black'
        },
        inRange: {
                    symbolSize: [6, 20],
                    color: ['#d94e5d','#eac736','#50a3ba']
                    // color: ['purple']
                },
            outOfRange: {
                symbolSize: [5, 30],
                color: '#fff'
            }
    },
    geo: {//这个是重点配置区
        map: 'china',
            label: {// 表示中国地图
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    // areaColor: '#f3e1e1',
                    areaColor: '#F3F3F3',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#a7bcd6'
                }
            }
        },
    //配置属性
    series: [
            {
                name: 'city_China',
                type: 'scatter',
                coordinateSystem: 'geo',// 对应上方配置,表示使用的坐标系为地理坐标系
                data: convertData(data),
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                }
            },
            {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',// 表示使用的坐标系为地理坐标系
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6)),
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'// 波纹绘制效果
            },
            hoverAnimation: true,
            label: {
                normal: {             // 默认的文本标签显示样式
                    formatter: '{b}',// 标签内容格式器
                    position: 'right',// 标签显示的位置
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1,
        },
        ]
    };
    myChart.setOption(option);//echarts图表重新setOption(调接口数据重新渲染)
    window.onresize = myChart.resize;
    myChart.on('click', 
	function (params) 
	{
        if (params.componentType == 'series') 
		{
            window.open('/city/' + params.name);
            // window.location.href="/city/"+params.name;
		}
        // window.open('/city/' + params.name);
	} 
);

}


