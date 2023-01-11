// import React, { useRef, useEffect, useState } from "react";
// import * as d3 from "d3";
// import { weightedVoronoi as d3WeightedVoronoi } from "d3-weighted-voronoi";
// // import  'd3-voronoi-map';
// import d3ForceLimit from "d3-force-limit";
// // import 'd3-voronoi-treemap';

// // 首先根据力导向图生成布局
// // 然后生成Voronoi Grid

// var origin_width = 0;
// var origin_height = 0;
// var svg;
// const inner_color_map = {
//     0: "#e5c494",
//     1: "#66c2a5",
//     2: "#d17552",
//     3: "#ffd92f",
//     4: "#889bc6",
//     5: "#a6d854",
//     6: "#b3b3b3",
//     7: "#e78ac3",
// };
// const ClusterView = () => {
//     const [init, setInit] = useState(false);
//     const resizeRef = useRef(null);
//     //   const [width, setWidth] = useState(width);
//     //   const [height, setHeight] = useState(height);const resizeRef = useRef<HTMLDivElement>(null);
//     //   const resizeChange = () => {
//     //     let width = resizeRef.current.offsetWidth;
//     //     let height = resizeRef.current.offsetHeight; // 监听
//     //     if (origin_width != width || origin_height != height) {
//     //       origin_height = height;
//     //       origin_width = height;
//     //     }
//     //   };

//     useEffect(() => {
//         setInit(true);
//     }, []);

//     useEffect(() => {
//         if (init) {
//             origin_width = Math.floor(resizeRef.current.offsetWidth) * 0.9; // 初始化
//             origin_height = Math.floor(resizeRef.current.offsetHeight) * 0.9;
//             drawMap();
//             //   window.addEventListener("resize", resizeChange);
//         }
//     }, [init]);

//     const drawMap = () => {
//         const innerRadius = 20,
//             openWeight = 40000,
//             ringIncrement = 3;
//         // connection需要排序
//         const graph = {
//             maxLength: 3,
//             maxConnection: 10, 
//             nodes: [
//                 {
//                     id: 0,
//                     rBounding: 10,
//                     weight: 10,
//                     isSelected: false,
//                     content: [0, 1, 2],
//                     connection: [0, 4, 5, 0, 0, 0,0, 0, 0, 0, 0, 0,0]
//                 },
//                 {
//                     id: 1,
//                     rBounding: 40,
//                     weight: 10,
//                     isSelected: false,
//                     content: [0, 2],
//                     connection:[4, 0, 7, 4, 0, 0,0, 0, 0, 0, 0, 0,0]
//                 },
//                 {
//                     id: 2,
//                     rBounding: 30,
//                     weight: 10,
//                     isSelected: false,
//                     content: [2, 0],
//                     connection:[5, 7, 0, 10, 0, 0,0, 0, 0,  0, 0, 0,0]
//                 },
//                 {
//                     id: 3,
//                     rBounding: 25,
//                     weight: 10,
//                     isSelected: false,
//                     content: [0, 1, 2],
//                     connection: [0, 4, 10, 0, 6, 0,0, 0,  0, 0, 0, 0,0]
//                 },
//                 { id: 4, rBounding: 7, weight: 10, isSelected: false, content: [0],
//                     connection: [0, 0, 0, 6, 0, 8,0, 0, 0, 5, 0, 0,0]
//                  },
//                 { id: 5, rBounding: 90, weight: 10, isSelected: false, content: [1],
//                     connection: [0, 0, 0, 0, 8, 0,4, 0, 0, 0, 0, 0,0]},
//                 {
//                     id: 6,
//                     rBounding: 3,
//                     weight: 10,
//                     isSelected: false,
//                     content: [0, 1, 2],
//                     connection: [0, 0, 0, 0, 0, 4,0, 1, 3, 0, 0, 0,0]
//                 },
//                 { id: 7, rBounding: 12, weight: 10, isSelected: false, content: [2],
//                     connection: [0, 0, 0, 0, 0, 0,1, 0, 8, 0, 0, 0,0]
//                     },
//                 {
//                     id: 8,
//                     rBounding: 1,
//                     weight: 10,
//                     isSelected: false,
//                     content: [0, 1, 2],
//                     connection:[0, 0, 0, 0, 0, 0,3, 8, 0, 0, 0, 0,0]
//                 },
//                 {
//                     id: 9,
//                     rBounding: 56,
//                     weight: 10,
//                     isSelected: false,
//                     content: [1, 2],
//                     connection: [0, 0, 0, 0, 5, 0,0, 0, 0, 0, 7, 3,0]
//                 },
//                 {
//                     id: 10,
//                     rBounding: 234,
//                     weight: 10,
//                     isSelected: false,
//                     content: [2, 1],
//                     connection: [0, 0, 0, 0, 0, 0,0, 0, 0, 7, 0, 4,2]
//                 },
//                 {
//                     id: 11,
//                     rBounding: 22,
//                     weight: 10,
//                     isSelected: false,
//                     content: [0, 2, 1],
//                     connection: [0, 0, 0, 0, 0, 0,0, 0, 0, 3, 4, 0,8]
//                 },
//                 {
//                     id: 12,
//                     rBounding: 65,
//                     weight: 10,
//                     isSelected: false,
//                     content: [0, 1, 2],
//                     connection: []
//                 },
//             ],
//             links: [
//                 { source: 0, target: 1 },
//                 { source: 1, target: 2 },
//                 { source: 2, target: 0 },
//                 { source: 1, target: 3 },
//                 { source: 3, target: 2 },
//                 { source: 3, target: 4 },
//                 { source: 4, target: 5 },
//                 { source: 5, target: 6 },
//                 { source: 5, target: 7 },
//                 { source: 6, target: 7 },
//                 { source: 6, target: 8 },
//                 { source: 7, target: 8 },
//                 { source: 9, target: 4 },
//                 { source: 9, target: 11 },
//                 { source: 9, target: 10 },
//                 { source: 10, target: 11 },
//                 { source: 11, target: 12 },
//                 { source: 11, target: 5 },
//                 { source: 11, target: 3 },
//                 { source: 12, target: 10 },
//             ],
//         };
//         const svg = d3
//             .select("#cluster-map")
//             .append("svg")
//             .attr("preserveAspectRatio", "xMidYMid meet")
//             .attr("width", "100%")
//             .attr("height", "100%")
//             .attr("viewBox", [0, 0, origin_width, origin_height])
//             .attr("stroke-width", 2);

