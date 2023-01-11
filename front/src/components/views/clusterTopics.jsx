import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import "./css/clusterTopics.css";

const ClusterTopics = ({ clusterHovering }) => {
  const [init, setInit] = useState(false);
  const chartRef = useRef();
  let data = [
    {
      cluster: "c1",
      topics: [
        ["t1", 12],
        ["t2", 4],
        ["t3", 9],
        ["t4", 10],
        ["t5", 12],
        ["t6", 10],
        ["t7", 22],
        ["t8"],
        ["t9", 111],
        ["t10", 23],
      ],
    },
    {
      cluster: "c2",
      topics: [
        ["t1", 12],
        ["t2", 4],
        ["t3", 9],
        ["t4", 10],
        ["t5", 12],
        ["t6", 10],
        ["t7", 22],
        ["t8"],
        ["t9", 111],
        ["t10", 23],
      ],
    },
    {
      cluster: "c3",
      topics: [
        ["t1", 12],
        ["t2", 4],
        ["t3", 9],
        ["t4", 10],
        ["t5", 12],
        ["t6", 10],
        ["t7", 22],
        ["t8"],
        ["t9", 111],
        ["t10", 23],
      ],
    },
    {
      cluster: "c4",
      topics: [
        ["t1", 12],
        ["t2", 4],
        ["t3", 9],
        ["t4", 10],
        ["t5", 12],
        ["t6", 10],
        ["t7", 22],
        ["t8"],
        ["t9", 111],
        ["t10", 23],
      ],
    },
    {
      cluster: "c5",
      topics: [
        ["t1", 12],
        ["t2", 4],
        ["t3", 9],
        ["t4", 10],
        ["t5", 12],
        ["t6", 10],
        ["t7", 22],
        ["t8"],
        ["t9", 111],
        ["t10", 23],
      ],
    },
    {
      cluster: "c6",
      topics: [
        ["t1", 12],
        ["t2", 4],
        ["t3", 9],
        ["t4", 10],
        ["t5", 12],
        ["t6", 10],
        ["t7", 22],
        ["t8"],
        ["t9", 111],
        ["t10", 23],
      ],
    },
    {
      cluster: "c7",
      topics: [
        ["t1", 12],
        ["t2", 4],
        ["t3", 9],
        ["t4", 10],
        ["t5", 12],
        ["t6", 10],
        ["t7", 22],
        ["t8"],
        ["t9", 111],
        ["t10", 23],
      ],
    },
    {
      cluster: "c8",
      topics: [
        ["t1", 12],
        ["t2", 4],
        ["t3", 9],
        ["t4", 10],
        ["t5", 12],
        ["t6", 10],
        ["t7", 22],
        ["t8"],
        ["t9", 111],
        ["t10", 23],
      ],
    },
    {
      cluster: "c9",
      topics: [
        ["t1", 12],
        ["t2", 4],
        ["t3", 9],
        ["t4", 10],
        ["t5", 12],
        ["t6", 10],
        ["t7", 22],
        ["t8"],
        ["t9", 111],
        ["t10", 23],
      ],
    },
    {
      cluster: "c10",
      topics: [
        ["t1", 12],
        ["t2", 4],
        ["t3", 9],
        ["t4", 10],
        ["t5", 12],
        ["t6", 10],
        ["t7", 22],
        ["t8"],
        ["t9", 111],
        ["t10", 23],
      ],
    },
  ];
  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (clusterHovering != -1) {
      let moveObj = document.getElementById("cluster-topics");
      console.log(clusterHovering + 1, clusterHovering * 60);
      moveObj.scrollTo(0, clusterHovering * 60);
    }
  }, [clusterHovering]);

  useEffect(() => {
    if (init) {
      drawClusterTopics();
    }
  }, [init]);

  function drawClusterTopics() {
    console.log("重画了");
    let chartHeight = 60 * data.length;
    document.getElementById(
      "cluster-topics-flow"
    ).style.height = `${chartHeight}px`; // 根据元素的数量动态设置内部div的高度
    let myChart = echarts.init(chartRef.current);
    let xAxis = [],
      yAxis = [],
      series = [],
      grid = [],
      title = [];
    for (let i = 0; i < data.length; i++) {
      title.push({
        textBaseline: "middle",
        top: `${7 + i * 10}%`,
        text: data[i]["cluster"],
        textStyle: {
          color: "#333",
          fontStyle: "normal",
          fontFamily: "sans-serif",
          fontSize: 12,
        },
      });
      grid.push({
        left: "10%",
        top: `${2 + i * 10}%`,
        width: "85%",
        height: "5%",
      });
      xAxis.push({
        gridIndex: i,
        type: "category",
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 10,
        },
        data: data[i]["topics"].map((d) => d[0]),
      });
      yAxis.push({
        gridIndex: i,
        splitNumber: 4,
        type: "value",
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 8,
        },
      });
      series.push({
        type: "bar",
        xAxisIndex: i,
        yAxisIndex: i,
        data: data[i]["topics"].map((d) => d[1]),
      });
    }
    let option = {
      tooltip: {
        formatter: "{b}: ({c})",
      },
      title: title,
      grid: grid,
      xAxis: xAxis,
      yAxis: yAxis,
      series: series,
    };

    myChart.setOption(option, true);
    window.onresize = () => {
      myChart.resize();
    };
  }
  return (
    <div
      id="cluster-topics"
      style={{ width: "20%", height: "100%", float: "left" }}
    >
      <div
        id="cluster-topics-flow"
        ref={chartRef}
        style={{ width: "100%", height: "550px" }}
        onscroll={() => console.log("4545446")}
      ></div>
    </div>
  );
};

export default ClusterTopics;
