import echarts from 'echarts';

function EchartsBarAnimationVis(slice, payload) {
    var div = d3.select(slice.selector);
    var html = '<div id="e_bar_animation" style="width:' + slice.width() + 'px;' + ''
        + 'px;height:' + slice.height() + 'px;"></div>';
    div.html(html);

    var myChart = echarts.init(document.getElementById('e_bar_animation'));

    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 100; i++) {
        xAxisData.push('类目' + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    var option = {
        title: {
        },
        legend: {
            data: [],
            align: 'left'
        },
        toolbox: {
            // y: 'bottom',
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {},
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {},
        xAxis: {
            data: [],
            silent: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {},
        series: [],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };

    myChart.setOption(option);

    const fd = slice.formData;
    const json = payload.data;
    const data = json;
    const records = data['records'];
    const data_column = data.columns;
    const metrics = fd.metrics;
    const group_by = fd.groupby;

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
                type: 'bar',
                data: tmp_data,
                animationDelay: function (idx) {
                    return idx * 10;
                }
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

module.exports = EchartsBarAnimationVis;