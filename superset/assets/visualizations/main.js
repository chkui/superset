/* eslint-disable global-require */
import deckglFactory from './deckgl/factory';

// You ***should*** use these to reference viz_types in code
export const VIZ_TYPES = {
  area: 'area',
  bar: 'bar',
  big_number: 'big_number',
  big_number_total: 'big_number_total',
  box_plot: 'box_plot',
  bubble: 'bubble',
  bullet: 'bullet',
  cal_heatmap: 'cal_heatmap',
  compare: 'compare',
  directed_force: 'directed_force',
  chord: 'chord',
  dist_bar: 'dist_bar',
  filter_box: 'filter_box',
  heatmap: 'heatmap',
  histogram: 'histogram',
  horizon: 'horizon',
  iframe: 'iframe',
  line: 'line',
  mapbox: 'mapbox',
  markup: 'markup',
  para: 'para',
  pie: 'pie',
  pivot_table: 'pivot_table',
  sankey: 'sankey',
  separator: 'separator',
  sunburst: 'sunburst',
  table: 'table',
  time_table: 'time_table',
  treemap: 'treemap',
  country_map: 'country_map',
  word_cloud: 'word_cloud',
  world_map: 'world_map',
  dual_line: 'dual_line',
  event_flow: 'event_flow',
  paired_ttest: 'paired_ttest',
  partition: 'partition',
  deck_scatter: 'deck_scatter',
  deck_screengrid: 'deck_screengrid',
  deck_grid: 'deck_grid',
  deck_hex: 'deck_hex',
  deck_path: 'deck_path',
  deck_geojson: 'deck_geojson',
  deck_multi: 'deck_multi',
  echarts_line_basic: 'echarts_line_basic',
  echarts_funnel: 'echarts_funnel',
  echarts_funnel_customized: 'echarts_funnel_customized',
  echarts_line_area_stack: 'echarts_line_area_stack',
  echarts_line_rainfall: 'echarts_line_rainfall',
  echarts_line_diff_axis: 'echarts_line_diff_axis',
  echarts_bar_polar: 'echarts_bar_polar',
  echarts_bar_animation: 'echarts_bar_animation',
  echarts_bar_minus: 'echarts_bar_minus',
  echarts_scatter_exp_reg: 'echarts_scatter_exp_reg',
  echarts_scatter_map: 'echarts_scatter_map',
  echarts_scatter_squ: 'echarts_scatter_squ',
  echarts_scatter_basic: 'echarts_scatter_basic',
  echarts_map_basic: 'echarts_map_basic',
  echarts_heatmap: 'echarts_heatmap',
  echarts_graph_expentency: 'echarts_graph_expentency',
};

const vizMap = {
  [VIZ_TYPES.area]: require('./nvd3_vis.js'),
  [VIZ_TYPES.bar]: require('./nvd3_vis.js'),
  [VIZ_TYPES.big_number]: require('./big_number.js'),
  [VIZ_TYPES.big_number_total]: require('./big_number.js'),
  [VIZ_TYPES.box_plot]: require('./nvd3_vis.js'),
  [VIZ_TYPES.bubble]: require('./nvd3_vis.js'),
  [VIZ_TYPES.bullet]: require('./nvd3_vis.js'),
  [VIZ_TYPES.cal_heatmap]: require('./cal_heatmap.js'),
  [VIZ_TYPES.compare]: require('./nvd3_vis.js'),
  [VIZ_TYPES.directed_force]: require('./directed_force.js'),
  [VIZ_TYPES.chord]: require('./chord.jsx'),
  [VIZ_TYPES.dist_bar]: require('./nvd3_vis.js'),
  [VIZ_TYPES.filter_box]: require('./filter_box.jsx'),
  [VIZ_TYPES.heatmap]: require('./heatmap.js'),
  [VIZ_TYPES.histogram]: require('./histogram.js'),
  [VIZ_TYPES.horizon]: require('./horizon.js'),
  [VIZ_TYPES.iframe]: require('./iframe.js'),
  [VIZ_TYPES.line]: require('./nvd3_vis.js'),
  [VIZ_TYPES.time_pivot]: require('./nvd3_vis.js'),
  [VIZ_TYPES.mapbox]: require('./mapbox.jsx'),
  [VIZ_TYPES.markup]: require('./markup.js'),
  [VIZ_TYPES.para]: require('./parallel_coordinates.js'),
  [VIZ_TYPES.pie]: require('./nvd3_vis.js'),
  [VIZ_TYPES.pivot_table]: require('./pivot_table.js'),
  [VIZ_TYPES.sankey]: require('./sankey.js'),
  [VIZ_TYPES.separator]: require('./markup.js'),
  [VIZ_TYPES.sunburst]: require('./sunburst.js'),
  [VIZ_TYPES.table]: require('./table.js'),
  [VIZ_TYPES.time_table]: require('./time_table.jsx'),
  [VIZ_TYPES.treemap]: require('./treemap.js'),
  [VIZ_TYPES.country_map]: require('./country_map.js'),
  [VIZ_TYPES.word_cloud]: require('./word_cloud.js'),
  [VIZ_TYPES.world_map]: require('./world_map.js'),
  [VIZ_TYPES.dual_line]: require('./nvd3_vis.js'),
  [VIZ_TYPES.event_flow]: require('./EventFlow.jsx'),
  [VIZ_TYPES.paired_ttest]: require('./paired_ttest.jsx'),
  [VIZ_TYPES.partition]: require('./partition.js'),
  [VIZ_TYPES.deck_scatter]: deckglFactory,
  [VIZ_TYPES.deck_screengrid]: deckglFactory,
  [VIZ_TYPES.deck_grid]: deckglFactory,
  [VIZ_TYPES.deck_hex]: deckglFactory,
  [VIZ_TYPES.deck_path]: deckglFactory,
  [VIZ_TYPES.deck_geojson]: deckglFactory,
  [VIZ_TYPES.deck_multi]: require('./deckgl/multi.jsx'),
  [VIZ_TYPES.echarts_line_basic]: require('./echarts_line_basic.js'),
  [VIZ_TYPES.echarts_funnel]: require('./echarts_funnel.js'),
  [VIZ_TYPES.echarts_funnel_customized]: require('./echarts_funnel_customized.js'),
  [VIZ_TYPES.echarts_line_area_stack]: require('./echarts_line_area_stack.js'),
  [VIZ_TYPES.echarts_line_rainfall]: require('./echarts_line_rainfall.js'),
  [VIZ_TYPES.echarts_line_diff_axis]: require('./echarts_line_diff_axis.js'),
  [VIZ_TYPES.echarts_bar_polar]: require('./echarts_bar_polar.js'),
  [VIZ_TYPES.echarts_bar_animation]: require('./echarts_bar_animation.js'),
  [VIZ_TYPES.echarts_bar_minus]: require('./echarts_bar_minus.js'),
  [VIZ_TYPES.echarts_scatter_exp_reg]: require('./echarts_scatter_exp_reg.js'),
  [VIZ_TYPES.echarts_scatter_map]: require('./echarts_scatter_map.js'),
  [VIZ_TYPES.echarts_scatter_squ]: require('./echarts_scatter_squ.js'),
  [VIZ_TYPES.echarts_scatter_basic]: require('./echarts_scatter_basic.js'),
  [VIZ_TYPES.echarts_map_basic]: require('./echarts_map_basic.js'),
  [VIZ_TYPES.echarts_heatmap]: require('./echarts_heatmap.js'),
  [VIZ_TYPES.echarts_graph_expentency]: require('./echarts_graph_expentency.js'),
};
export default vizMap;
