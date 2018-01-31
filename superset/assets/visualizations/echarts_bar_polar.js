import echarts from 'echarts';
import {getColorFromScheme} from '../javascripts/modules/colors';


function EchartsBarPolarVis(slice, payload) {
    var div = d3.select(slice.selector);
    var html = '<div id="e_bar_polar" style="width:' + slice.width() + 'px;' + ''
        + 'px;height:' + slice.height() + 'px;"></div>';
    div.html(html);

    var myChart = echarts.init(document.getElementById('e_bar_polar'));

    var option = {
        angleAxis: {
            type: 'category',
            data: [],
            z: 10
        },
        radiusAxis: {},
        polar: {},
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
                type: 'bar',
                data: tmp_data,
                coordinateSystem: 'polar',
                name: legend_name[i],
                stack: 'a'
            }
        )
    }

    var option2 = {
        angleAxis: {
            data: axis_name
        },
        series: series_data
    };

    myChart.setOption(option2);
}

module.exports = EchartsBarPolarVis;
