import echarts from 'echarts';

require('echarts/theme/dark.js');
require('echarts/theme/infographic.js');
require('echarts/theme/macarons.js');
require('echarts/theme/roma.js');
require('echarts/theme/shine.js');
require('echarts/theme/vintage.js');

function EchartsLineBasicVis(slice, payload) {
    const fd = slice.formData;
    const json = payload.data;
    const data = json;

    const graph_id = "echarts_line" + fd.slice_id;
    const graph_type = fd.graph_type;
    const data_zoom = fd.dataZoom;
    const theme = fd.echarts_theme;
    let new_theme;
    if (theme === 'default') {
        new_theme = ''
    }
    else {
        new_theme = fd.echarts_theme
    }

    const div = d3.select(slice.selector);
    let html = '<div id=' + graph_id + ' style="width: ' + slice.width() + ' '
        + 'px;height:' + slice.height() + 'px;"></div>';
    div.html(html);

    let myChart = echarts.init(document.getElementById(graph_id), new_theme);

    const records = data['records'];
    const data_column = data.columns;
    const metrics = fd.metrics;
    const smooth_type = fd.smooths;
    const label_info = {
        show: true,
        position: 'top'
    };
    const normal_y_axis = {
        type: 'value'
    };
    const data_zoom_info = [
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
    ];

    var legend_name = [];
    var axis_name = [];
    var series_data = [];
    let double_axis_info = [];

    for (let i = 0; i < records.length; i++) {
        axis_name.push(records[i][data_column[0]]);
    }

    for (let i = 0; i < metrics.length; i++) {

        legend_name.push(metrics[i]);
        let tmp_data = [];
        for (let j = 0; j < records.length; j++) {
            tmp_data.push(records[j][metrics[i]]);
        }

        function LabelInsert(item) {
            if (item === metrics.length - 1) {
                return label_info
            } else {
                return {}
            }
        }

        function DoubleAxisInverse(item) {
            if (item === metrics.length - 1) {
                return true
            } else {
                return false
            }
        }

        function DoubleAxisNameLocation(item) {
            if (item === metrics.length - 1) {
                return 'start'
            }
        }


        switch (graph_type) {
            case 'Basic':
                series_data.push(
                    {
                        name: legend_name[i],
                        type: 'line',
                        smooth: smooth_type,
                        data: tmp_data
                    }
                );
                break;
            case 'Stack':
                series_data.push(
                    {
                        name: legend_name[i],
                        type: 'line',
                        stack: '总量',
                        smooth: smooth_type,
                        label: {
                            normal: LabelInsert(i)
                        },
                        data: tmp_data
                    }
                );
                break;
            case 'StackArea':
                series_data.push(
                    {
                        name: legend_name[i],
                        type: 'line',
                        stack: '总量',
                        smooth: smooth_type,
                        label: {
                            normal: LabelInsert(i)
                        },
                        areaStyle: {
                            normal: {}
                        },
                        data: tmp_data
                    }
                );
                break;
            case 'Area Double Axis':
                series_data.push({
                    name: legend_name[i],
                    type: 'line',
                    animation: false,
                    yAxisIndex: i,
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
                    data: tmp_data
                });
                double_axis_info.push({
                    name: legend_name[i],
                    type: 'value',
                    inverse: DoubleAxisInverse(i),
                    nameLocation: DoubleAxisNameLocation(i)
                });
                break;
        }
    }

    function YAxisType(graph_type) {
        switch (graph_type) {
            case 'Area Double Axis':
                return double_axis_info;

                break;
            default:
                return normal_y_axis;
        }
    }
    function DataZoomType(data_zoom) {
        if (data_zoom) {
            return {dataZoom: data_zoom_info};
        }else {
            return {}
        }
    }

    var option2 = {
        legend: {
            data: legend_name
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            data: axis_name
        },
        yAxis: YAxisType(graph_type),
        series: series_data,
    };
    myChart.setOption(option2);
}

module.exports = EchartsLineBasicVis;