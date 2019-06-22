/**
 * Created by TIME on 2017-04-19.
 */

function avgsalary_and_job(city,a_vg,counts){
        var chart = {
            type: 'areaspline',  //图像类型面积曲线图
            backgroundColor: null
        };
        var title = {
            text: '最火爆的web前端全国前20名职位量及平均工资详情'
        };
        var legend = {
            layout: 'vertical', //图例数据项的布局。布局类型： "horizontal" 或 "vertical" 即水平布局和垂直布局 默认是：horizontal
            align: 'left',//设定图例在图表区中的水平对齐方式，合法值有left，center 和 right
            verticalAlign: 'top',//设定图例在图表区中的垂直对齐方式，合法值有 top，middle 和 bottom。垂直位置可以通过 y 选项做进一步设定。
            x: 660, //在图例水平对齐的基础上进行水平偏移。当ｘ值为负值时，图例往左偏移；正值时，图例往右偏移。 默认是：0.
            y: 50,//在竖直对齐的基础上进行竖直方向偏移。当 y 值为负值时，图例往上偏移；正值时，图例往下偏移。 默认是：0
            floating: true,//图例容器是否可以浮动，当设置为浮动（true）时，图例将不占用绘图区空间，并可以层叠在图形上方。 默认是：false.
            borderWidth: 1,//图例的边框宽度
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF' //图例背景色
        };
        var xAxis = {
            categories: city,
            plotBands: [{   //标识区
                from: 0,
                to: 19,
                color: 'rgba(68, 170, 213, .2)'  //颜色
            }]
        };
        var yAxis = {
            title: {
                text: '职位和工资'
            }
        };
        var tooltip = {   //数据提示框
            shared: true,   //提示框被共享时，整个绘图区都将捕捉鼠标指针的移动
            valueSuffix: ''  //数据后缀值
        };
        var credits = {
            enabled: false  //不显示图片版权信息
        };
        var plotOptions = {          //数据列的不透明度
            areaspline: {
                fillOpacity: 0.5
            }
        };
        var series =  [{   //数据列
            name: '平均工资',
            data: a_vg
        } ,{
            name: '职位数',
            data: counts
        }];
        var json = {};
        json.chart = chart;
        json.title = title;
        json.legend = legend;
        json.tooltip = tooltip;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.series = series;
        json.plotOptions = plotOptions;
        json.credits = credits;
        $('#container').highcharts(json);
}


// function xiazuan(perll,c_sharp_result1,javascript_result1,c_plus_plus1,di,java_result1) {
//     var chart = {
//             type: 'column'
//         };
//     var title = {
//             text: '编程语言需求量'
//         };
//     var subtitle = {
//             text: '此次统计前15名的需求排行'
//         };
//     var xAxis = {
//             type: 'category'
//         };
//     var yAxis = {
//             title: {
//                 text: '职位数'
//             }
//         };
//     var legend = {
//             enabled: false
//         };
//     var plotOptions = {
//             series: {
//                 borderWidth: 0,
//                 dataLabels: {
//                     enabled: true,
//                     format: '{point.y}'
//                 }
//             }
//         };
//     var tooltip = {
//             headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//             pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:f}</b> <br/>'
//         };
//     var series = [{
//             name: '编程语言',
//             colorByPoint: true,
//             data: di
//         }];
//     var drilldown = {
//             series: [{
//                 name: 'perl',
//                 id: 'java',
//                 data: java_result1
//             }, {
//                 name: 'c++',
//                 id: 'c++',
//                 data: c_plus_plus1
//             }, {
//                 name: 'javascript',
//                 id: 'javascript',
//                 data: javascript_result1
//             }, {
//                 name: 'c#',
//                 id: 'c#',
//                 data: c_sharp_result1
//             }, {
//                 name: 'perl',
//                 id: 'perl',
//                 data: perll
//             },{
//                 name: 'php',
//                 id: 'php',
//                 data: {{ php_result1 }}
//             }]
//         };
//
//     var json = {};
//     json.chart = chart;
//     json.title = title;
//     json.subtitle=subtitle;
//     json.legend = legend;
//     json.tooltip = tooltip;
//     json.xAxis = xAxis;
//     json.yAxis = yAxis;
//     json.plotOptions=plotOptions;
//     json.series = series;
//     json.drilldown = drilldown;
//     $('#container2').highcharts(json);
//
// }


function language(language_name,value) {
    var chart = {
            type: 'spline',
            backgroundColor: null
    };
    var title = {
        text: '15大编程语言平均工资排行',
        x: -20
    };
    var subtitle = {
        text: '',
        x: -20
    };
    var xAxis = {
        categories: language_name,
        labels: {
            style: {
                color: '#19a0f5',//颜色
                fontSize:'12spx'  //字体
            }
        }
    };
    var yAxis = {
        title: {
            text: '月薪'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };
    var credits = {
        enabled: false
    };
    var tooltip = {
        valueSuffix: '/元'
    };
    var legend = {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    };
    var series = [{
        name: '平均月薪',
        data: value
    }];
    var json = {};
    json.chart = chart;
    json.title = title;
    json.subtitle=subtitle;
    json.legend = legend;
    json.tooltip = tooltip;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.credits = credits;
    json.series = series;
    $('#container1').highcharts(json);
}
