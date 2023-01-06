import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { weightedVoronoi as d3WeightedVoronoi } from "d3-weighted-voronoi";
// import  'd3-voronoi-map';
import d3ForceLimit from "d3-force-limit";
// import 'd3-voronoi-treemap';

// 首先根据力导向图生成布局
// 然后生成Voronoi Grid

var origin_width = 0;
var origin_height = 0;
var svg;
const ClusterView = () => {
  const [init, setInit] = useState(false);
  const resizeRef = useRef(null);
  //   const [width, setWidth] = useState(width);
  //   const [height, setHeight] = useState(height);const resizeRef = useRef<HTMLDivElement>(null);
  //   const resizeChange = () => {
  //     let width = resizeRef.current.offsetWidth;
  //     let height = resizeRef.current.offsetHeight; // 监听
  //     if (origin_width != width || origin_height != height) {
  //       origin_height = height;
  //       origin_width = height;
  //     }
  //   };

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      origin_width = Math.floor(resizeRef.current.offsetWidth)*0.9; // 初始化
      origin_height = Math.floor(resizeRef.current.offsetHeight)*0.9;
      drawMap();
      //   window.addEventListener("resize", resizeChange);
    }
  }, [init]);

  const drawMap = () => {
    const inner_radius = 20,
      openWeight = 40000;
    const graph = {
      maxLength: 3,
      nodes: [
        { id: 0, rBounding: 40, weight: 10, isSelected: false, content: [0,1,2]},
        { id: 1, rBounding: 40, weight: 10, isSelected: false, content: [0,2] },
        { id: 2, rBounding: 40, weight: 10, isSelected: false, content: [2,0] },
        { id: 3, rBounding: 40, weight: 10, isSelected: false, content: [0,1,2] },
        { id: 4, rBounding: 40, weight: 10, isSelected: false, content: [0] },
        { id: 5, rBounding: 40, weight: 10, isSelected: false, content: [1] },
        { id: 6, rBounding: 40, weight: 10, isSelected: false, content: [0,1,2] },
        { id: 7, rBounding: 40, weight: 10, isSelected: false, content: [2] },
        { id: 8, rBounding: 40, weight: 10, isSelected: false, content: [0,1,2] },
        { id: 9, rBounding: 40, weight: 10, isSelected: false, content: [1,2] },
        { id: 10, rBounding: 40, weight: 10, isSelected: false, content: [2, 1] },
        { id: 11, rBounding: 40, weight: 10, isSelected: false, content: [0,2,1] },
        { id: 12, rBounding: 40, weight: 10, isSelected: false, content: [0,1,2] }
      ],
      links: [
        { source: 0, target: 1 },
        { source: 1, target: 2 },
        { source: 2, target: 0 },
        { source: 1, target: 3 },
        { source: 3, target: 2 },
        { source: 3, target: 4 },
        { source: 4, target: 5 },
        { source: 5, target: 6 },
        { source: 5, target: 7 },
        { source: 6, target: 7 },
        { source: 6, target: 8 },
        { source: 7, target: 8 },
        { source: 9, target: 4 },
        { source: 9, target: 11 },
        { source: 9, target: 10 },
        { source: 10, target: 11 },
        { source: 11, target: 12 },
        { source: 12, target: 10 },
      ],
    };
    const wallForce = d3ForceLimit()
      .radius((node) => node.rBounding)
      .x0(0)
      .x1(origin_width)
      .y0(0)
      .y1(origin_height);

    const svg = d3
      .select("#cluster-map")
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", [0, 0, origin_width, origin_height])
      .attr("stroke-width", 2);

    let cells = graph.nodes.map(function (s) {
      return [];
    }); // 存储每一个site的顶点

    const cellLiner = d3.line();
    const simulation = d3
      .forceSimulation() // 创建一个新的力导向图；
      .nodes(graph.nodes) // 添加节点
      .force("charge", d3.forceManyBody())
    //   .alpha(0.2)
    //   .alphaDecay(0) //设置 alpha 衰减率.迭代150，默认0.0228
    //   .velocityDecay(0.8) //默认为 0.4,较低的衰减系数可以使得迭代次数更多，其布局结果也会更理性，但是可能会引起数值不稳定从而导致震荡。
      .force("center", d3.forceCenter(origin_width / 2, origin_height / 2)) // 添加力学模型并进行仿真，让视图位于区域中心
      .force(
        "collision",
        d3.forceCollide((d) => d.rBounding)
      ) //设置节点碰撞半径>= 点半径避免重叠
      .force("walls", wallForce) // 让节点不超出区域边界，因为边界的限制，会让节点之间重叠
      .force(    //link froce(弹簧模型) 可以根据 link distance 将有关联的两个节点拉近或者推远。力的强度与被链接两个节点的距离成比例，类似弹簧力。
        "link",
        d3
          .forceLink(graph.links)
          .id(function (d) {   //设置或获取link中节点的查找方式
            return d.id;
          })
          // .distance(50)    //设置或获取两个节点之间的距离)
          .strength(0)
      )
      .on("tick", update);

    // voronoi布局
    let voronoi = d3WeightedVoronoi() // set the weight accessor
    .clip([
      [0, 0],
      [0, origin_height],
      [origin_width, origin_height],
      [origin_width, 0],
    ]);
    computeAllCells();
    redrawAllCells();


    const link = svg
      .selectAll(".link")
      .data(graph.links)
      .join("line")
      .attr("stroke", '#1e1e1e');
    // 外部圆形，表示出集群之间的连接关系
    const boundingCircle = svg
      .append("g")
      .selectAll("circle")
      .data(graph.nodes)
      .join("circle")
      .attr("class", "boundingCircle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => d.rBounding)
      .attr("fill", "rgba(204, 204, 204,1)");

    
    // 内部圆形，表示出当前的类型
    const circle = svg
      .append("g")
      .selectAll("circle")
      .data(graph.nodes)
      .join("circle")
      .attr("class", "circle")
      .attr("cx", (d) => {
        console.log(d.x, d.y);
        return d.x
      })
      .attr("cy", (d) => d.y)
      .attr("r", inner_radius)
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
      .call(
          d3
            .drag()
            .on("start", dragStart)
            .on("drag", drag)
            .on("end", dragEnd)
            .on("start.update drag.update end.update", update)
        )
      .on("click", click);

    //   const circle = svg
    //   .append("g")
    //   .selectAll("g")
    //   .data(graph.nodes)
    //   .join("g")
    //   .attr("class", "circle-g")
    //   .attr("fill", "white")
    //   .attr('transform', d => {
    //     console.log(d.x, d.y);
    //     return `translate(${d.x+ origin_width/2}, ${d.y + origin_height/2})`
    //   })
    //   .call(
    //       d3
    //         .drag()
    //         .on("start", dragStart)
    //         .on("drag", drag)
    //         .on("end", dragEnd)
    //         .on("start.update drag.update end.update", update)
    //     )
    //   .on("click", click);

    // 绘制圆内部内容
    const inner_arc = d3.arc()
                        .innerRadius(inner_radius-10)
                        .outerRadius(inner_radius-5)
                        .startAngle(i => (2*Math.PI)/graph.maxLength* i -2)
                        .endAngle(i => (2*Math.PI)/graph.maxLength* (i+1) - 2)
                        .cornerRadius(50)
                        .padAngle(0.1)
    circle.selectAll('path').data(d => d.content).
        join('path')
            .attr('d', (d, i) => inner_arc(i))
            .attr('stroke', 'green')
            .attr('fill', 'none')


    function update() {
      circle.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      boundingCircle
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", (d) => d.rBounding);
      simulation.force(
        "collision",
        d3.forceCollide((d) => d.rBounding)
      );
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

        computeAllCells();
        redrawAllCells();
    }

    function dragStart(event, d) {
      circle.filter((p) => p === d).attr("stroke", "black");
    }

    function drag(event, d) {
      d.x = event.x;
      d.y = event.y;
    }

    function dragEnd(event, d) {
      d.weight = 0;
      circle.filter((p) => p === d).attr("stroke", null);
    }

    function click(event, d) {
      console.log(d);

      if (d.isSelected) {
        // 收缩
        d.weight = 0;
        d.rBounding = 0;
        circle.filter((p) => p === d).attr("stroke", "");
        d.isSelected = false;
      } else {
        // 扩大
        d.weight = openWeight;
        d.rBounding = 200;
        circle.filter((p) => p === d).attr("stroke", "black");
        d.isSelected = true;
      }

      update();
    }

    function computeAllCells() {
      cells = voronoi(graph.nodes);
    }

    function redrawAllCells() {
      var cellSelection = svg.selectAll(".cell").data(cells, function (c) {
        return c.site.originalObject.index;
      });

      cellSelection
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 3)
        .classed("cell", true)
        .attr("id", function (d, i) {
          return "cell-" + d.site.originalObject.index;
        })
        .attr("weight", function (d, i) {
          return d.site.originalObject.weight;
        })
        .merge(cellSelection)
        .attr("d", function (d) {
          return cellLiner(d) + "z";
        });

      cellSelection.exit().remove();
    }

    // 视图缩放
    let zoomHandler = d3.zoom().on("zoom", zoomAction);
    function zoomAction(event) {
      svg.attr(
        "transform",
        `translate(${origin_width+ event.transform.x}, ${origin_height+ event.transform.y})` +
          "scale(" +
          event.transform.k +
          ")"
      );
    }
    zoomHandler(svg);
  };

  return (
    // <div id="cluster-container" style={{ width:1000, height: 500 }}>
    // <div id="cluster-map" style={{ width: width, height: height }}></div>
    <div
      id="cluster-map"
      style={{ width: "100%", height: "100%" }}
      ref={resizeRef}
    ></div>
    // </div>
  );
};

export default ClusterView;
