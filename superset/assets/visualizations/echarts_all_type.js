'use strict';

import echarts from 'echarts';

require('echarts/map/js/china.js');
require('echarts/theme/dark.js');
require('echarts/theme/infographic.js');
require('echarts/theme/macarons.js');
require('echarts/theme/roma.js');
require('echarts/theme/shine.js');
require('echarts/theme/vintage.js');

const base_option = {
    title: {},
    legend: {},
    grid: {},
    xAxis: {},
    yAxis: {},
    polar: {},
    radiusAxis: {},
    angleAxis: {},
    radar: {},
    dataZoom: {},
    visualMap: {},
    tooltip: {},
    axisPointer: {},
    toolbox: {},
    brush: {},
    geo: {},
    parallel: {},
    parallelAxis: {},
    singleAxis: {},
    timeline: {},
    graphic: {},
    calendar: {},
    dataset: {},
    aria: {},
};

function EchartsGraphAllTypeVis(slice, payload) {
    const fd = slice.formData;
    const json = payload.data;
    const graph_type = fd.graph_type;
    const graph_id = "echarts_" + graph_type + fd.slice_id;
    const theme = fd.echarts_theme;
    const data = json;

    const div = d3.select(slice.selector);
    let html = '<div id=' + graph_id + ' style="width: ' + slice.width() + ' '
        + 'px;height:' + slice.height() + 'px;"></div>';
    div.html(html);

    let myChart = echarts.init(document.getElementById(graph_id), theme);
    let tmp_series = [];

    const records = data['records'];
    const data_column = data.columns;
    const metrics = fd.metrics;

    let legend_name = [];
    let axis_name = [];
    let series_data = [];

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
                type: 'bar',
                data: tmp_data,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                }
            }
        )
    }

    switch (graph_type) {
        case 'line':
            pass;
            break;
        case 'bar':
            pass;
            break;
        case 'pie':
            pass;
            break;
        case 'scatter':
            pass;
            break;
        case 'effectScatter':
            pass;
            break;
        case 'radar':
            pass;
            break;
        case 'tree':
            pass;
            break;
        case 'treemap':
            pass;
            break;
        case 'sunburst':
            pass;
            break;
        case 'boxplot':
            pass;
            break;
        case 'candlestick':
            pass;
            break;
        case 'heatmap':
            pass;
            break;
        case 'map':
            pass;
            break;
        case 'parallel':
            pass;
            break;
        case 'lines':
            pass;
            break;
        case 'graph':
            pass;
            break;
        case 'sankey':
            pass;
            break;
        case 'funnel':
            pass;
            break;
        case 'gauge':
            pass;
            break;
        case 'pictorialBar':
            pass;
            break;
        case 'themeRiver':
            pass;
            break;
        case 'custome':
            pass;
            break;
        default:
            pass;
    }

    var option = {
        legend: {
            data: []
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: []
    };
    myChart.setOption(option);

    const records = data['records'];
    const data_column = data.columns;
    const metrics = fd.metrics;
    const smooth_type = fd.smooths;

    var legend_name = [];
    var axis_name = [];
    var series_data = [];
    var tmp_label = [];

    for (var i = 0; i < records.length; i++) {
        axis_name.push(records[i][data_column[0]]);
    }

    for (var i = 0; i < metrics.length; i++) {
        legend_name.push(metrics[i]);
        var tmp_data = [];
        for (var j = 0; j < records.length; j++) {
            tmp_data.push(records[j][metrics[i]]);
        }
        switch (graph_type) {
            case 'Basic': {
                if (smooth_type) {
                    series_data.push(
                        {
                            name: legend_name[i],
                            type: 'line',
                            smooth: true,
                            data: tmp_data
                        }
                    )
                }
                else {
                    series_data.push(
                        {
                            name: legend_name[i],
                            type: 'line',
                            data: tmp_data
                        }
                    )
                }
                break;
            }
            case 'Stack': {
                switch (i) {
                    case metrics.length - 1:
                        tmp_label.push({
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        });
                        break;
                    default:
                        tmp_label.push({normal: {}});
                }
                series_data.push(
                    {
                        name: legend_name[i],
                        type: 'line',
                        stack: '总量',

                        label: tmp_label[i],
                        areaStyle: {normal: {}},
                        data: tmp_data
                    }
                );
                break;
            }
            default: {
                if (smooth_type) {
                    series_data.push(
                        {
                            name: legend_name[i],
                            type: 'line',
                            smooth: true,
                            data: tmp_data
                        }
                    )
                }
                else {
                    series_data.push(
                        {
                            name: legend_name[i],
                            type: 'line',
                            data: tmp_data
                        }
                    )
                }
            }
        }
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

module.exports = EchartsGraphAllTypeVis;