import echarts from 'echarts';
import {getColorFromScheme} from '../javascripts/modules/colors';

function echartsFunnelVis(slice, payload) {
    const div = d3.select(slice.selector);
    var html = '<div id="main" style="width: ' + slice.width() + ''
        + 'px;height:' + slice.height() + 'px;">haha</div>';
    div.html(html);

    var myChart = echarts.init(document.getElementById('main'));
    var option = {
        title: {
            text: '漏斗图(对比)',
            subtext: '纯属虚构',
            left: 'left',
            top: 'bottom'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: []
        },
        calculable: true,
        series: [
            {
                name: '漏斗图',
                type: 'funnel',
                width: '40%',
                height: '45%',
                left: '5%',
                top: '50%',
                funnelAlign: 'right',
                center: ['25%', '25%'],  // for pie
                data: []
            },
            {
                name: '金字塔',
                type: 'funnel',
                width: '40%',
                height: '45%',
                left: '5%',
                top: '5%',
                sort: 'ascending',
                funnelAlign: 'right',
                center: ['25%', '75%'],  // for pie
                data: []
            },
            {
                name: '漏斗图',
                type: 'funnel',
                width: '40%',
                height: '45%',
                left: '55%',
                top: '5%',
                funnelAlign: 'left',
                center: ['75%', '25%'],  // for pie
                data: []
            },
            {
                name: '金字塔',
                type: 'funnel',
                width: '40%',
                height: '45%',
                left: '55%',
                top: '50%',
                sort: 'ascending',
                funnelAlign: 'left',
                center: ['75%', '75%'],  // for pie
                data: []
            }
        ]
    };
    myChart.setOption(option);

    const fd = slice.formData;
    const json = payload.data;

    var colors = getColorFromScheme(fd.color_scheme);
    console.log(colors);
    var data_name = [];
    var max_value = 0;
    const data = json;
    data.forEach(function (item, index, array) {
        data_name.push(item['name']);
        if (item['value'] > max_value) {
            max_value = item['value'];
        }
    });
    var tmp_series = [];
    for (var i = 1; i < 5; i++) {
        tmp_series.push({
            data: data
        });
    }
    var option2 = {
        legend: {data: data_name},
        series: tmp_series
    };

    myChart.setOption(option2);
}

module.exports = echartsFunnelVis;