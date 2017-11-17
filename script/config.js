/*****公用config文件*****/
angular.module('app')
    .constant('config', {
        base_url : 'http://monitor.cloud.hoge.cn',//10.0.31.179:8000 本地地址
        chart_url : 'http://news.cloud.hoge.cn',//右下图标访问接口
        error_tip :'访问错误',
        error_message : '暂无数据',

        port : {
            content_stats :"/mxu/content_statics/",//生产内容统计接口

            task_stats :"/xietong/task/",//任务统计接口

            hot_stats_title :"/hotnews/titles/",//热点统计 标题接口
            c:{
                //热点统计 图表
                hot_stats_line :"/hotspots/consensus/tendency/",
                hot_stats_pie :"/hotspots/consensus/sex/",
                hot_stats_donut :"/hotspots/consensus/sentiment/",
                hot_stats_bar :"/hotspots/consensus/age/",
                hot_stats_map :"/hotspots/consensus/area/"
            }

        },
        getUrl : function(key,type){
            if(type == 'c'){
                return this.chart_url + this.port[type][key];
            }
            return this.base_url + this.port[key];
        }
    });