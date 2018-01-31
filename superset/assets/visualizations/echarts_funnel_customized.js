import echarts from 'echarts';
import { getColorFromScheme } from '../javascripts/modules/colors';

function EchartsFunnelCustomizedVis(slice, payload) {
    const div = d3.select(slice.selector);
    const html = '<div id="e_funnel_cust" style="width:' + slice.width() + 'px;' + ''
        + 'px;height:' + slice.height() + 'px;"></div>';
    div.html(html);

    var myChart = echarts.init(document.getElementById('e_funnel_cust'));
    var option = {
        title: {
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            data: []
        },
        series: [
            {
            name: '预期',
            type: 'funnel',
            left: '10%',
            width: '80%',
            label: {
                normal: {
                    formatter: '{b}预期'
                },
                emphasis: {
                    position:'inside',
                    formatter: '{b}预期: {c}%'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.7
                }
            },
            data: []
            },
            {
            name: '实际',
            type: 'funnel',
            left: '10%',
            width: '80%',
            maxSize: '80%',
            label: {
                normal: {
                    position: 'inside',
                    formatter: '{c}%',
                    textStyle: {
                        color: '#fff'
                    }
                },
                emphasis: {
                    position:'inside',
                    formatter: '{b}实际: {c}%'
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.5,
                    borderColor: '#fff',
                    borderWidth: 2
                }
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
                data: tmp_data
            }
        )
    }

    var option2 = {
        legend: {
            data: legend_name
        },
        series: series_data
    };
    myChart.setOption(option2);
}

module.exports = EchartsFunnelCustomizedVis;
