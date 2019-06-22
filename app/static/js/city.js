/**
 * Created by Administrator on 2019/4/17.
 */
// 职位总览 利用highcharts来制作图表
function huizong(cityname,data) {
   var chart = {
       type: 'pie',
       options3d: {
         enabled: true,
         alpha: 50,
         beta: 0
      },
       backgroundColor: null
   };
   var title = {
      text: cityname+'行业比例总揽'
   };

   var tooltip = {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
   };

   var plotOptions = {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
             enabled: false,
             format: '{point.name}'
          },
		  showInLegend: true,
          events:{
             click:function(e){
                 //window.open('/type/'+e.point.name);
                 // alert(e.point.name)
                 window.location.href="/type/"+cityname+'_'+e.point.name;
                 // window.location.href="/type/"+e.point.name;
                //alert(e.point.category)
             }
          }
      }
   };
   var credits = {
       text: '职位总览图',
      enabled: true
   };
   var series= [{
         type: 'pie',
            name: '行业比例',
            data: data
   }];
   var json = {};
   json.chart = chart;
   json.title = title;
   json.tooltip = tooltip;
   json.plotOptions = plotOptions;
   json.credits = credits;
   json.series = series;
   $('#container').highcharts(json);
}

//公司规模
function e_huan(jobsize,cityname) {
    var chart = {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    backgroundColor: null
                };
    var title = {
                    text: cityname+'公司规模',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 50
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
                        center: ['50%', '75%'],  //调整在页面上的位置
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
                    innerSize: '55%',
                    data: jobsize        //[ [],[],[]...]
                }];
    var json = {};
    json.chart = chart;
    json.credits=credits;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;
    $('#container4').highcharts(json);
}


//前30名spline图
function nth(cityname,JC_count,JC_jobname){
   var chart = {
       type: 'spline',
       selectionMarkerFill: 'rgba(0,0,0, 0.2)',  //选中样式
       zoomType: 'x',                           //x轴扩大
       panning: true,
       panKey: 'shift',
       backgroundColor: null
   };
   var title = {
      text: cityname+'职位需求量排名靠前的工作'
       /*style : {
            'fontSize' : '30px',
           'fontWeight': 'bold'
        }*/
   };
   var subtitle = {
      text: ''
   };
   var tooltip = {
      pointFormat: '需求量: <b>{point.y:f} </b>'
   };
   var xAxis = {  //x轴
      categories: JC_jobname
      // crosshair: true,
      //  labels: {
      //                       rotation: 0,
      //                       style: {
      //                           fontSize: '13px',
      //                           fontFamily: 'Verdana, sans-serif',
      //                           writingMode:'tb-ul'    //文字竖排样式
      //                       }
      // }
   };
   var yAxis = { //y轴
      min: 0,
      title: {
         text: '职位需求量'
      }
   };
   var credits ={
        enabled: true, // 版权信息
        href: '',
        text: '城市职位需求排行图'
    };
   var plotOptions = {
      series: {
         pointPadding: 0.2,
         borderWidth: 0,
          events:{
             click:function(e){
                 //window.open('/city/'+e.point.category);
                 // alert(e.point.category)
                 // window.location.href="/type/"+cityname+'_'+e.point.category;
                 // window.open('/type/'+cityname+'\_'+e.point.category);
                 // window.location.href="/type/"+e.point.category;    //转到一个新的网页
                //alert(e.point.category)
             }
          }
      }
   };
   var series= [{
       name: '职位需求量',
        data: JC_count
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
   $('#container2').highcharts(json);
}


//地区工资比例
function salary_pie(sal_data,cityname){
        var chart={
            type: 'pie',
            options3d: {
                enabled: true,      // 使用开始 3D 功能
                alpha: 45,          //  倾斜的角度（当前是45°）
                beta: 0            //   视角，0看着比较舒服
            },
            backgroundColor: null
        };
        var title={
            useHTML: true,      //在标题添加超链接
            text: cityname+'工资比例'
        };
        var tooltip={
            animation: true,              // 是否启用动画效果
            backgroundColor: '#FCFFC5',   // 背景颜色
            enabled: true,      //显示数据提示框
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        };
        var plotOptions= {     // 针对特定图表类型生效的 3D 配置
            pie: {
                innerSize:70,//变成3D环形图
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 40,          //饼图的深度在这设置
                dataLabels: {
                    enabled: false,
                    format: '{point.name}'
                },
				events:{
					click:function(e){
						 //window.open('/type/'+e.point.name);
                        //alert(cityname)
						 window.location.href="/type/"+cityname+'-'+e.point.name;
						// alert(e.point.name)
					}
				},
				showInLegend: true
            }
        };
        var credits= {
            text: '工资图',                 //显示的文字
            href: '',                       //链接的地址
            enabled: true                // 是否启用
        };
        var series= [{
            name: "占百分比",
            data: sal_data
        }];
    var json = {};
    json.chart = chart;
    json.title = title;
    json.tooltip = tooltip;
    json.plotOptions = plotOptions;
    json.credits = credits;
    json.series = series;
    $('#container3').highcharts(json);
}

