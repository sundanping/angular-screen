var myChart;

angular.module('app')
    .component('taskDonut', {
        template: '<div id="taskDonut" style="width:100%; height: 100%;"></div>',
        controller: ['$element', '$timeout','$rootScope', 'config', 'http','$interval',
            function (ele, $timeout, $rootScope, config, http,$interval) {
                var _this =this;
                setTimeout(function () {
                    _this.myChart = echarts.init(ele[0].querySelector('#taskDonut'));

                    /**
                     start
                     */
                    _this.option = {
                        backgroundColor: 'rgba(16,43,85,0.6)',
                        color:['#ce4272','#0554f5','#f3972e','#008aed','#14da7d'],
                        textStyle:{
                            color:'#fff'
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',
                            y: 'bottom',
                            textStyle:{
                                color:'#fff'
                            },
                            data:[]
                        },
                        series: [
                            {
                                name:'任务统计',
                                type:'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: ' {d}%',//{b} \n
                                        // position: 'center',
                                        textStyle: {
                                            fontSize: '14',
                                            fontWeight: 'bold'
                                        }
                                    },
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '16',
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: true
                                    }
                                },
                                data:[]
                            }
                        ]
                    };


                    // 使用刚指定的配置项和数据显示图表。
                    _this.myChart.setOption(_this.option);
                    _this._getTask();
                    $interval(function(){
                        _this._getTask();
                    },30000);

                });

                _this._getTask = function() {
                    http(config.getUrl('task_stats'))
                        .then(function (data) {
                            if(data.error_code == '0' && data.error_message == ''){
                                if(!data.result[0]){return;}
                                var seriesArr=[],legendArr=[];
                                angular.forEach(data.result,function (value) {
                                    legendArr.push(value.title);
                                    seriesArr.push({value:value.total,name:value.title});
                                });
                                _this.myChart.setOption({
                                        legend:{
                                            data:legendArr
                                        },
                                        series : [{
                                            data: seriesArr
                                        }]
                                    }
                                );

                            }else{
                                //接口访问错误
                            }
                        });
                };
            }]
    })
    .component('contentLine', {
        template: '<div id="contentLine" style="width:100%; height: 100%;"></div>',
        controller: ['$element', '$timeout','$rootScope', 'config', 'http','$interval',
            function (ele, $timeout, $rootScope, config, http,$interval) {
                var _this =this;
                setTimeout(function () {
                    _this.myChart = echarts.init(ele[0].querySelector('#contentLine'));

                    /**
                     start
                     */
                    _this.option = {
                        color:['#8d6cf9','#f36764','#fc8e26','#14da7e'],
                        legend: {
                            right:'60',
                            top:'10',
                            textStyle:{
                                color:'#fff'
                            },
                            data:['文稿','视频','专题','图集']
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        textStyle:{
                            color:'#fff'
                        },
                        grid: {
                            left: '3%',
                            right: '7%',
                            bottom: '5%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                name:'日期',
                                boundaryGap : false,
                                axisLine:{
                                    lineStyle:{
                                        color: ['#71a4f2'],
                                        width:'1',
                                        type:'solid'
                                    }
                                },
                                axisTick: {
                                    show:false,
                                    // interval:15,
                                    alignWithLabel: true
                                },
                                data : []
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name:'数量',
                                // nameGap:5,
                                axisLine:{
                                    lineStyle:{
                                        color: ['#71a4f2'],
                                        width:'1',
                                        type:'solid'
                                    }
                                },
                                axisTick: {
                                    show:false,
                                    // interval:15,
                                    alignWithLabel: true
                                },
                                splitLine:{
                                    // show:false
                                    lineStyle:{
                                        color: ['rgba(113,164,242,0.3)'],
                                        width:'1',
                                        type:'dashed'
                                    }
                                },
                                axisPointer:{
                                    show:true
                                }
                            }
                        ],
                        series : [
                            {
                                name:'文稿',
                                type:'line',
                                smooth: true,
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data:[]
                            },
                            {
                                name:'视频',
                                type:'line',
                                smooth: true,
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data:[]
                            },
                            {
                                name:'专题',
                                type:'line',
                                smooth: true,
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data:[]
                            },
                            {
                                name:'图集',
                                type:'line',
                                smooth: true,
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data:[]
                            }
                        ]
                    };


                    // 使用刚指定的配置项和数据显示图表。
                    _this.myChart.setOption(_this.option);
                    _this._getContent();
                    $interval(function(){
                        _this._getContent();
                    },30000);

                });

                _this._getContent = function() {
                    http(config.getUrl('content_stats'))
                        .then(function (data) {
                            if(data.error_code == '0' && data.error_message == ''){
                                if(!data.result[0]){return;}
                                var seriesArr={news:[],video:[],special:[],tuji:[]},xAxisArr=[];
                                angular.forEach(data.result,function (value) {
                                    xAxisArr.push(value.ref_date);
                                    seriesArr.news.push(value.news_num);
                                    seriesArr.video.push(value.video_num );
                                    seriesArr.special.push(value.special_num );
                                    seriesArr.tuji.push(value.tuji_num );
                                });
                                _this.myChart.setOption({
                                        xAxis:{
                                            data:xAxisArr
                                        },
                                        series : [{
                                                data: seriesArr.news
                                            },
                                            {
                                                data: seriesArr.video
                                            },
                                            {
                                                data: seriesArr.special
                                            },
                                            {
                                                data: seriesArr.tuji
                                            }]
                                    }
                                );

                            }else{
                                //接口访问错误
                            }
                        });
                };
            }]
    })
    .component('lineHot', {
        template: '<div id="lineHot" style="width:100%; height: 100%;"></div>',
        controller: ['$element', '$timeout','$rootScope', 'config', 'http',
            function (ele, $timeout, $rootScope, config, http) {
                var _this =this;
                setTimeout(function () {
                    _this.myChart = echarts.init(ele[0].querySelector('#lineHot'));

                    /**
                     start
                     */
                    _this.option = {
                        color:['#14da7d','#8c6bf9','#f36764','#005edd'],
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['网站','微信','微博'],
                            right:'60',
                            top:'30',
                            textStyle:{
                                color:'#fff'
                            }

                        },
                        textStyle:{
                            color:'#fff'
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                name:'日期',
                                // nameLocation:'start',
                                nameGap:5,
                                axisLine:{
                                    lineStyle:{
                                        color: ['#71a4f2'],
                                        width:'1',
                                        type:'solid'
                                    }
                                },
                                axisTick: {
                                    show:false,
                                    // interval:15,
                                    alignWithLabel: true
                                },
                                data : []
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLabel : {
                                    // formatter: '{value} °C'
                                    formatter: '{value}'
                                },
                                name:'访问量',
                                nameGap:10,
                                color:'#fff',
                                axisTick: {
                                    show:false,
                                    // interval:15,
                                    alignWithLabel: true
                                },
                                axisLine:{
                                    lineStyle:{
                                        color: ['#71a4f2'],
                                        width:'1',
                                        type:'solid'
                                    }
                                },
                                splitLine:{
                                    // show:false
                                    lineStyle:{
                                        color: ['rgba(113,164,242,0.3)'],
                                        width:'1',
                                        type:'dashed'
                                    }
                                },
                                axisPointer:{
                                    show:true
                                }
                            }
                        ],
                        series : [
                            {
                                name:'网站',
                                smooth: true,
                                type:'line',
                                data:[]

                            },
                            {
                                name:'微信',
                                type:'line',
                                smooth: true,
                                data:[]

                            },
                            {
                                name:'微博',
                                type:'line',
                                smooth: true,
                                data:[]

                            }
                        ]

                    };


                    // 使用刚指定的配置项和数据显示图表。
                    _this.myChart.setOption(_this.option);
                    _this._getHot();
                    $rootScope.$watch('title', function () {
                        _this._getHot();
                    });

                });

                _this._getHot = function() {
                    http(config.getUrl('hot_stats_line','c')+'?title='+$rootScope.title)
                        .then(function (data) {
                            if(data.error_code == '0' && data.error_message == ''){
                                if(!data.result||!data.result.hot_tendency || !data.result.hot_tendency[0]){return;}
                                var seriesArr={news:[],wx:[],wb:[]},xAxisArr=[];
                                angular.forEach(data.result.hot_tendency,function (value) {
                                    xAxisArr.push(value.date);
                                    seriesArr.news.push(value.news);
                                    seriesArr.wx.push(value.wx );
                                    seriesArr.wb.push(value.wb );
                                });
                                _this.myChart.setOption({
                                    xAxis:{
                                      data:xAxisArr
                                    },
                                    series : [{
                                                data: seriesArr.news
                                            },
                                            {
                                                data: seriesArr.wx
                                            },
                                            {
                                                data: seriesArr.wb
                                            }]
                                    }
                                );

                            }else{
                                //接口访问错误
                            }
                        });
                };
            }]
    })
    .component('pieSex', {
        template: '<div id="pieSex" style="width:100%; height: 100%;"></div>',
        controller: ['$element', '$timeout','$rootScope', 'config', 'http',
            function (ele, $timeout, $rootScope, config, http) {
                var _this =this;
                setTimeout(function () {
                    _this.myChart = echarts.init(ele[0].querySelector('#pieSex'));

                    /**
                     start
                     */
                    _this.option = {
                        color:['#db546c','#007dde'],
                        series : [
                            {
                                name: '男女比例',
                                type: 'pie',
                                radius : '60%',
                                center: ['50%', '55%'],
                                label: {
                                            normal: {
                                                show: true,
                                                formatter: '{b} \n {d}%',
                                                textStyle: {
                                                    color:'#fff',
                                                    fontSize: '12',
                                                    fontWeight: 'bold'
                                                }
                                            },
                                            emphasis: {
                                                show: true,
                                                formatter: '{b} \n {d}%',
                                                textStyle: {
                                                    color:'#fff',
                                                    fontSize: '14',
                                                    fontWeight: 'bold'
                                                }
                                            }
                                        },
                                labelLine: {
                                            normal: {
                                                color:'#fff',
                                                length:7,
                                                length2:5,
                                                show: true
                                            }
                                        },
                                data:[],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };


                    // 使用刚指定的配置项和数据显示图表。
                    _this.myChart.setOption(_this.option);

                    _this._getSex();

                    $rootScope.$watch('title', function () {
                        _this._getSex();
                    });

                });

                _this._getSex = function() {
                    http(config.getUrl('hot_stats_pie','c')+'?title='+$rootScope.title)
                        .then(function (data) {
                            if(data.error_code == '0' && data.error_message == ''){
                                _this.myChart.setOption({
                                    series : [{
                                        data: [
                                                { name: '女生', value: data.result.women*100, selected:true },
                                                { name: '男生', value: data.result.man*100 }
                                            ]
                                        }]
                                    }
                                );

                            }else{
                                //接口访问错误
                            }
                        });
                };
            }]
    })
    .component('donutEchart', {
        template: '<div id="donutEchart" style="width:100%; height: 100%;"></div>',
        controller: ['$element', '$timeout','$rootScope', 'config', 'http', '$interval',
            function (ele, $timeout, $rootScope, config, http, $interval) {
                var _this =this;
                setTimeout(function () {
                    _this.myChart = echarts.init(ele[0].querySelector('#donutEchart'));

                    /**
                     start
                     */
                    _this.option = {
                        color:['#007dde','#db546c','#f69420'],
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        series: [
                            {
                                name:'情感分析',
                                type:'pie',
                                center:'55%',
                                radius: ['40%', '60%'],
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: '{b} \n {d}%',
                                        textStyle: {
                                            color:'#fff',
                                            fontSize: '12',
                                            fontWeight: 'bold'
                                        }
                                    },
                                    emphasis: {
                                        show: true,
                                        formatter: '{b} \n {d}%',
                                        textStyle: {
                                            color:'#fff',
                                            fontSize: '14',
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        color:'#fff',
                                        length:7,
                                        length2:5,
                                        show: true
                                    }
                                },
                                data:[]
                            }
                        ]
                    };


                    // 使用刚指定的配置项和数据显示图表。
                    _this.myChart.setOption(_this.option);

                    _this._getDonut();
                    // $interval(function () {
                    //     _this._getDonut();
                    // },15000);
                    $rootScope.$watch('title', function () {
                        _this._getDonut();
                    });

                });

                _this._getDonut = function() {
                    http(config.getUrl('hot_stats_donut','c')+'?title='+$rootScope.title)
                        .then(function (data) {
                            if(data.error_code == '0' && data.error_message == ''){
                                var seriesArr=[];
                                angular.forEach(data.result,function (value) {
                                    switch(value.iSentiment)
                                        {
                                            case '1':
                                                seriesArr.push({value:value.sum_iCount, name:'正面'});
                                                break;
                                            case '-1':
                                                seriesArr.push({value:value.sum_iCount, name:'负面'});
                                                break;
                                            case '0':
                                                seriesArr.push({value:value.sum_iCount, name:'中立'});
                                                break;
                                            default:
                                                break;
                                        }
                                });
                                _this.myChart.setOption({
                                        series : [{
                                            data: seriesArr
                                        }]
                                    }
                                );

                            }else{
                                //接口访问错误
                            }
                        });
                };
            }]
    })
    .component('barsEchart', {
        template: '<div id="barsEchart" style="width:100%; height: 100%;"></div>',
        controller: ['$element', '$timeout','$rootScope', 'config', 'http', '$interval',
            function (ele, $timeout, $rootScope, config, http, $interval) {
                var _this =this;
                setTimeout(function () {
                    _this.myChart = echarts.init(ele[0].querySelector('#barsEchart'));

                    /**
                     start
                     */
                    _this.option = {
                        color: ['#4da2fe'],
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            top:40,
                            containLabel: true
                        },
                        textStyle:{
                            color:'#fff'
                        },
                        xAxis : [
                            {
                                type : 'category',
                                axisTick: {
                                    show:false,
                                    alignWithLabel: true
                                },
                                axisLine:{
                                    lineStyle:{
                                        color: ['#71a4f2'],
                                        width:'1',
                                        type:'solid'
                                    }
                                },
                                data : []
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLabel : {
                                    interval:15,
                                    formatter: '{value}%',
                                    textStyle: {
                                        // fontSize:'13'
                                    }
                                },
                                axisTick: {
                                    show:false,
                                    // interval:15,
                                    alignWithLabel: true
                                },
                                color:'#fff',
                                axisLine:{

                                    lineStyle:{
                                        // show:false,
                                        color: ['#71a4f2'],
                                        width:'1',
                                        type:'solid'
                                    }
                                },
                                splitLine:{
                                    // interval:15,
                                    lineStyle:{
                                        color: ['rgba(113,164,242,0.1)'],
                                        width:'1',
                                        type:'solid'
                                    }
                                },
                                axisPointer:{
                                    show:true
                                }
                            }

                        ],
                        series : [
                            {
                                name:'年龄层次',
                                type:'bar',
                                barWidth: '50%',
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position: 'top',
                                            formatter: '{c}%'
                                        }
                                    }
                                },
                                data:[]
                            }
                        ]
                    };


                    // 使用刚指定的配置项和数据显示图表。
                    _this.myChart.setOption(_this.option);
                    _this._getBars();
                    $rootScope.$watch('title', function () {
                        _this._getBars();
                    });
                });

                _this._getBars = function() {
                    http(config.getUrl('hot_stats_bar','c')+'?title='+$rootScope.title)
                        .then(function (data) {
                            // _this.barData[0].datapoints.push({ x: value.age, y:value.rate*100 });
                            if(data.error_code == '0' && data.error_message == ''){
                                var seriesArr=[],xAxisArr=[];
                                angular.forEach(data.result,function (value) {
                                    xAxisArr.push(value.age);
                                    seriesArr.push(value.rate*100);
                                });
                                _this.myChart.setOption({
                                        xAxis:{
                                            data:xAxisArr
                                        },
                                        series : [{
                                            data: seriesArr
                                        }]
                                    }
                                );

                            }else{
                                //接口访问错误
                            }
                        });
                };
            }]
    })
    .component('mapEchart', {
        template: '<div id="mapEchart" style="width:100%; height: 100%;"></div>',
        controller: ['$element', '$timeout','$rootScope', 'config', 'http', '$interval',
            function (ele, $timeout, $rootScope, config, http, $interval) {
            var _this =this;
            var container = ele[0].querySelector('#mapEchart');
            setTimeout(function () {
                _this.myChart = echarts.init(ele[0].querySelector('#mapEchart'));

                /**
                 地图 start
                 */
                _this.option = {
                    title: {
                        show: false,
                        text: '',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        show:false,
                        trigger: 'item'
                    },
                    // textStyle:{
                    //     color:'#fff'
                    // },
                    legend: {
                    },
                    visualMap: {
                        show:false,
                        min: 0,
                        // max: 2500,
                        left: 'right',
                        top: 'bottom',
                        inRange: {
                            color: ['#6d9ce6', '#0763f3']
                        },
                        textStyle: {
                            color: '#fff'
                        },
                        itemWidth:10,
                        itemHeight:70,
                        text: ['高','低'],
                        calculable: true
                    },
                    toolbox: {
                        show: false
                    },
                    series: [
                        {
                            name: '区域分析',
                            type: 'map',
                            mapType: 'china',
                            // right:40,
                            left:'right',
                            // top:20,
                            showLegendSymbol: false,
                            roam: false,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle:{
                                normal: {
                                    areaColor: '#567bb6'
                                },
                                emphasis: {
                                    areaColor: '#567bb6'
                                }
                            },
                            data:[]
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                _this.myChart.setOption(_this.option);

                _this._getMap();
                // $interval(function () {
                //     /**地图**/
                //     _this._getMap();
                // },15000);

                $rootScope.$watch('title', function () {
                    _this._getMap();
                });
            });

            _this._getMap = function() {
                    http(config.getUrl('hot_stats_map','c')+'?title='+$rootScope.title)
                        .then(function (data) {
                            if(data.error_code == '0' && data.error_message == ''){
                                var seriesArr=[],yAxisArr=[];
                                angular.forEach(data.result,function (value) {
                                    seriesArr.unshift({name:value.kRegion,value:value.count});
                                    // seriesArr.unshift(parseInt(value.count_kRegion));
                                });
                                _this.myChart.setOption({
                                        visualMap:{
                                            max:seriesArr[seriesArr.length-1].value
                                        },
                                        series : [{
                                            data: seriesArr
                                        }]
                                    }
                                );

                            }else{
                                //接口访问错误
                            }
                        });
                };
        }]
    })
    .component('barEchart', {
    template: '<div id="demo" style="width:100%; height: 100%;"></div>',
    controller: ['$element', '$timeout', '$rootScope', 'config', 'http', '$interval',
        function (ele, $timeout, $rootScope, config, http, $interval) {
        var _this =this;
        var container = ele[0].querySelector('#demo');
        // 指定图表的配置项和数据
        _this.option = {
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '3%',
                    right: '6%',
                    bottom: '3%',
                    top:10,
                    containLabel: true
                },
                xAxis: {
                    show:false
                },
                yAxis: {
                    type: 'category',
                    axisLine:{
                        lineStyle:{
                            width:'0'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    data: []
                },
                textStyle:{
                    color:'#fff'
                },
                label:{
                    normal:{
                        show: true,
                        position: 'right'
                    },
                    emphasis:{
                        show: true,
                        position: 'right'
                    }
                },
                // barWidth:60,
                series: [
                    {
                        name: '区域分布',
                        type: 'bar',
                        barMaxWidth:15,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0,
                                    [
                                        {offset: 0, color: '#83bff6'},
                                        {offset: 0.5, color: '#188df0'},
                                        {offset: 1, color: '#188df0'}
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                        data: []
                    }
                ]
            };
        setTimeout(function () {
            _this.myChart = echarts.init(ele[0].querySelector('#demo'));

            // 使用刚指定的配置项和数据显示图表。
            _this.myChart.setOption(_this.option);
            _this._getBar();
            // $interval(function () {
            //     /**柱状图**/
            //     _this._getBar();
            // },15000);
            $rootScope.$watch('title', function () {
                _this._getBar();
            });
        });
        _this._getBar = function() {
                http(config.getUrl('hot_stats_map','c')+'?title='+$rootScope.title)
                    .then(function (data) {
                        if(data.error_code == '0' && data.error_message == ''){
                            var seriesArr=[],yAxisArr=[];
                            var list = data.result.slice(0,6);
                            angular.forEach(list,function (value) {
                                yAxisArr.unshift(value.kRegion);
                                seriesArr.unshift(parseInt(value.count));
                            });
                            _this.myChart.setOption({
                                    yAxis:{
                                        data: yAxisArr
                                    },
                                    series : [{
                                        data: seriesArr
                                    }]
                                }
                            );

                        }else{
                            //接口访问错误
                        }
                    });
            };

    }]
});