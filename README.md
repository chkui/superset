Superset
=========

**Apache Superset** (incubating) is a modern, enterprise-ready
business intelligence web application

[Author: Ryoha]

环境配置与安装
-----------
模块功能介绍
----------


开发记录
------------------------------------
------
#### **数据库连接**

db连接所需驱动及uri构造

|database   | pypi package            |	SQLAlchemy URI prefix|
|:-:        |:------------------------|:---------------------|
|MySQL	    |pip install mysqlclient   |mysql://|
|Postgres	  |pip install psycopg2|	postgresql+psycopg2://|
|Oracle	    |pip install cx_Oracle|	oracle://|
|sqlite	    | 	|sqlite://|
|Redshift	  |pip install sqlalchemy-redshift	|postgresql+psycopg2://|
|mssql      |pip install pymssql|	mssql://|
|Impala	    |pip install impyla	|impala://|
|SparkSQL   |	pip install pyhive	|jdbc+hive://|
|Greenplum  |pip install psycopg2	|postgresql+psycopg2://|
|Athena	    |pip install "PyAthenaJDBC>1.0.9"	|awsathena+jdbc://|
|Vertica	  |pip install sqlalchemy-vertica-python	|vertica+vertica_python://|
|ClickHouse	|pip install sqlalchemy-clickhouse	|clickhouse://|

**连接说明：**
* Mysql连接
> python访问Mysql数据库，需要安装pip mysqlclient。WindowsOS和LinuxOS只需正常的pip安装
即可；MacOS下会有可能会报错，如“IndexError：string index out of range ”，原因大概是
gcc相关的连接相关的问题，具体原因目前难以表述<br>
> 解决方法：修改mysql_config文件，将
  <code>libs="-L$pkglibdir"
  libs="$libs -l" </code>
  第二节修改为<code>libs="$libs -lmysqlclient -lssl -lcrypto" </code>

* Oracle连接
> 连接Oracle数据库，其中需要注意指定cx_Oracle的安装版本为5.3及以前，v6版本新增加了twophase
提交的相关功能，superset源码开发中修改极为困难，因此安装指定版本是最好的方法<br>
>除了对应的python库外，Oracle的连接，还需要在oracle官网下载对应的instantclient的Basic及
SDK，详细安装过程可以自行百度<br>
> MacOS和linuxOS注意安装时候的权限，建议sudo su后执行操作
-------------------

#### **前端开发**
> superset的前端部分在assets和static中，其中static是assets的软连接指向，因此可以用npm
命令启动页面监听，webpack打包前端的文件；npm的命令和前端依赖在package.json中，webpack打包
的设置信息在webpack.config.js中

webpack打包命令
> `cd static/assets`
<br>
> `npm run dev-fast`

assets功能构成
* /branding/： 页面右上角图表存储位置
* /dist/： webpack打包生成的js文件存储
* /docs/： readme文档
* /images/： 图片存储
* /javascripts/： js文件存储，大部分的前端改动都是这里
* /node_modules/： npm安装的所有依赖
* /spec/： 未知
* /stylesheets/： 未知
* /utils/： 未知
* /vendor/： 未知
* /visualizations/： 图表等可视化js脚本存储

图表类型增加流程，以echarts为例
> * viz.py负责数据传入
* assets/visualizations下新增js脚本用于接收数据并处理成echarts显示所需的
格式
* assets/visualizations下的main.js将新增的图表类型加入vis_type
* assets/javascripts/explore/stores/visTypes.js用于把新的图表类型加入进去
* assets/images/viz_thumbnail下增加新图表类型的缩略图

**1、数据处理**
> 图表的数据传入，由根目录下的viz.py负责，主要负责把数据源的表转换成pandas下的dataframe
格式；可以继承BaseViz类，并自行修改query_obj和get_data等方法，用于控制传输给前端数据的
格式

    例如新增一个echarts折线图的数据处理viz

    class EchartsLineBasicViz(BaseViz):
        viz_type = 'echarts_line_basic'
        is_timeseries = False
        def query_obj(self):
            d = super(EchartsLineBasicViz, self).query_obj()
            ......
        def get_data(self, df):
            return dict(
                records=df.to_dict(orient='records'),
                  columns=list(df.columns),)

