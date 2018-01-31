import echarts from 'echarts';

function EchartsBarMinusVis(slice, payload) {
    var div = d3.select(slice.selector);
    var html = '<div id="e_bar_minus" style="width:' + slice.width() + 'px;' + ''
        + 'px;height:' + slice.height() + 'px;"></div>';
    div.html(html);

    var myChart = echarts.init(document.getElementById('e_bar_minus'));
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: []
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
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                }
            }
        )
    }

    var option2 = {
        legend: {
            data: legend_name
        },
        yAxis: {
            data: axis_name
        },
        series: series_data
    };

    myChart.setOption(option2);
}

module.exports = EchartsBarMinusVis;