//         const wallForce = d3ForceLimit()
//             .radius((node) => node.rBounding)
//             .x0(0)
//             .x1(origin_width)
//             .y0(0)
//             .y1(origin_height);

//         const simulation = d3
//             .forceSimulation() // 创建一个新的力导向图；
//             .nodes(graph.nodes) // 添加节点
//             .force(
//                 //link froce(弹簧模型) 可以根据 link distance 将有关联的两个节点拉近或者推远。力的强度与被链接两个节点的距离成比例，类似弹簧力。
//                 "link",
//                 d3
//                     .forceLink(graph.links)
//                     .id(function (d) {
//                         //设置或获取link中节点的查找方式
//                         return d.id;
//                     })
//                     // .distance(50)    //设置或获取两个节点之间的距离)
//                     .strength(0)
//             )
//             .force("charge", d3.forceManyBody())
//             .force("center", d3.forceCenter(origin_width / 2, origin_height / 2)) // 添加力学模型并进行仿真，让视图位于区域中心
//             .force("collision", d3.forceCollide((d) => d.rBounding)) //设置节点碰撞半径>= 点半径避免重叠
//             .force("walls", wallForce) // 让节点不超出区域边界，因为边界的限制，会让节点之间重叠
//             .on("tick", update)
//             .on("end", moveToCentroid)

//         // voronoi布局
//         // 存储每一个site的顶点
//         const cellLiner = d3.line();
//         // const cellLiner = d3.line().curve(d3.curveBasisClosed);
//         let cells = graph.nodes.map(function (s) {
//             return [];
//         });
//         let voronoi = d3WeightedVoronoi() // set the weight accessor
//             .clip([
//                 [0, 0],
//                 [0, origin_height],
//                 [origin_width, origin_height],
//                 [origin_width, 0],
//             ]);
//         computeAllCells();
//         redrawAllCells();

