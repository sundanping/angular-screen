var theme= {
    // 默认色板
    color: [
        '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ],
    // 图表标题
    title: {
        itemGap: 8,
        textStyle: {
            fontWeight: 'normal',
            color: '#008acd'    // 主标题文字颜色
        }
    },
    // 图例
    legend: {itemGap: 8},
    // 值域
    dataRange: {
        itemWidth: 15,
        //color:['#1e90ff','#afeeee']
        color: ['#2ec7c9', '#b6a2de']
    },
    toolbox: {
        color: ['#1e90ff', '#1e90ff', '#1e90ff', '#1e90ff'],
        effectiveColor: '#ff4500',
        itemGap: 8
    },
    // 提示框
    tooltip: {
        backgroundColor: 'rgba(50,50,50,0.5)',
        // 提示背景颜色，默认为透明度为0.7的黑色
        axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line',
            // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
                // 直线指示器样式设置
                color: '#ddd',
                type: 'dashed',
                width: 1
            },
            crossStyle: {
                color: '#ddd',
                width: 1
            },
            shadowStyle: {
                // 阴影指示器样式设置
                color: 'rgba(200,200,200,0.2)'
            }
        }
    },
    // 区域缩放控制器
    dataZoom: {
        dataBackgroundColor: '#efefff',
        // 数据背景颜色
        fillerColor: 'rgba(182,162,222,0.2)',
        // 填充颜色
        handleColor: '#008acd'    // 手柄颜色
    },
    // 网格
    grid: {
        borderColor: '#eee'
    },
    // 类目轴
    categoryAxis: {
        axisLine: {
            // 坐标轴线
            lineStyle: {
                // 属性lineStyle控制线条样式
                color: '#008acd',
                width: 1
            }
        },
        axisLabel: {
            // label
            skipFirst: true,
            margin: 3,
            textStyle: {color: '#999999'}
        },
        axisTick: {
            // 坐标轴线
            show: false,
            lineStyle: {
                // 属性lineStyle控制线条样式
                color: '#008acd',
                width: 1
            }
        },
        splitLine: {
            // 分隔线
            lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#eee']
            }
        }
    },
    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {
             show:false,
            // 坐标轴线
            lineStyle: {
                // 属性lineStyle控制线条样式
                //color: '#008acd',
                //width: 1
            }
        },
        axisLabel: {
            // label
            skipFirst: true,
            margin: 3,
            textStyle: {color: '#999999'}
        },
        axisTick: {
            // 坐标轴线
            show: false,
            lineStyle: {
                // 属性lineStyle控制线条样式
                //color: '#008acd',
                //width: 1
            }
        },
        splitArea: {
            //show:false
            show: true,
            areaStyle: {color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']}
        },
        splitLine: {
            // 分隔线
            lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#eee'],
                type: 'dashed'
            }
        }
    },
    polar: {
        axisLine: {
            // 坐标轴线
            lineStyle: {
                // 属性lineStyle控制线条样式
                color: '#ddd'
            }
        },
        splitArea: {
            show: true,
            areaStyle: {color: ['rgba(250,250,250,0.2)', 'rgba(200,200,200,0.2)']}
        },
        splitLine: {lineStyle: {color: '#ddd'}}
    },
    timeline: {
        //lineStyle: {color: '#008acd'},
        //controlStyle: {
        //    normal: {color: '#008acd'},
        //    emphasis: {color: '#008acd'}
        //},
        lineStyle: { color: '#27727B' },
        controlStyle: {
            normal: { color: '#27727B' },
            emphasis: { color: '#27727B' }
        },
        symbol: 'emptyCircle',
        symbolSize: 3
    },
    // 柱形图默认参数
    bar: {
        itemStyle: {
            normal: {borderRadius: 5},
            emphasis: {borderRadius: 5}
        }
    },
    // 折线图默认参数
    line: {
        smooth: true,//曲线是否光滑
        //itemStyle: {
        //    normal: {
        //        borderWidth: 2,
        //        borderColor: '#fff',
        //        lineStyle: { width: 3 }
        //    },
        //    emphasis: { borderWidth: 0 }
        //},
        symbol: 'circle',
        // 拐点图形类型
        symbolSize: 3    // 拐点图形大小
    },
    // K线图默认参数
    k: {
        itemStyle: {
            normal: {
                color: '#d87a80',
                // 阳线填充颜色
                color0: '#2ec7c9',
                // 阴线填充颜色
                lineStyle: {
                    width: 1,
                    color: '#d87a80',
                    // 阳线边框颜色
                    color0: '#2ec7c9'    // 阴线边框颜色
                }
            }
        }
    },
    // 散点图默认参数
    scatter: {
        //itemdStyle: {
        //    normal: {
        //        borderWidth: 1,
        //        borderColor: 'rgba(200,200,200,0.5)'
        //    },
        //    emphasis: { borderWidth: 0 }
        //},
        symbol: 'circle',
        // 图形类型
        symbolSize: 4    // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
    },
    // 雷达图默认参数
    radar: {
        symbol: 'emptyCircle',
        // 图形类型
        symbolSize: 3    //symbol: null,         // 拐点图形类型
        //symbolRotate: null,  // 图形旋转控制
    },
    map: {
        itemStyle: {
            normal: {
                areaStyle: {color: '#ddd'},
                label: {textStyle: {color: '#d87a80'}}
            },
            emphasis: {
                // 也是选中样式
                areaStyle: {color: '#fe994e'},
                label: {textStyle: {color: 'rgb(100,0,0)'}}
            }
        }
    },
    force: {itemStyle: {normal: {linkStyle: {strokeColor: '#1e90ff'}}}},
    chord: {
        padding: 4,
        itemStyle: {
            normal: {
                lineStyle: {
                    width: 1,
                    color: 'rgba(128, 128, 128, 0.5)'
                },
                chordStyle: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            },
            emphasis: {
                lineStyle: {
                    width: 1,
                    color: 'rgba(128, 128, 128, 0.5)'
                },
                chordStyle: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            }
        }
    },
    gauge: {
        startAngle: 225,
        endAngle: -45,
        axisLine: {
            // 坐标轴线
            show: true,
            //show: false,
            // 默认显示，属性show控制显示与否
            lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[0.2, '#2ec7c9'], [0.8, '#5ab1ef'], [1, '#d87a80']],
                width: 10
            }
        },
        axisTick: {
            // 坐标轴小标记
            splitNumber: 10,
            // 每份split细分多少段
            length: 15,
            // 属性length控制线长
            lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
            }
        },
        axisLabel: {
            // 坐标轴文本标签，详见axis.axisLabel
            textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: 'auto'
            }
        },
        splitLine: {
            // 分隔线
            length: 22,
            // 属性length控制线长
            lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
            }
        },
        pointer: {
            width: 5,
            color: 'auto'
        },
        title: {
            textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#333'
            }
        },
        detail: {
            textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: 'auto'
            }
        }
    },
    textStyle: {fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif'}

};
//var theme = {
//
//    color: [
//        '#2ec7c9','#b6a2de','#0cc2aa','#6887ff','#6cc788',
//        '#f77a99','#f44455','#97b552','#95706d','#dc69aa',
//        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
//        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
//    ],
//
//    title: {
//        textStyle: {
//            fontWeight: 'normal',
//            color: '#008acd'
//        }
//    },
//
//    legend: {
//        textStyle: {
//            color: '#aaa'
//        }
//    },
//
//    dataRange: {
//        itemWidth: 15,
//        color: ['#2ec7c9','#b6a2de'],
//        textStyle: {
//            color: '#ccc'
//        }
//    },
//
//    toolbox: {
//        color : ['#1e90ff', '#1e90ff', '#1e90ff', '#1e90ff'],
//        effectiveColor : '#ff4500'
//    },
//
//    tooltip: {
//        trigger: 'axis',
//        backgroundColor: 'rgba(0,0,0,1)',
//        padding: [10, 15, 10, 15],
//        axisPointer : {
//            type : 'line',
//            lineStyle : {
//                color: '#008acd'
//            },
//            crossStyle: {
//                color: '#008acd'
//            },
//            shadowStyle : {
//                color: 'rgba(120,120,120,0.1)'
//            }
//        }
//    },
//
//    dataZoom: {
//        dataBackgroundColor: 'rgba(120,120,120,0.1)',
//        fillerColor: 'rgba(120,120,120,0.05)',
//        handleColor: '#ccc'
//    },
//
//    grid: {
//        borderColor: 'rgba(120,120,120,0.1)',
//        x : 40,
//        y : 60,
//        x2: 40,
//        y2: 60
//    },
//
//    categoryAxis: {
//        axisLine: {
//            lineStyle: {
//                color: '#008acd'
//            }
//        },
//        axisLabel: {
//            textStyle: {
//                color: '#ccc'
//            }
//        },
//        splitLine: {
//            lineStyle: {
//                color: ['rgba(120,120,120,0.1)']
//            }
//        }
//    },
//
//    valueAxis: {
//        axisLine: {
//            lineStyle: {
//                color: '#008acd'
//            }
//        },
//        axisLabel: {
//            textStyle: {
//                color: '#ccc'
//            }
//        },
//        splitArea : {
//            show : true,
//            areaStyle : {
//                color: ['rgba(250,250,250,0)','rgba(200,200,200,0.05)']
//            }
//        },
//        splitLine: {
//            lineStyle: {
//                color: ['rgba(120,120,120,0.1)']
//            }
//        }
//    },
//
//    polar : {
//        name : {
//            textStyle: {
//                color: '#ccc'
//            }
//        },
//        axisLine: {
//            lineStyle: {
//                color: 'rgba(120,120,120,0.1)'
//            }
//        },
//        splitArea : {
//            show : true,
//            areaStyle : {
//                color: ['rgba(250,250,250,0.2)','rgba(120,120,120,0.1)']
//            }
//        },
//        splitLine : {
//            lineStyle : {
//                color : 'rgba(120,120,120,0.1)'
//            }
//        }
//    },
//
//    timeline : {
//        lineStyle : {
//            color : '#008acd'
//        },
//        controlStyle : {
//            normal : { color : '#008acd'},
//            emphasis : { color : '#008acd'}
//        },
//        symbol : 'emptyCircle',
//        symbolSize : 3
//    },
//
//    bar: {
//        itemStyle: {
//            normal: {
//                barBorderRadius: 5
//            },
//            emphasis: {
//                barBorderRadius: 5
//            }
//        }
//    },
//
//    line: {
//        smooth : true,
//        symbol: 'emptyCircle',
//        symbolSize: 3
//    },
//
//    k: {
//        itemStyle: {
//            normal: {
//                color: '#d87a80',
//                color0: '#2ec7c9',
//                lineStyle: {
//                    color: '#d87a80',
//                    color0: '#2ec7c9'
//                }
//            }
//        }
//    },
//
//    scatter: {
//        symbol: 'circle',
//        symbolSize: 4
//    },
//
//    radar : {
//        symbol: 'emptyCircle',
//        symbolSize:3
//    },
//
//    map: {
//        itemStyle: {
//            normal: {
//                areaStyle: {
//                    color: '#ddd'
//                },
//                label: {
//                    textStyle: {
//                        color: '#d87a80'
//                    }
//                }
//            },
//            emphasis: {
//                areaStyle: {
//                    color: '#fe994e'
//                }
//            }
//        }
//    },
//
//    force : {
//        itemStyle: {
//            normal: {
//                linkStyle : {
//                    color : '#1e90ff'
//                }
//            }
//        }
//    },
//
//    chord : {
//        itemStyle : {
//            normal : {
//                borderWidth: 1,
//                borderColor: 'rgba(128, 128, 128, 0.5)',
//                chordStyle : {
//                    lineStyle : {
//                        color : 'rgba(128, 128, 128, 0.5)'
//                    }
//                }
//            },
//            emphasis : {
//                borderWidth: 1,
//                borderColor: 'rgba(128, 128, 128, 0.5)',
//                chordStyle : {
//                    lineStyle : {
//                        color : 'rgba(128, 128, 128, 0.5)'
//                    }
//                }
//            }
//        }
//    },
//
//    gauge : {
//        axisLine: {
//            lineStyle: {
//                color: [[0.2, '#2ec7c9'],[0.8, '#5ab1ef'],[1, '#d87a80']],
//                width: 10
//            }
//        },
//        axisTick: {
//            splitNumber: 10,
//            length :15,
//            lineStyle: {
//                color: 'auto'
//            }
//        },
//        splitLine: {
//            length :22,
//            lineStyle: {
//                color: 'auto'
//            }
//        },
//        pointer : {
//            width : 5
//        }
//    },
//
//    textStyle: {
//        fontFamily: 'Arial, Verdana, sans-serif'
//    }
//};
