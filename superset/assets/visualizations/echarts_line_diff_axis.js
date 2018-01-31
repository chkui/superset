import echarts from 'echarts';

function EchartsLineDiffAxisVis(slice, payload) {
    const div = d3.select(slice.selector);
    const html = '<div id="e_line_diff_axis" style="width:' + slice.width() + 'px;' + ''
        + 'px;height:' + slice.height() + 'px;"></div>';
    div.html(html);

    var myChart = echarts.init(document.getElementById('e_line_diff_axis'));
    var option = {
        title: {
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        legend: {
            data: [],
            x: 'left'
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
        axisPointer: {
            link: {xAxisIndex: 'all'}
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 30,
                end: 70,
                xAxisIndex: [0, 1]
            },
            {
                type: 'inside',
                realtime: true,
                start: 30,
                end: 70,
                xAxisIndex: [0, 1]
            }
        ],
        grid: [{
            left: 50,
            right: 50,
            height: '35%'
        }, {
            left: 50,
            right: 50,
            top: '55%',
            height: '35%'
        }],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLine: {onZero: true},
                data: []
            },
            {
                gridIndex: 1,
                type: 'category',
                boundaryGap: false,
                axisLine: {onZero: true},
                data: [],
                position: 'top'
            }
        ],
        yAxis: [
            {
                name: '流量(m^3/s)',
                type: 'value',
                max: 500
            },
            {
                gridIndex: 1,
                name: '降雨量(mm)',
                type: 'value',
                inverse: true
            }
        ],
        series: [
            {
                name: '流量',
                type: 'line',
                symbolSize: 8,
                hoverAnimation: false,
                data: []
            },
            {
                name: '降雨量',
                type: 'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 8,
                hoverAnimation: false,
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
    var tmp_axis = [];

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
        );
        tmp_axis.push(
            {
                data: axis_name
            }
        )
    }

    var option2 = {
        legend: {
            data: legend_name
        },
        xAxis: tmp_axis,
        series: series_data
    };
    myChart.setOption(option2);
}

module.exports = EchartsLineDiffAxisVis;