//         const link = svg
//             .selectAll(".link")
//             .data(graph.links)
//             .join("line")
//             .attr("stroke", "#1e1e1e")
//             .style("visibility", "hidden")
//         // 外部圆形，表示出集群之间的连接关系
//         const boundingCircle = svg
//             .append("g")
//             .attr("id", "bounding-circle-g")
//             .selectAll("circle")
//             .data(graph.nodes)
//             .join("circle")
//             .attr("class", "bounding-circle")
//             .attr("cx", (d) => d.x)
//             .attr("cy", (d) => d.y)
//             .attr("r", (d) => d.rBounding + innerRadius + 10)
//             .attr("fill", "rgba(204, 204, 204,1)");

//         // 绘制圆内部内容
//         const circle = svg
//             .append("g")
//             .attr("id", "circle-g-g")
//             .selectAll("g")
//             .data(graph.nodes)
//             .join("g")
//             .attr("class", "circle-g")
//             .attr("fill", "white")
//             .call(
//                 d3
//                     .drag()
//                     .on("start", dragstarted)
//                     .on("drag", dragged)
//                     .on("end", dragended)
//                     .on("start.update drag.update end.update", update)
//             )
//             .on("click", click)
//             .on('mouseover', function(event, d){
//                 let curNode = d.id
//                 link._groups[0].forEach(function(linkObj){
//                     let connect = [d3.select(linkObj).data()[0].source.id, d3.select(linkObj).data()[0].target.id]
//                     if(connect.includes(curNode)){
//                         d3.select(linkObj).style("visibility", "visible")
//                     }
//                 })
//               })
//               .on("mouseout", () =>{
//                 link._groups[0].forEach(function(linkObj){
//                     d3.select(linkObj).style("visibility", "hidden")
//                 })
//               })

//         // 圆心点
//         circle
//           .append("circle")
//           .attr("cx", 0)
//           .attr("cy", 0)
//           .attr("r", innerRadius-6)
//           .attr("class", "center-point")
//           .attr("id", d => 'node-' + d.id)
//           .attr("fill", "white")

//         circle
//           .append("text")
//           .attr("x", 0)
//           .attr("y", 5)
//           .attr("font", "10px sans-serif")
//           .attr("fill", "black")
//           .attr("text-anchor", "middle")
//           .text((d) => d.id)
          

//         const innerArc = d3
//             .arc()
//             .innerRadius(innerRadius - 10)
//             .outerRadius(innerRadius - 1)
//             .startAngle((i) => ((2 * Math.PI) / graph.maxLength) * i - 2)
//             .endAngle((i) => ((2 * Math.PI) / graph.maxLength) * (i + 1) - 2)
//             .cornerRadius(1)
//             .padAngle(0.05);
//         const innerArcG = circle
//             .selectAll("path")
//             .data((d) => d.content)
//             .join("path")
//             .attr("d", (d, i) => innerArc(i))
//             .attr("stroke-width", 0)
//             .attr("fill", (d) => inner_color_map[d]);

//         innerArcG
//             .append("circle")
//             .attr("cx", (d) => innerArc.centroid(d)[0])
//             .attr("cy", (d) => innerArc.centroid(d)[1])
//             .attr("r", 2)
//             .attr("class", "center-point")
//             .attr("fill", "red");
//         const circleRingG = circle.append('g').attr("class", 'circle-ring-g')
//         // circleRingG.selectAll('circle')
//         //                 .data(d => d.connection)
//         //                 .join("circle")
//         //                 .attr("cx", 0)
//         //                 .attr("cy", 0)
//         //                 .attr("r", (d, i) => innerRadius + ringIncrement*(i))
//         //                 .attr('fill', 'none')
//         //                 .attr('stroke-width', '1px')
//         //                 .attr('stroke', 'yellow')

