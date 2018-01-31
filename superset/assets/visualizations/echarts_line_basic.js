import echarts from 'echarts';


function EchartsLineBasicVis(slice, payload) {
    const div = d3.select(slice.selector);
    var html = '<div id="e_line_basic" style="width: ' + slice.width() + ''
        + 'px;height:' + slice.height() + 'px;">haha</div>';
    div.html(html);

    var myChart = echarts.init(document.getElementById('e_line_basic'));

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

    const fd = slice.formData;
    const json = payload.data;
    const data = json;
    const records = data['records'];
    const data_column = data.columns;
    const metrics = fd.metrics;
    const smooth_type = fd.smooths;
    const graph_type = fd.graph_type;

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

module.exports = EchartsLineBasicVis;