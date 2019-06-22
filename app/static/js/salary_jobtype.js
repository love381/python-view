/**
 * Created by TIME on 2017-04-15.
 */

// 某工资段的职位和数量需求
function e_spline(city_name,jobcount,jobtype,typename,sum) {
   var chart = {
                    type: 'column',                         //指定图表的类型，默认是折线图（line）
                    selectionMarkerFill: 'rgba(0,0,0, 0.2)',  //选中样式
                   zoomType: 'x',                           //x轴扩大
                   panning: true,
                   panKey: 'shift',
                    backgroundColor: null
                };
   var title = {
                    // useHTML: true,      //在标题添加超链接
                    text: typename+'月薪在 '+city_name+' 职位及数量需求'
                    // text: '('+typename+')在'+city_name+'职位及数量'
                };
   var subtitle = {
      text: '共有'+sum+'个职位'
   };
   var plotOptions = {
                    series: {
                        cursor: 'pointer',
                        events: {
                            click: function (e) {
                                // location.href = 'http://www.baidu.com' //上面是当前页跳转，如果是要跳出新页面，那就用
                                //window.open('http://www.baidu.com');
                                //这里的url要后面的data里给出
                            }
                        },
                    }
                };
   var xAxis = {
                    title: {
                        text: '职位名称'                //指定y轴的标题
                    },
                    categories: jobtype,            //指定x轴分组
                    labels: {
                            rotation: 0,
                            style: {
                                fontSize: '10px',
                                fontFamily: 'Verdana, sans-serif',
                                writingMode:'tb-ul'    //文字竖排样式
                            }
                        }
                };
   var yAxis = {
                    title: {
                        text: '职位数量'                //指定y轴的标题
                    }
                };
   var credits = {
       text: '某月薪在某地的职位详情（鼠标拖动可放大）',
       href: '',
       enabled: true
   };
   var series = [{                              //指定数据列
                    name: '需求',                       //数据列名
                    data: jobcount
                }];
   var json = {};
   json.chart = chart;
   json.title = title;
   json.xAxis = xAxis;
   json.yAxis = yAxis;
   json.series = series;
   json.credits = credits;
   json.subtitle = subtitle;
   json.plotOptions = plotOptions;
   $('#container').highcharts(json);
}


// 某工资段公司规模比例大小
function e_huan(city_name,banhuan,typename) {
    var chart = {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    backgroundColor: null
                };
    var title = {
                    text: city_name+"<br>"+typename+'公司规模',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: -10
                };
    var tooltip = {
                    enabled : true,
                    headerFormat: '{series.name}<br>',
                    pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
                };
    var plotOptions = {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
                        allowPointSelect: true,         //允许图形中某一块被选择
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '53%'],  //调整在页面上的位置
                        events: {
                            click: function () {
                                //location.href = 'http://www.baidu.com' //上面是当前页跳转，如果是要跳出新页面，那就用
                                //window.open('http://www.baidu.com');
                                //这里的url要后面的data里给出
                            }
                        },
                    }
                };
    var credits = {
       text: '公司规模图',
       href: '',
       enabled: true
    };
    var series = [{
                    type: 'pie',
                    name: '公司规模',
                    innerSize: '50%',
                    data: banhuan        //[ [],[],[]...]
                }];
    var json = {};
    json.chart = chart;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.credits = credits;
    json.plotOptions = plotOptions;
    $('#container2').highcharts(json);
}



//某工资段工作地点
function didian(didian_name,didian_count,typename) {
   var chart = {
                    type: 'spline',                         //指定图表的类型，默认是折线图（line）
                    backgroundColor: null
                };
   var title =  {
                    // useHTML: true,      //在标题添加超链接
                    text: '('+typename+')工作地点'
                };
   var plotOptions = {
                    series: {
                        cursor: 'pointer',
                        events: {
                            click: function (e) {
                                // location.href = 'http://www.baidu.com' //上面是当前页跳转，如果是要跳出新页面，那就用
                                //window.open('http://www.baidu.com');
                                //这里的url要后面的data里给出
                            }
                        },
                    }
                };
   var xAxis = {
                    categories: didian_name,            //指定x轴分组
                    labels: {
                            rotation: 0,
                            style: {
                                fontSize: '10px',
                                fontFamily: 'Verdana, sans-serif',
                                writingMode:'tb-ul'    //文字竖排样式
                            }
                        }
                };
   var yAxis = {
                    title: {
                        text: '职位数量'                //指定y轴的标题
                    }
                };
   var series = [{                              //指定数据列
                    name: '天竞争人数',                       //数据列名
                    data: didian_count
                }];
   var json = {};
   json.chart = chart;
   json.title = title;
   json.xAxis = xAxis;
   json.yAxis = yAxis;
   json.series = series;
   json.plotOptions = plotOptions;
   $('#container1').highcharts(json);
}