df是BaseViz类的方法，通过query_obj生成查询，并返回的数据对象，to_dict函数基于pandas的
to_dict函数，其中的orient参数有六种类型以供转换
* orient=dict，dict类型是默认的参数，会形成 {column->{index->value}}这样的结构的字典。
单独提取每列的值及其索引，然后组合成一个字典，再将上述的列属性作为字典的key，值作为value。<br>
查询方式为dict[key1][key2]，其中key1为列属性key，key2为内层字典对应的键值，也就是index
* orient=list，结构为{column -> [values]} ,内层是一个value的列表，外层是对应列属性<br>
查询方式为： data_list[keys][index]
* orient=series 形成结构{column -> Series(values)}
<br>
查询方式为：data_series[key1][key2]或data_dict[key1]
* orient=split，形成形成{index -> [index], columns -> [columns], data -> [values]}
的结构，是将数据、索引、属性名单独脱离出来构成字典 <br>
查询方式：data_split[‘index’],data_split[‘data’],data_split[‘columns’]
* orient=records，形成[{column -> value}, … , {column -> value}]的结构，整体构成一个
列表，内层是将原始数据的每行提取出来形成字典 <br>
查询方式：data_records[index][key1]
* orient=index，形成{index -> {column -> value}}的结构，调用格式正好和’dict’ 对应的反
过来

> 图表页面中，图表本身的渲染工作，由assets/visualizations中的js负责，其中main.js是一个公
共入口，负责将所有的图表js传入visType，新增的js脚本需要增加进去；增加图表类型的操作在
assets/javascripts/explore/stores/visTypes.js中，在const visTypes下新增图表类型即可。
此处新增的名称与visualizations下的js文件名和main.js中的新增的名称需保持一致，也需要与根目录
下的viz.py中新增的viz Class的viz_type名称保持一致；

**2、新增js脚本**

新增的脚本需要引入echarts，如果需要其他的内容，需要用require引入；基本架构很简单，新增一个
函数，并module.exports此函数

函数以slice和payload为参数，slice应指的是具体的图表的实例，前端控件的选择由formData传入，
数据则由payload的data传入，每个图表的form_data和data，可以打开chorme的开发模式，在network中找到以form_data
开头的response的preview，如下图所示

<img src="/Users/Ryoha/Desktop/echarts_example.png">

部分脚本如下

    import echarts from 'echarts';
    require('echarts/theme/dark.js');
    require('echarts/theme/infographic.js');
    require('echarts/theme/macarons.js');
    require('echarts/theme/roma.js');
    require('echarts/theme/shine.js');
    require('echarts/theme/vintage.js');
    function EchartsLineBasicVis(slice, payload) {
        const fd = slice.formData;
        const json = payload.data;
        const data = json;
        const graph_id = "echarts_line" + fd.slice_id;
        const graph_type = fd.graph_type;
        const data_zoom = fd.dataZoom;
        const theme = fd.echarts_theme;
        ......
    myChart.setOption(option);
    }
    module.exports = EchartsLineBasicVis;

**3、mian.js新增**

**4、visTypes新增图表类型**

<img src="/Users/Ryoha/Desktop/echarts_line.png">
* label 中的值是在页面中选择图表类型的时候显示的标签
* showOnExplore含义未知
* controlPanelSections，用于增加控件，其中controlSetRows中，一行中有几个控件，就并行
显示几个，控件的名称在control.jsx中已经预设好，但是也可以自行增加，具体方法查询下方
* controlOverrides含义未知

**图表页面增加控件**
> 新增控件，可以在assets/javascripts/explore/stores/controls.jsx中新增。在export
const controls下添加；

例如
<pre>
metrics: {
  type: 'SelectControl',
  multi: true,
  label: t('Metrics'),
  validators: [v.nonEmpty],
  valueKey: 'metric_name',
  optionRenderer: m => <MetricOption metric={m}/>,
  valueRenderer: m => <MetricOption metric={m}/>,
  default: c => c.options && c.options.length > 0 ? [c.options[0].metric_name]
   : null,
  mapStateToProps: state => ({
      options: (state.datasource) ? state.datasource.metrics : [],
  }),
  description: t('One or many metrics to display'),
},
</pre>
控件的内容皆可自由定制
* metrics：是控件的名称，在visTypes.js中增加
* type：有多个已经预设好的，SelectControl,CheckboxControl等
* multi：未知含义
* label：t函数用于翻译label，可以在translations/中的zh下的json中，增加label的翻译内容
* validators：v函数用于验证类型
* valuesKey：未知含义
* optionRenderer：未知含义
* valueRenderer：未知含义
* default：默认选项
* mapStateToProps：未知选项
* descrption： 控件描述内容
-----------
#### **后端开发**