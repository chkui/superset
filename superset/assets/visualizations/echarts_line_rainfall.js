import echarts from 'echarts';
import {getColorFromScheme} from '../javascripts/modules/colors';


function EchartsLineRainFallVis(slice, payload) {
    var div = d3.select(slice.selector);
    var html = '<div id="e_line_rainfall" style="width:' + slice.width() + 'px;' + ''
        + 'px;height:' + slice.height() + 'px;"></div>';
    div.html(html);

    var myChart = echarts.init(document.getElementById('e_line_rainfall'));
    var option = {
        title: {
        },
        grid: {
            bottom: 80
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        legend: {
            data: [],
            x: 'left'
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 65,
                end: 85
            },
            {
                type: 'inside',
                realtime: true,
                start: 65,
                end: 85
            }
        ],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLine: {onZero: false},
                data: []
            }
        ],
        yAxis: [
            {
                name: '流量(m^3/s)',
                type: 'value',
                max: 500
            },
            {
                name: '降雨量(mm)',
                nameLocation: 'start',
                max: 5,
                type: 'value',
                inverse: true
            }
        ],
        series: [
            {
                name: [],
                type: 'line',
                animation: false,
                areaStyle: {
                    normal: {}
                },
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                markArea: {
                    silent: true,
                    data: [[{
                        xAxis: '2009/9/12\n7:00'
                    }, {
                        xAxis: '2009/9/22\n7:00'
                    }]]
                },
                data: []
            },
            {
                name: [],
                type: 'line',
                yAxisIndex: 1,
                animation: false,
                areaStyle: {
                    normal: {}
                },
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                markArea: {
                    silent: true,
                    data: [[{
                        xAxis: '2009/9/10\n7:00'
                    }, {
                        xAxis: '2009/9/20\n7:00'
                    }]]
                },
                data: []
            }
        ]
    };

    myChart.setOption(option);

    const fd = slice.formData;
    const json = payload.data;
    const data = json;
    const records = data['records'];
    const data_column = data.columns;
    const metrics = fd.metrics;

    var legend_name = [];
    var axis_name = [];
    var series_data = [];

    for (var i = 0; i < records.length; i++) {
        axis_name.push(records[i][data_column[0]]);
    }

    for (var i = 0; i < metrics.length; i++) {
        legend_name.push(metrics[i]);
        var tmp_data = [];
        for (var j = 0; j < records.length; j++) {
            tmp_data.push(records[j][metrics[i]]);
        }

        series_data.push(
            {
                name: legend_name[i],
                data: tmp_data
            }
        )
    }

    var option2 = {
        legend: {
            data: legend_name
        },
        xAxis: {
            data: axis_name
        },
        series: series_data
    };

    myChart.setOption(option2);
}

module.exports = EchartsLineRainFallVis;
