import echarts from 'echarts';

require('echarts/theme/dark.js');
require('echarts/theme/infographic.js');
require('echarts/theme/macarons.js');
require('echarts/theme/roma.js');
require('echarts/theme/shine.js');
require('echarts/theme/vintage.js');

function EchartsLineDoubleAxisVis(slice, payload) {
    const fd = slice.formData;
    const json = payload.data;
    const data = json;
    const theme = fd.echarts_theme;
    const graph_type = fd.graph_type;
    const records = data['records'];
    const data_column = data.columns;
    const metrics = fd.metrics;
    const smooth_type = fd.smooths;

    let legend_name = [];
    let axis_name = [];
    let series_data = [];
    let double_axis_info = [];

    for (let i=0; i<records.length; i++) {
        axis_name.push(records[i][data_column][0])
    }
    for (let i=0; i<metrics.length; i++) {
        legend_name
    }


}

module.exports = EchartsLineDoubleAxisVis;