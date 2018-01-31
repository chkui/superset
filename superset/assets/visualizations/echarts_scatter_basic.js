import echarts from 'echarts';

function EchartsScatterBasicVis(slice, payload) {
    var div = d3.select(slice.selector);
    var html = '<div id="e_scatter_basic" style="width:' + slice.width() + 'px;' + ''
        + 'px;height:' + slice.height() + 'px;"></div>';
    div.html(html);

    var myChart = echarts.init(document.getElementById('e_scatter_basic'));

    var option = {
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
            offset: 0,
            color: '#f7f8fa'
        }, {
            offset: 1,
            color: '#f7f8fa'
        }]),
        legend: {
            right: 10,
            data: []
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true
        },
        series: []
    };

    myChart.setOption(option);

    const fd = slice.formData;
    const json = payload.data;
    const data = json;
    const keys = data['key'];

    var x_axis = fd.x;
    var y_axis = fd.y;
    var entity = fd.entity;
    var bubble_size = fd.size;
    var data_series = [];
    var shadowColors = ['rgba(120, 36, 50, 0.5)', 'rgba(25, 100, 150, 0.5)'];
    var itemColor1 = ['rgb(251, 118, 123)', 'rgb(129, 227, 238)'];
    var itemColor2 = ['rgb(204, 46, 72)', 'rgb(25, 183, 207)'];


    var legend_name = [];
    for (var i=0;i<data.length;i++) {
        legend_name.push(data[i]['key']);
        var tmp_data = [];
        for (var j=0;j<data[i]['values'].length;j++){
            tmp_data.push([
                data[i]['values'][j][x_axis],
                data[i]['values'][j][y_axis],
                data[i]['values'][j][bubble_size],
                data[i]['values'][j][entity]
            ])
        }
        data_series.push({
            name: legend_name[i],
            data: tmp_data,
            type: 'scatter',
            symbolSize: function (data) {
                return Math.sqrt(data[2])/5e2;
            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3]
                    },
                    postion: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: shadowColors[i],
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color:itemColor1[i]
                    },{
                        offset: 1,
                        color:itemColor2[i]
                    }])
                }
            }
        });
    }

    var option2 = {
        legend: {
            data: legend_name
        },
        series: data_series
    }
    myChart.setOption(option2);

}

module.exports = EchartsScatterBasicVis;