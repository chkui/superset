import echarts from 'echarts';
import {getColorFromScheme} from '../javascripts/modules/colors';


function EchartsLineAreaStackVis(slice, payload) {
    var div = d3.select(slice.selector);
    var html = '<div id="e_line_area_stack" style="width:' + slice.width() + 'px;' + ''
        + 'px;height:' + slice.height() + 'px;"></div>';
    div.html(html);

    var myChart = echarts.init(document.getElementById('e_line_area_stack'));
    var option = {
        title: {},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: []
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: []
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

        switch (i) {
            case metrics.length-1:
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

module.exports = EchartsLineAreaStackVis;