/**
 * Created by zhouyaxin on 2017/8/18.
 */
angular.module('app')
    .constant('config', {
        base_url : 'http://monitor.cloud.hoge.cn',
        chart_url : 'http://news.cloud.hoge.cn',//右下图标访问接口
        error_tip : "访问错误",
        error_message : "暂无数据",
        port : {
            i : {
                /**** 选题进展 ****/
                xietong_topic:'/xietong/topic/',

                /***资源地图***/
                map_list:'/xietong/map/',

                /***新媒体运营***/
                operate_list: '/yun/summary/',

                /**线索汇聚**/
                internet_list:'/hotnews/internet/',
                weixin_list:'/hotnews/weixin/',

                /**作品影响力排行**/
                mxu_content_list:'/mxu/content_list/',

                content_stats :"/mxu/content_statics/",//生产内容统计接口

                task_stats :"/xietong/task/",//任务统计接口

                hot_stats_title :"/hotnews/titles/",//热点统计 标题接口

            },
            c:{
                //热点统计 图表
                hot_stats_line :"/hotspots/consensus/tendency/",
                hot_stats_pie :"/hotspots/consensus/sex/",
                hot_stats_donut :"/hotspots/consensus/sentiment/",
                hot_stats_bar :"/hotspots/consensus/age/",
                hot_stats_map :"/hotspots/consensus/area/"
            }
        },

        getUrl : function( key, sign ){
            if(sign && sign =='c'){
                return this.chart_url + this.port[sign][key];
            }else{
                sign = 'i';
                return this.base_url + this.port[sign][key];
            }


        }
    });