//         // 绘制外围bar表示关系
//         const connectionArc = d3.arc()
//             .innerRadius(d => connectionY(0))
//             .outerRadius(d => connectionY(d))
//             .startAngle((d, i) => connectionX(i))
//             .endAngle((d, i) => connectionX(i) + connectionX.bandwidth())
//             .padAngle(0.05)
//             // .padRadius(innerR)
//         const connectionX = d3.scaleBand()
//                             .domain(graph.nodes.map((d, i) => i))
//                             .range([0, 2 * Math.PI])
//                             .align(0)
//         const connectionY = d3.scaleRadial()
//                             .domain([0, graph.maxConnection])
//                             .range([innerRadius+ 1, innerRadius + 10])
//         for(let cluserIndex=0; cluserIndex < graph.nodes.length; cluserIndex++){
//             d3.select(circleRingG._groups[0][cluserIndex]).selectAll("path")
//             .data(graph.nodes[cluserIndex]['connection'])
//             .join("path")
//             .attr("d", connectionArc)
//             .attr('id', (d, i) => 'connection-' + cluserIndex.toString() + '-' + i.toString())
//             .attr('fill', 'red')
//             .attr("stroke", 'red')
//             .attr("value", d => d)
//             .attr("center", connectionArc.centroid)
//             .attr("stroke-width", '1px')
//             .on('mouseover', function(event, d){
//                 event.stopPropagation();    // 组织事件传播
//                 if(d3.select(this).attr('value') === '0') return 
//                 let curConnection = d3.select(this).attr("id").split('-').slice(1, 3)
//                 let sourceCenter = d3.select(this).attr('center').split(",").map(parseFloat)
//                 let sourceG = d3.select(this.parentNode.parentNode).attr('transform')
//                 let sourceGPos = sourceG.substring(sourceG.indexOf("(")+1, sourceG.indexOf(")")).split(",").map(parseFloat)
//                 let sourcePos = [sourceCenter[0] + sourceGPos[0], sourceCenter[1] + sourceGPos[1]]
//                 let targetObj = d3.select('#connection-' + curConnection[1] + '-' + curConnection[0])
//                 let targetCenter = targetObj.attr('center').split(",").map(parseFloat)
//                 let targetG = d3.select(targetObj._groups[0][0].parentNode.parentNode).attr('transform')
//                 let targetGPos = targetG.substring(targetG.indexOf("(")+1, targetG.indexOf(")")).split(",").map(parseFloat)
//                 let targetPos = [targetCenter[0] + targetGPos[0], targetCenter[1] + targetGPos[1]]
//                 //创建一个对角线生成器
//                 let dx = 20, cpx, cpy;
//                 let dy = Math.round(Math.abs( ( ( targetPos[1] - targetPos[0] ) / ( sourcePos[1] - sourcePos[0] ) ) * dx ));
//                 //向右上弯曲
//                 if(targetPos[1]<sourcePos[1]){
//                     cpx = Math.round(( sourcePos[0] + targetPos[0] ) / 2 + dx);
//                     cpy = Math.round(( sourcePos[1] + targetPos[1] ) / 2 + dy);
//                 }else{
//                     cpx = Math.round(( sourcePos[0] + targetPos[0] ) / 2 + dx);
//                     cpy = Math.round(( sourcePos[1] + targetPos[1] ) / 2 + dy);

//                 }
//                 var path = d3.path();
//                 path.moveTo(sourcePos[0],sourcePos[1]);
//                 path.quadraticCurveTo(cpx,cpy,targetPos[0],targetPos[1]);
//                 svg.append('path')
//                 .attr('d', path.toString())
//                 .style('fill','none')
//                 .attr('id', 'temp-line')
//                 .style('stroke','red')
//                 .style('stroke-width','2');  
//                 // svg.append('line')
//                 //     .attr('id', 'temp-line')
//                 //     .attr('x1',sourcePos[0])
//                 //     .attr('y1',sourcePos[1])
//                 //     .attr('x2',targetPos[0])
//                 //     .attr('y2',targetPos[1])
//                 //     .attr('stroke', "red")
//                 //     .attr('stroke-width', "1.5px")
//             })
//             .on("mouseout", function(){
//                 d3.select("#temp-line").remove()
//             })
//         }

//         function update(type='origin') {
//             circle.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");
//             boundingCircle
//                 .attr("cx", (d) => d.x)
//                 .attr("cy", (d) => d.y)
//                 .attr("r", (d) => d.rBounding);
//             simulation.force("collision", d3.forceCollide((d) => d.rBounding));

