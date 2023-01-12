import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const ClusterDetails = () => {
  const [init, setInit] = useState(false);
  const [xAxisType, setXAisType] = useState("score"); // 横纵轴排列的数据类型
  const [yAxisType, , setYAisType] = useState("star");
  const chartRef = useRef();
  const data = [
    {
      id: "r0",
      reponame: "r0",
      star: 46,
      watch: 1,
      score: 0.476,
      data: "2011-09-26",
    },
    {
      id: "r1",
      reponame: "r1",
      star: 74,
      watch: 89,
      score: 0.989,
      data: "2018-09-19",
    },
    {
      id: "r2",
      reponame: "r2",
      star: 65,
      watch: 34,
      score: 0.01,
      data: "2010-01-08",
    },
    {
      id: "r3",
      reponame: "r3",
      star: 42,
      watch: 54,
      score: 0.534,
      data: "2015-04-24",
    },
    {
      id: "r4",
      reponame: "r4",
      star: 39,
      watch: 20,
      score: 0.566,
      data: "2012-08-14",
    },
    {
      id: "r5",
      reponame: "r5",
      star: 18,
      watch: 73,
      score: 0.485,
      data: "2017-01-18",
    },
    {
      id: "r6",
      reponame: "r6",
      star: 68,
      watch: 2,
      score: 0.521,
      data: "2010-07-13",
    },
    {
      id: "r7",
      reponame: "r7",
      star: 99,
      watch: 98,
      score: 0.599,
      data: "2014-04-12",
    },
    {
      id: "r8",
      reponame: "r8",
      star: 93,
      watch: 55,
      score: 0.016,
      data: "2012-05-15",
    },
    {
      id: "r9",
      reponame: "r9",
      star: 16,
      watch: 20,
      score: 0.855,
      data: "2017-02-06",
    },
    {
      id: "r10",
      reponame: "r10",
      star: 76,
      watch: 74,
      score: 0.539,
      data: "2019-05-15",
    },
    {
      id: "r11",
      reponame: "r11",
      star: 35,
      watch: 72,
      score: 0.862,
      data: "2012-11-02",
    },
    {
      id: "r12",
      reponame: "r12",
      star: 51,
      watch: 54,
      score: 0.87,
      data: "2016-12-08",
    },
    {
      id: "r13",
      reponame: "r13",
      star: 25,
      watch: 93,
      score: 0.452,
      data: "2020-12-19",
    },
    {
      id: "r14",
      reponame: "r14",
      star: 51,
      watch: 90,
      score: 0.744,
      data: "2013-11-19",
    },
    {
      id: "r15",
      reponame: "r15",
      star: 54,
      watch: 97,
      score: 0.633,
      data: "2022-02-18",
    },
    {
      id: "r16",
      reponame: "r16",
      star: 44,
      watch: 57,
      score: 0.366,
      data: "2015-07-09",
    },
    {
      id: "r17",
      reponame: "r17",
      star: 73,
      watch: 61,
      score: 0.64,
      data: "2011-02-20",
    },
    {
      id: "r18",
      reponame: "r18",
      star: 67,
      watch: 4,
      score: 0.853,
      data: "2012-07-12",
    },
    {
      id: "r19",
      reponame: "r19",
      star: 25,
      watch: 67,
      score: 0.853,
      data: "2019-06-01",
    },
    {
      id: "r20",
      reponame: "r20",
      star: 19,
      watch: 15,
      score: 0.972,
      data: "2020-03-22",
    },
    {
      id: "r21",
      reponame: "r21",
      star: 96,
      watch: 1,
      score: 0.509,
      data: "2013-11-24",
    },
    {
      id: "r22",
      reponame: "r22",
      star: 36,
      watch: 75,
      score: 0.172,
      data: "2015-02-02",
    },
    {
      id: "r23",
      reponame: "r23",
      star: 71,
      watch: 13,
      score: 0.494,
      data: "2020-01-31",
    },
    {
      id: "r24",
      reponame: "r24",
      star: 31,
      watch: 98,
      score: 0.888,
      data: "2014-12-22",
    },
    {
      id: "r25",
      reponame: "r25",
      star: 55,
      watch: 40,
      score: 0.239,
      data: "2021-06-16",
    },
    {
      id: "r26",
      reponame: "r26",
      star: 95,
      watch: 80,
      score: 0.609,
      data: "2015-10-09",
    },
    {
      id: "r27",
      reponame: "r27",
      star: 75,
      watch: 73,
      score: 0.359,
      data: "2017-09-18",
    },
    {
      id: "r28",
      reponame: "r28",
      star: 61,
      watch: 69,
      score: 0.207,
      data: "2011-07-03",
    },
    {
      id: "r29",
      reponame: "r29",
      star: 66,
      watch: 9,
      score: 0.246,
      data: "2016-03-04",
    },
    {
      id: "r30",
      reponame: "r30",
      star: 3,
      watch: 75,
      score: 0.523,
      data: "2019-01-26",
    },
    {
      id: "r31",
      reponame: "r31",
      star: 58,
      watch: 7,
      score: 0.147,
      data: "2017-02-02",
    },
    {
      id: "r32",
      reponame: "r32",
      star: 98,
      watch: 34,
      score: 0.995,
      data: "2011-05-07",
    },
    {
      id: "r33",
      reponame: "r33",
      star: 34,
      watch: 24,
      score: 0.168,
      data: "2019-04-22",
    },
    {
      id: "r34",
      reponame: "r34",
      star: 73,
      watch: 2,
      score: 0.66,
      data: "2012-10-05",
    },
    {
      id: "r35",
      reponame: "r35",
      star: 42,
      watch: 15,
      score: 0.213,
      data: "2022-02-16",
    },
    {
      id: "r36",
      reponame: "r36",
      star: 94,
      watch: 86,
      score: 0.141,
      data: "2014-06-30",
    },
    {
      id: "r37",
      reponame: "r37",
      star: 46,
      watch: 75,
      score: 0.644,
      data: "2017-07-30",
    },
    {
      id: "r38",
      reponame: "r38",
      star: 69,
      watch: 53,
      score: 0.298,
      data: "2016-06-13",
    },
    {
      id: "r39",
      reponame: "r39",
      star: 57,
      watch: 86,
      score: 0.761,
      data: "2019-12-06",
    },
    {
      id: "r40",
      reponame: "r40",
      star: 89,
      watch: 73,
      score: 0.589,
      data: "2021-01-22",
    },
    {
      id: "r41",
      reponame: "r41",
      star: 56,
      watch: 62,
      score: 0.112,
      data: "2022-04-22",
    },
    {
      id: "r42",
      reponame: "r42",
      star: 3,
      watch: 43,
      score: 0.934,
      data: "2010-08-24",
    },
    {
      id: "r43",
      reponame: "r43",
      star: 20,
      watch: 97,
      score: 0.521,
      data: "2013-12-26",
    },
    {
      id: "r44",
      reponame: "r44",
      star: 94,
      watch: 97,
      score: 0.218,
      data: "2013-07-03",
    },
    {
      id: "r45",
      reponame: "r45",
      star: 48,
      watch: 60,
      score: 0.039,
      data: "2017-03-12",
    },
    {
      id: "r46",
      reponame: "r46",
      star: 43,
      watch: 48,
      score: 0.583,
      data: "2012-04-30",
    },
    {
      id: "r47",
      reponame: "r47",
      star: 96,
      watch: 94,
      score: 0.284,
      data: "2016-01-14",
    },
    {
      id: "r48",
      reponame: "r48",
      star: 34,
      watch: 68,
      score: 0.535,
      data: "2021-03-20",
    },
    {
      id: "r49",
      reponame: "r49",
      star: 3,
      watch: 21,
      score: 0.362,
      data: "2011-12-12",
    },
    {
      id: "r50",
      reponame: "r50",
      star: 45,
      watch: 76,
      score: 0.028,
      data: "2018-09-16",
    },
    {
      id: "r51",
      reponame: "r51",
      star: 98,
      watch: 82,
      score: 0.356,
      data: "2010-11-06",
    },
    {
      id: "r52",
      reponame: "r52",
      star: 7,
      watch: 44,
      score: 0.487,
      data: "2013-05-16",
    },
    {
      id: "r53",
      reponame: "r53",
      star: 79,
      watch: 19,
      score: 0.122,
      data: "2012-07-05",
    },
    {
      id: "r54",
      reponame: "r54",
      star: 81,
      watch: 91,
      score: 0.713,
      data: "2014-09-17",
    },
    {
      id: "r55",
      reponame: "r55",
      star: 56,
      watch: 52,
      score: 0.981,
      data: "2015-07-14",
    },
    {
      id: "r56",
      reponame: "r56",
      star: 99,
      watch: 89,
      score: 0.774,
      data: "2017-02-18",
    },
    {
      id: "r57",
      reponame: "r57",
      star: 17,
      watch: 61,
      score: 0.241,
      data: "2016-09-23",
    },
    {
      id: "r58",
      reponame: "r58",
      star: 10,
      watch: 58,
      score: 0.366,
      data: "2017-05-29",
    },
    {
      id: "r59",
      reponame: "r59",
      star: 86,
      watch: 2,
      score: 0.759,
      data: "2011-10-02",
    },
    {
      id: "r60",
      reponame: "r60",
      star: 40,
      watch: 80,
      score: 0.398,
      data: "2010-09-16",
    },
    {
      id: "r61",
      reponame: "r61",
      star: 4,
      watch: 98,
      score: 0.874,
      data: "2018-04-18",
    },
    {
      id: "r62",
      reponame: "r62",
      star: 54,
      watch: 29,
      score: 0.367,
      data: "2014-01-08",
    },
    {
      id: "r63",
      reponame: "r63",
      star: 6,
      watch: 9,
      score: 0.374,
      data: "2011-03-29",
    },
    {
      id: "r64",
      reponame: "r64",
      star: 86,
      watch: 95,
      score: 0.528,
      data: "2021-04-14",
    },
    {
      id: "r65",
      reponame: "r65",
      star: 87,
      watch: 90,
      score: 0.172,
      data: "2019-07-21",
    },
    {
      id: "r66",
      reponame: "r66",
      star: 41,
      watch: 33,
      score: 0.246,
      data: "2016-04-09",
    },
    {
      id: "r67",
      reponame: "r67",
      star: 94,
      watch: 54,
      score: 0.308,
      data: "2017-10-30",
    },
    {
      id: "r68",
      reponame: "r68",
      star: 28,
      watch: 61,
      score: 0.659,
      data: "2012-10-16",
    },
    {
      id: "r69",
      reponame: "r69",
      star: 18,
      watch: 40,
      score: 0.406,
      data: "2010-10-29",
    },
    {
      id: "r70",
      reponame: "r70",
      star: 22,
      watch: 43,
      score: 0.82,
      data: "2012-06-10",
    },
    {
      id: "r71",
      reponame: "r71",
      star: 10,
      watch: 95,
      score: 0.638,
      data: "2022-10-21",
    },
    {
      id: "r72",
      reponame: "r72",
      star: 61,
      watch: 13,
      score: 0.119,
      data: "2020-10-29",
    },
    {
      id: "r73",
      reponame: "r73",
      star: 26,
      watch: 76,
      score: 0.708,
      data: "2019-04-20",
    },
    {
      id: "r74",
      reponame: "r74",
      star: 78,
      watch: 63,
      score: 0.525,
      data: "2011-03-19",
    },
    {
      id: "r75",
      reponame: "r75",
      star: 9,
      watch: 26,
      score: 0.061,
      data: "2015-04-04",
    },
    {
      id: "r76",
      reponame: "r76",
      star: 39,
      watch: 4,
      score: 0.248,
      data: "2011-04-17",
    },
    {
      id: "r77",
      reponame: "r77",
      star: 98,
      watch: 40,
      score: 0.481,
      data: "2022-12-01",
    },
    {
      id: "r78",
      reponame: "r78",
      star: 100,
      watch: 58,
      score: 0.039,
      data: "2020-09-18",
    },
    {
      id: "r79",
      reponame: "r79",
      star: 76,
      watch: 96,
      score: 0.999,
      data: "2019-04-20",
    },
    {
      id: "r80",
      reponame: "r80",
      star: 76,
      watch: 25,
      score: 0.999,
      data: "2016-06-26",
    },
    {
      id: "r81",
      reponame: "r81",
      star: 35,
      watch: 84,
      score: 0.999,
      data: "2011-12-22",
    },
    {
      id: "r82",
      reponame: "r82",
      star: 0,
      watch: 78,
      score: 0.316,
      data: "2012-01-03",
    },
    {
      id: "r83",
      reponame: "r83",
      star: 59,
      watch: 26,
      score: 0.844,
      data: "2012-06-04",
    },
    {
      id: "r84",
      reponame: "r84",
      star: 64,
      watch: 6,
      score: 0.549,
      data: "2017-12-20",
    },
    {
      id: "r85",
      reponame: "r85",
      star: 50,
      watch: 99,
      score: 0.975,
      data: "2014-05-15",
    },
    {
      id: "r86",
      reponame: "r86",
      star: 38,
      watch: 4,
      score: 0.185,
      data: "2014-12-03",
    },
    {
      id: "r87",
      reponame: "r87",
      star: 53,
      watch: 10,
      score: 0.805,
      data: "2016-07-02",
    },
    {
      id: "r88",
      reponame: "r88",
      star: 21,
      watch: 54,
      score: 0.07,
      data: "2014-09-28",
    },
    {
      id: "r89",
      reponame: "r89",
      star: 68,
      watch: 94,
      score: 0.521,
      data: "2014-10-02",
    },
    {
      id: "r90",
      reponame: "r90",
      star: 48,
      watch: 97,
      score: 0.815,
      data: "2013-04-27",
    },
    {
      id: "r91",
      reponame: "r91",
      star: 31,
      watch: 6,
      score: 0.466,
      data: "2020-06-13",
    },
    {
      id: "r92",
      reponame: "r92",
      star: 94,
      watch: 41,
      score: 0.229,
      data: "2012-03-05",
    },
    {
      id: "r93",
      reponame: "r93",
      star: 39,
      watch: 56,
      score: 0.659,
      data: "2016-07-25",
    },
    {
      id: "r94",
      reponame: "r94",
      star: 43,
      watch: 79,
      score: 0.912,
      data: "2010-08-14",
    },
    {
      id: "r95",
      reponame: "r95",
      star: 87,
      watch: 67,
      score: 0.464,
      data: "2013-03-29",
    },
    {
      id: "r96",
      reponame: "r96",
      star: 46,
      watch: 79,
      score: 0.869,
      data: "2017-05-01",
    },
    {
      id: "r97",
      reponame: "r97",
      star: 65,
      watch: 6,
      score: 0.01,
      data: "2018-07-01",
    },
    {
      id: "r98",
      reponame: "r98",
      star: 100,
      watch: 23,
      score: 0.01,
      data: "2022-10-11",
    },
    {
      id: "r99",
      reponame: "r99",
      star: 5,
      watch: 67,
      score: 0.566,
      data: "2019-06-24",
    },
  ];

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      drawClusterDetais();
    }
  }, [init]);


  const drawClusterDetais = () => {
    const margin = { top: 10, bottom: 10, left: 50, right: 50 };
    const width = Math.floor(chartRef.current.offsetWidth);
    const height = Math.floor(chartRef.current.offsetHeight);
    data.sort((a, b) => multiRuleSort(a, b))   // 对数据根据x轴的值进行排序
    const mergeData = mergeDataFunc() 
    let chartHeight = height * 0.8; // 纵向图表的高度
    // let
    const svg = d3
      .select("#cluster-details")
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("background", "white")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", [
      0,
      0,
      width - margin.left - margin.right,
      height - margin.top - margin.bottom
    ])
    // 对数据做进一步处理
    
    const wrapper = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
    const xData = mergeData.map((item) => item[xAxisType]);
    const yData = mergeData.map((item) => item[yAxisType]);
    const [xmin, xmax] = [d3.min(xData), d3.max(xData)]; // 轴的最值
    const [ymin, ymax] = [d3.min(yData), d3.max(yData)];
    const yNumber = ymax - ymin;
    const circleR = 5;
    // console.log(xData, yData);
    const xAxisScale = d3.scaleQuantize().domain([xmin, xmax]).range(d3.range(0, width-margin.left-margin.right, 0.1))
    const yAxisScale = d3.scaleLinear().domain([ymin, ymax]).range([0, height-margin.top-margin.bottom])
    wrapper.append('g')
            .attr('class', 'chart-g')
            .selectAll('circle')
            .data(mergeData)
            .join('circle')
            .attr('cx', (d) => xAxisScale(d[xAxisType]))
            .attr('cy', (d) => height-margin.top-margin.bottom-yAxisScale(d[yAxisType]))
            .attr('xval', (d) => d[xAxisType])
            .attr('yval', (d) => d[yAxisType])
            .attr('r', 5)
            .attr('fill', d => {
                if(d.group.length !==0){
                    return 'red'
                }
                return '#d6f6a7'
            })

  };

  // 对排序后的数据根据y轴的值进行合并
  function mergeDataFunc(){
    let mergeData = [{...data[0], group: []}]  // 把第一条数据放进去并初始化类型为单个点
    let mergeIndex = 1
    for(let i=1; i< data.length; i++){
        let temp = data[i]
        // 当前点与merge中的最后一条数据相同
        if(temp[xAxisType] === mergeData[mergeIndex-1][xAxisType] && temp[yAxisType] === mergeData[mergeIndex-1][yAxisType]){
            if(mergeData[mergeIndex-1]['group'].length === 0){
                delete mergeData[mergeIndex-1].group
                mergeData[mergeIndex-1] = {[xAxisType]: temp[xAxisType], [yAxisType]: temp[yAxisType], group: [mergeData[mergeIndex-1], temp] }
            }else{
                mergeData[mergeIndex-1] = {[xAxisType]: temp[xAxisType], [yAxisType]: temp[yAxisType], group: [...mergeData[mergeIndex-1]['group'], temp] }
            }
            
        }else{
            mergeData[mergeIndex] = {...temp, group: []}
            mergeIndex += 1
        }
    }
    return mergeData
  }

  // 现根据x轴属性升序排序，再根据y轴属性升序排序
  function multiRuleSort(a, b){
    if(a[xAxisType] === b[xAxisType]){
        if(a[yAxisType] > b[yAxisType]){
            return 1
        }else{
            return -1
        }
    }else if(a[xAxisType] > b[xAxisType]){
        return 1
    }
    return -1

  }

  return (
    <>
      <div
        id="cluster-details"
        style={{ width: "100%", height: "100%" }}
        ref={chartRef}
      ></div>
    </>
  );
};

export default ClusterDetails;
