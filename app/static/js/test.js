function mapLoad(data,geoCoordMap) {
     var myChart = echarts.init(document.getElementById('main'));
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
    backgroundColor: '#fff',
    title: {
        text: '全国主要城市空气质量',
        //subtext: 'data from PM25.in',
        //sublink: 'http://www.pm25.in',
        x:'center',
        textStyle: {
            color: 'black'
        }
    },
    tooltip: {
        trigger: 'item',
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
                    color: ['#8517A6', '#64117E', 'red']
                    // color: ['purple']
                },
            outOfRange: {
                symbolSize: [5, 30],
                color: '#fff'
            }
    },
    geo: {
        map: 'china',
            label: {
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
    series: [
            {
                name: 'city_China',
                type: 'scatter',
                coordinateSystem: 'geo',
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
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6)),
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
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
myChart.setOption(option);
}

//x下钻饼图
function drill_pie() {

   Highcharts.data({
      csv: document.getElementById('tsv').innerHTML,
      itemDelimiter: '\t',
      parsed: function (columns) {
         var brands = {}, brandsData = [], versions = {}, drilldownSeries = [];

		 // Parse percentage strings
         columns[1] = $.map(columns[1], function (value) {
            if (value.indexOf('%') === value.length - 1) {
               value = parseFloat(value);
            }
            return value;
         });

         $.each(columns[0], function (i, name) {
            var brand, version;

            if (i > 0) {

               // Remove special edition notes
               name = name.split(' -')[0];

               // Split into brand and version
               version = name.match(/([0-9]+[\.0-9x]*)/);
               if (version) {
                  version = version[0];
               }
               brand = name.replace(version, '');

               // Create the main data
               if (!brands[brand]) {
                  brands[brand] = columns[1][i];
               } else {
                  brands[brand] += columns[1][i];
               }

               // Create the version data
               if (version !== null) {
                  if (!versions[brand]) {
                     versions[brand] = [];
                  }
                  versions[brand].push(['v' + version, columns[1][i]]);
               }
            }

         });

         $.each(brands, function (name, y) {
            brandsData.push({
               name: name,
               y: y,
               drilldown: versions[name] ? name : null
            });
         });
         $.each(versions, function (key, value) {
            drilldownSeries.push({
                name: key,
                id: key,
                data: value
            });
         });

         var chart = {
            type: 'pie'
         };
         var title = {
            text: 'Browser market shares. November, 2013'
         };
         var subtitle = {
            text: 'Click the slices to view versions. Source: netmarketshare.com.'
         };
         var xAxis = {
            type: 'category'
         };
         var yAxis ={
            title: {
              text: 'Total percent market share'
            }
         };
         var tooltip = {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         };
         var credits = {
            enabled: false
         };
         var series= [{
            name: 'Brands',
            colorByPoint: true,
            data: brandsData
         }];
         var drilldown= {
            series: drilldownSeries
         }

         var json = {};
         json.chart = chart;
         json.title = title;
         json.subtitle = subtitle;
         json.xAxis = xAxis;
         json.yAxis = yAxis;
         json.tooltip = tooltip;
         json.credits = credits;
         json.series = series;
         json.drilldown = drilldown;
         $('#container').highcharts(json);
     }
   });
}