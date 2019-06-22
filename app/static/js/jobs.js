
//某城市的职位需求量分析
function fun_city(city_pie,location_name,type){
    var chart = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: null
        };
    var title = {
            text: location_name+'（'+type+'类）'+'详细信息'
        };
    var tooltip = {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        };
    var plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        };
    var credits = {
       text: '职位类型信息图',
       href: '',
      enabled: true
    };
    var series = [{
            type: 'pie',
            name: location_name,
            data: city_pie
        }];
    var json = {};
    json.chart = chart;
    json.credits = credits;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;
    $('#container3').highcharts(json);
}
//某职位在某城市公司规模
function fun_guimo(companysize,location_name,typename) {
    var chart = {
       plotBackgroundColor: null,
       plotBorderWidth: 0,
       plotShadow: false,
        backgroundColor: null
   };
   var title = {
      text: typename+"<br>"+location_name+'公司规模比例',
      align: 'center',
      verticalAlign: 'middle',
      y: 50
   };
   var tooltip = {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
   };
    var credits = {
       text: '公司规模图',
       href: '',
      enabled: true
   };
   var plotOptions = {
      pie: {
          allowPointSelect: true,
         dataLabels: {
            enabled: true,
            distance: -50,
            style: {
               fontWeight: 'bold',
               color: 'white',
               textShadow: '0px 1px 2px black'
            }
         },
         startAngle: -90,
         endAngle: 90,
         center: ['50%', '68%']
      }
   };
   var series= [{
      type: 'pie',
      name: 'Proportion',
      innerSize: '50%',
      data: companysize
   }];
   var json = {};
   json.chart = chart;
   json.title = title;
   json.tooltip = tooltip;
   json.credits = credits;
   json.series = series;
   json.plotOptions = plotOptions;
   $('#container4').highcharts(json);


}

//全国某职位需求量分析
function zhuxing(data,city,typename) {
    var chart = {
        type: 'column',
        selectionMarkerFill: 'rgba(0,0,0, 0.2)',  //选中样式
        zoomType: 'x',                           //x轴扩大
        panning: true,
        panKey: 'shift',
        backgroundColor: null
   };
   var title = {
      text: '全国'+'（'+typename+'类）需求前30名'
   };
   var subtitle = {
      text: '点击可跳转相应城市查看详情'
   };
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
      column: {
         pointPadding: 0.2,
         borderWidth: 0,
          events:{
             click:function(e){
                 //window.open('/city/'+e.point.category);
                 window.location.href="/city/"+e.point.category;
                //alert(e.point.category)
             }
          }
      }
   };
    var credits = {
       text: '某职业全国分布图（鼠标拖动可放大）',
       href: '',
      enabled: true
    };

   var series= [{
       name:'岗位分布',
        data: data,
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
   $('#container').highcharts(json);

}


// 公司规模
function banhuan(result,typename) {
   var chart = {
       plotBackgroundColor: null,
       plotBorderWidth: 0,
       plotShadow: false,
       backgroundColor: null
   };
   var title = {
      text: typename+ "<br>"+'在全国公司规模比例',
      align: 'center',
      verticalAlign: 'middle',
      y: 50
   };
   var tooltip = {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
   };
    var credits = {
       text: '公司规模图',
       href: '',
      enabled: true
   };
   var plotOptions = {
      pie: {
          allowPointSelect: true,
         dataLabels: {
            enabled: true,
            distance: -50,
            style: {
               fontWeight: 'bold',
               color: 'white',
               textShadow: '0px 1px 2px black'
            }
         },
         startAngle: -90,
         endAngle: 90,
         center: ['50%', '68%']
      }
   };
   var series= [{
      type: 'pie',
      name: 'Proportion',
      innerSize: '50%',
      data: result
   }];

   var json = {};
   json.chart = chart;
   json.title = title;
   json.tooltip = tooltip;
   json.credits = credits;
   json.series = series;
   json.plotOptions = plotOptions;
   $('#container2').highcharts(json);
}