//             link
//                 .attr("x1", (d) => d.source.x)
//                 .attr("y1", (d) => d.source.y)
//                 .attr("x2", (d) => d.target.x)
//                 .attr("y2", (d) => d.target.y)
//             if(type == 'origin'){    // 不是力导向图确定位置之后更改布局
//                 computeAllCells();
//                 redrawAllCells();
//             }
//         }

//         function dragstarted(event, d) {
//             if (!event.active) simulation.alphaTarget(0.3).restart();
//             circle.filter((p) => p === d).attr("stroke", "black");
//         }

//         function dragged(event, d) {
//             d.x = event.x;
//             d.y = event.y;
//         }

//         function dragended(event, d) {
//             if (!event.active) simulation.alphaTarget(0);
//             d.weight = 0;
//             circle.filter((p) => p === d).attr("stroke", null);
//         }

//         function click(event, d) {
//             d.isSelected = !d.isSelected
//             if (d.isSelected) {
//                 d.weight = openWeight;
//                 d.rBounding = 200;
//                 circle.filter((p) => p === d).attr("stroke", "black");
//             } else {
//                 d.weight = 0;
//                 d.rBounding = 40;
//                 circle.filter((p) => p === d).attr("stroke", "");
//             }
//             update();
//         }

//         // 绘制voronoi区域
//         function computeAllCells() {
//             cells = voronoi(graph.nodes);
//         }
//         function redrawAllCells() {
//             var cellSelection = svg.selectAll(".cell").data(cells, function (c) {
//                 return c.site.originalObject.index;
//             });

//             cellSelection
//                 .join("path")
//                 .attr("fill", "none")
//                 .attr("pointer-events", "all")
//                 .attr("stroke", "#ccc")
//                 .attr("stroke-width", 3)
//                 .classed("cell", true)
//                 .attr("id", function (d, i) {
//                     return "cell-" + d.site.originalObject.index;
//                 })
//                 .attr("weight", function (d, i) {
//                     return d.site.originalObject.weight;
//                 })
//                 .attr("d", function (d) {
//                     return cellLiner(d) + "z";
//                 });
//         }
//         // 在初次渲染完成之后将点至于区域的中心
//         function moveToCentroid(){
//             var points = graph.nodes.map((d) => { return [d.x, d.y] })
//             var polygons = [...d3.Delaunay.from(points).voronoi([0, 0, origin_width, origin_height]).cellPolygons()]
//             polygons.forEach((d, i) => {
//                 let centroid = d3.polygonCentroid(d)
//                 graph.nodes[i].x = centroid[0]
//                 graph.nodes[i].y = centroid[1]
//                 // circle.attr("transform", "translate(" + centroid[0] + "," + centroid[1] + ")")
//                 // d3.select(circle._groups[0][i]).attr("transform", "translate(" + centroid[0] + "," + centroid[1] + ")")
//                 // d3.select(boundingCircle._groups[0][i]).attr('cx',  centroid[0]).attr('cy',  centroid[1])
//                 // link
//                 // .attr("x1", (d) => d.source.x)
//                 // .attr("y1", (d) => d.source.y)
//                 // .attr("x2", (d) => d.target.x)
//                 // .attr("y2", (d) => d.target.y);

//                 update()   // 微调布局
//                 // update("centroid")   // 不微调布局
//             });
//         }



//         // 视图缩放
//         // let zoomHandler = d3.zoom().on("zoom", zoomAction);
//         // function zoomAction(event) {
//         //   svg.attr(
//         //     "transform",
//         //     `translate(${origin_width + event.transform.x}, ${
//         //       origin_height + event.transform.y
//         //     })` +
//         //       "scale(" +
//         //       event.transform.k +
//         //       ")"
//         //   );
//         // }
//         // zoomHandler(svg);
//     };

//     return (
//         // <div id="cluster-container" style={{ width:1000, height: 500 }}>
//         // <div id="cluster-map" style={{ width: width, height: height }}></div>
//         <div
//             id="cluster-map"
//             style={{ width: "100%", height: "100%" }}
//             ref={resizeRef}
//         ></div>
//         // </div>
//     );
// };

// export default ClusterView;
