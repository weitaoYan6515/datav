export default {
    cline: {
        name: "折线图",
        width: 300,
        height: 300,
        options: {
            title: {
                show: true,
                text: "折线图",
                left: "center",
                textStyle: {
                    color: "#fff",
                    fontSize: 23,
                },
            },
            xAxis: {
                show: true,
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                axisLabel: {
                    show: true,
                    color: "#fff",
                    fontSize: 16,
                },
            },
            yAxis: {
                show: true,
                type: "value",
                axisLabel: {
                    show: true,
                    color: "#fff",
                    fontSize: 16,
                },
            },
            grid: {
                left: 50,
                top: 50,
                right: 10,
                bottom: 30,
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: "line",
                    smooth: true,
                    itemStyle: {
                        color: null,
                    },
                    areaStyle: {},
                },
            ],
        }
    },

    cbar: {
        name: "柱状图",
        width: 300,
        height: 300,
        options: {
            title: {
                show: true,
                text: "柱状图",
                left: "center",
                textStyle: {
                    color: "#fff",
                    fontSize: 23,
                },
            },
            xAxis: {
                show: true,
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                axisLabel: {
                    show: true,
                    color: "#fff",
                    fontSize: 16,
                },
            },
            yAxis: {
                show: true,
                type: "value",
                axisLabel: {
                    show: true,
                    color: "#fff",
                    fontSize: 16,
                },
            },
            grid: {
                left: 50,
                top: 50,
                right: 10,
                bottom: 30,
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: "bar",
                    itemStyle: {
                        color: null,
                    },
                    areaStyle: {},
                },
            ],
        }
    },

    cpie: {
        name: "饼状图",
        width: 300,
        height: 300,
        options: {
            title: {
                show: true,
                text: "饼状图",
                left: "center",
                textStyle: {
                    color: "#fff",
                    fontSize: 23,
                },
            },
            series: [
                {
                    name: "Access From",
                    type: "pie",
                    radius: ["40%", "70%"],
                    radiusX: 40,
                    radiusY: 70,
                    // roseType: "radius",
                    data: [
                        {
                            value: 1048,
                            name: "Search Engine",
                            itemStyle: { color: null },
                        },
                        {
                            value: 735,
                            name: "Direct",
                            itemStyle: {
                                color: null,
                            },
                        },
                        {
                            value: 580,
                            name: "Email",
                            itemStyle: {
                                color: null,
                            },
                        },
                        {
                            value: 484,
                            name: "Union Ads",
                            itemStyle: {
                                color: null,
                            },
                        },
                        {
                            value: 300,
                            name: "Video Ads",
                            itemStyle: {
                                color: null,
                            },
                        },
                    ],
                    label: {
                        color: "#fff",
                        fontSize: 16,
                    },
                },
            ],
        }
    },
}

//格式化数据
export function formatDataLineBar(data, options) {
    options.xAxis.data = data.x;
    let series = []
    let length = data.data.length
    for (let i = 0; i < length; i++) {
        series.push(Object.assign({}, options.series[0], {
            name: data.data[i].name,
            data: data.data[i].list,
        }))
    }
    options.series = series
}
export function formatDataPie(data, options) {
    let seriesData = []
    let length = data.data[0].list.length
    for (let i = 0; i < length; i++) {
        seriesData.push(Object.assign({}, options.series[0].data[0], {
            value: data.data[0].list[i],
            name: data.x[i],
        }))
    }
    options.series[0].data = seriesData
}