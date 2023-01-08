import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import * as seedrandom from "seedrandom";
import { voronoiTreemap as d3VoronoiTreemap } from 'd3-voronoi-treemap';
import {hexgrid as d3Hexgrid} from 'd3-hexgrid'
import {hexbin as d3Hexbin} from 'd3-hexbin'
// 首先根据力导向图生成布局
// 然后生成Voronoi Grid

var origin_width = 0;
var origin_height = 0;
var svg;
const inner_color_map = {
    0: "#e5c494",
    1: "#66c2a5",
    2: "#d17552",
    3: "#ffd92f",
    4: "#889bc6",
    5: "#a6d854",
    6: "#b3b3b3",
    7: "#e78ac3",
};
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
            origin_width = Math.floor(resizeRef.current.offsetWidth) * 0.9; // 初始化
            origin_height = Math.floor(resizeRef.current.offsetHeight) * 0.9;
            drawMap();
            //   window.addEventListener("resize", resizeChange);
        }
    }, [init]);

    const drawMap = () => {
        const innerRadius = 20,
            openWeight = 40000,
            ringIncrement = 3;
        const margin = { top: 0, right: 0, bottom: 0, left: 0 }, minHeight = 0
        const EVENT_TYPE_HOVER_GAIN = "hover-gain";
        const EVENT_TYPE_HOVER_LOSE = "hover-lose";
        const EVENT_TYPE_FOCUS = "focus";
        const EVENT_TYPE_FOCUS_GAIN = "focus-gain";
        const EVENT_TYPE_FOCUS_LOSE = "focus-lose";
        const EVENT_TYPE_ENTER_TRANSITION_COMPLETE = "enter-transition-complete";
        const EVENT_TYPE_UPDATE_TRANSITION_COMPLETE = "update-transition-complete";
        const EVENT_TYPES = [
            EVENT_TYPE_FOCUS,
            EVENT_TYPE_FOCUS_GAIN,
            EVENT_TYPE_FOCUS_LOSE,
            EVENT_TYPE_HOVER_GAIN,
            EVENT_TYPE_HOVER_LOSE,
            EVENT_TYPE_ENTER_TRANSITION_COMPLETE,
            EVENT_TYPE_UPDATE_TRANSITION_COMPLETE
        ]
        const phase1Duration = 1200, phase2Duration = 500
        function delay(ms){
            return new Promise(resolve=> setTimeout(resolve,ms));
        }

        // connection需要排序
        const graph = {
            maxLength: 3,
            maxConnection: 10,
            nodes: [
                {
                    id: 0,
                    rBounding: 10,
                    weight: 10,
                    isSelected: false,
                    content: [0, 1, 2],
                    connection: [0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    id: 1,
                    rBounding: 40,
                    weight: 10,
                    isSelected: false,
                    content: [0, 2],
                    connection: [4, 0, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    id: 2,
                    rBounding: 30,
                    weight: 10,
                    isSelected: false,
                    content: [2, 0],
                    connection: [5, 7, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    id: 3,
                    rBounding: 25,
                    weight: 10,
                    isSelected: false,
                    content: [0, 1, 2],
                    connection: [0, 4, 10, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    id: 4, rBounding: 7, weight: 10, isSelected: false, content: [0],
                    connection: [0, 0, 0, 6, 0, 8, 0, 0, 0, 5, 0, 0, 0]
                },
                {
                    id: 5, rBounding: 90, weight: 10, isSelected: false, content: [1],
                    connection: [0, 0, 0, 0, 8, 0, 4, 0, 0, 0, 0, 0, 0]
                },
                {
                    id: 6,
                    rBounding: 3,
                    weight: 10,
                    isSelected: false,
                    content: [0, 1, 2],
                    connection: [0, 0, 0, 0, 0, 4, 0, 1, 3, 0, 0, 0, 0]
                },
                {
                    id: 7, rBounding: 12, weight: 10, isSelected: false, content: [2],
                    connection: [0, 0, 0, 0, 0, 0, 1, 0, 8, 0, 0, 0, 0]
                },
                {
                    id: 8,
                    rBounding: 1,
                    weight: 10,
                    isSelected: false,
                    content: [0, 1, 2],
                    connection: [0, 0, 0, 0, 0, 0, 3, 8, 0, 0, 0, 0, 0]
                },
                {
                    id: 9,
                    rBounding: 56,
                    weight: 10,
                    isSelected: false,
                    content: [1, 2],
                    connection: [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 7, 3, 0]
                },
                {
                    id: 10,
                    rBounding: 234,
                    weight: 10,
                    isSelected: false,
                    content: [2, 1],
                    connection: [0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 4, 2]
                },
                {
                    id: 11,
                    rBounding: 22,
                    weight: 10,
                    isSelected: false,
                    content: [0, 2, 1],
                    connection: [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 0, 8]
                },
                {
                    id: 12,
                    rBounding: 65,
                    weight: 10,
                    isSelected: false,
                    content: [0, 1, 2],
                    connection: []
                },
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
                { source: 11, target: 5 },
                { source: 11, target: 3 },
                { source: 12, target: 10 },
            ],
        };
        const cluster_arr = []
        const Origindata ={
            "id": 999,
            "maxLength": 3,
            "maxConnection": 10,
            "children": [
              {
                "id": 0,
                "value": 7074,
                content: [0, 1, 2],
                connection: [0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              },
              {
                "id": 1,
                "value": 3938,
                content: [0, 2],
                connection: [4, 0, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              },
              {
                "id": 2,
                "value": 7576840,
                content: [2, 0],
                connection: [5, 7, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              },
              {
                "id": 3,
                "value": 212,
                content: [0, 1, 2],
                connection: [0, 4, 10, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0]
              },
              {
                "id": 4,
                "value": 7074, 
                content: [0],
                connection: [0, 0, 0, 6, 0, 8, 0, 0, 0, 5, 0, 0, 0]
              },
              {
                "id": 5,
                "value": 3938, 
                content: [1],
                connection: [0, 0, 0, 0, 8, 0, 4, 0, 0, 0, 0, 0, 0]
              },
              {
                "id": 6,
                "value": 7576840,
                content: [0, 1, 2],
                connection: [0, 0, 0, 0, 0, 4, 0, 1, 3, 0, 0, 0, 0]
              },
              {
                "id": 7,
                "value": 212, 
                content: [2],
                connection: [0, 0, 0, 0, 0, 0, 1, 0, 8, 0, 0, 0, 0]
              },
              {
                "id": 8,
                "value": 7074,
                content: [0, 1, 2],
                connection: [0, 0, 0, 0, 0, 0, 3, 8, 0, 0, 0, 0, 0]
              },
              {
                "id": 9,
                "value": 3938,
                content: [1, 2],
                connection: [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 7, 3, 0]
              },
              {
                "id": 10,
                "value": 7576840,
                content: [2, 1],
                connection: [0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 4, 2]
              },
              {
                "id": 11,
                "value": 212,
                content: [0, 2, 1],
                connection: [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 0, 8]
              },
              {
                "id": 12,
                "value": 656,
                content: [0, 2, 1],
                connection: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]   // 数值表示权重，位置表示集群
              }
            ]
          }
          
          
        const data = d3.hierarchy(Origindata).sum((d) => {
            if(!d.children){
                cluster_arr.push(d.id)
            }
            return d.children ? 0 : Math.random()
        })
        const svg = d3
            .select("#cluster-map")
            .append("svg")
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", [0, 0, origin_width - margin.left - margin.right, origin_height - margin.top - margin.bottom])
            .attr("stroke-width", 2);

        // 绘图内容的形状
        const upButtonSize = 50, showUpButton = true;
        const createDispatcher = () => new d3.dispatch(...EVENT_TYPES)
        const dispatcher = createDispatcher();
        const createBaseShape = (origin_width, origin_height, upButtonSize, showUpButton) =>
            showUpButton
                ? [
                    [0, upButtonSize],
                    [upButtonSize, 0],
                    [origin_width - 1, 0],
                    [origin_width - 1, origin_height - 1],
                    [0, origin_height - 1]
                ]
                : [
                    [0, 0],
                    [origin_width - 1, 0],
                    [origin_width - 1, origin_height - 1],
                    [0, origin_height - 1]
                ]
        const baseShape = createBaseShape(origin_width, origin_height, upButtonSize, showUpButton);
        let current = null;
        const focusParent = () =>{
            if(current.parent){    // 当前是第二层
                delay(phase1Duration).then(() => d3.selectAll('.circle-g').style('visibility', 'visible'))
            }
            return current.parent ? renderNode(current.parent) : null;
        }
        dispatcher.on(EVENT_TYPE_FOCUS, renderNode);
        document.addEventListener("keyup", ({ code, key }) => {
            if (code === "ArrowUp" || code === "Escape") {
                focusParent();
            }
        });
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("id", "map-background")
            .style("fill", 'white');
        const voronoi = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        // 向父级返回的按钮
        if (showUpButton) {
            const upButton = svg
                .append("g")
                .classed("up-button", true)
                .attr("cursor", "pointer")
                .on("click", focusParent);

            upButton
                .append("path")
                .datum([
                    [0, 0],
                    [0, upButtonSize],
                    [upButtonSize, 0]
                ])
                .attr("d", d3.line())
                .attr("cx", upButtonSize / 2)
                .attr("cy", upButtonSize / 2)
                .attr("r", upButtonSize / 2)
                .attr("fill", "#333333");

            upButton
                .append("text")
                .attr("fill", '#fff')
                .attr("font-size", "1.5emem")
                .attr("font-weight", "bold")
                .attr("dx", "0.1em")
                .attr("dy", "1.1em")
                .text("UP");
            upButton.append("title");
        }

        establishColor(data);
        const strokeWidthRange = [15, 0.5]
        const strokeWidth = d3.scalePow().exponent(1.2).range(strokeWidthRange)
        strokeWidth.domain(d3.extent(data.descendants(), (d) => d.depth));   // 边线的宽度，随深度变化
        const getId = (d) => d.data.id
        const isEqual = (a, b) => getId(a) === getId(b)

        const computeRelatedness = (node, score = 1, map = { dummy: 0 }) => {
            if (!map[getId(node)] && !isEqual(node, current)) {
                map[getId(node)] = score;
                computeRelatedness(node.parent, score / 2, map);
                (node.children || []).forEach((child) =>
                    computeRelatedness(child, score / 2, map)
                );
            }
            return map;
        };
        const opacityFactory = (node) => {
            const relatednessMap = computeRelatedness(node);
            const opacityScale = d3
                .scalePow()
                .exponent(0.5)
                .domain(d3.extent(Object.values(relatednessMap)))
                .range([0.3, 1]);

            return (d) => {
                const relatedness = relatednessMap[getId(d)];
                return relatedness ? opacityScale(relatedness) : 0.2;
            };
        };
        //  节点的事件处理函数
        const onFocus = () => { }, onHover = () => { }
        const handleHoverEnter = (node, event) => {
            dispatcher.call(EVENT_TYPE_HOVER_GAIN, this, node);
            if (!isEqual(node, current)) {
                onHover(node, event, true);
                const nodeOpacity = opacityFactory(node);
                voronoi
                    .selectAll(".node")
                    .filter((d) => d.height === 0)
                    .attr("opacity", 1);
            }
        };
        const handleHoverExit = (node, event) => {
            onHover(node, event, false);
            dispatcher.call(EVENT_TYPE_HOVER_LOSE, this);
            voronoi
                .selectAll(".node")
                .filter((d) => d.height === 0)
                .attr("opacity", 1);
        };
        const handleNodeClick = (node) => {
            
            d3.selectAll('.circle-g').style('visibility', 'hidden')
            const target =
                node !== current
                    ? node.ancestors().find((d) => d.depth === current.depth + 1)
                    : node.parent;

            if (target.height >= minHeight) {
                renderNode(target);
            }
        };

        const colorScale = d3.scaleSequential(d3.interpolateTurbo)
        const getColor = (d) => colorScale(d.colorValue)
        const getName = (d) => d.data.name
        const uuid = () =>
            ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (c) =>
                (
                    c ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
                ).toString(16)
            )
        const chartUid = uuid();
        const createEventName = (name) => [name, chartUid].join(".");
        const showLabel = (node, current) => {
            return (
              node.depth === current.depth + 1 ||
              (node.height === 0 && current.height === 0)
            );
          }
        
        // 在区域中心添加文本
        const appendLabel = (selection, datum, i, getName) => {
            const { id, href } =uuid("centerline"); // necessary for Firefox
          
            // if (!datum.label) {
            //   datum.lable = computeCenterlineLabel({
            //     label: getName(datum),
            //     polygon: datum.simplePolygon,
            //     numPerimeterPoints: 10,
            //     simplification: 20,
            //     strategy: "high"
            //   });
            // }
          
            const { centerline, offset, label, maxFontSize } = datum.lable;
          
            const labelG = selection
              .append("g")
              .classed("label", true)
              .style(
                "font-family",
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;"
              )
              .style("font-size", `${maxFontSize * 0.9}px`)
              .style("font-weight", 500)
              .style("user-select", "none")
              .style("letter-spacing", "0em")
              .style("text-transform", "uppercase")
              .style("text-shadow", "0 0 5px black")
              .attr("fill", "white")
              .attr("pointer-events", "none");
          
            labelG
              .append("path")
              .attr("id", id)
              .attr("d", centerline)
              .attr("visibility", "hidden");
          
            labelG
          
              .append("text")
              .attr("dy", "0.35em")
              .attr("opacity", 0.75)
              .append("textPath")
              .attr("xlink:href", href)
              .attr("startOffset", `${100 * offset}%`)
              .attr("text-anchor", "middle")
              .text(d =>d.value.toString().split(".")[1]);
          }

        
        function renderNode(node) {
            if (current && isEqual(node, current)) return;
            dispatcher.call(EVENT_TYPE_FOCUS_GAIN, this, node);
            if (current) {
                dispatcher.call(EVENT_TYPE_FOCUS_LOSE, this, current);
            }
            onFocus(node);
            node.each((node) => (node.oldPolygon = node.polygon));
            if (showUpButton) {
                const upButton = svg
                    .select(".up-button")
                    .attr("cursor", node.depth === 0 ? "not-allowed" : "pointer"); // 如果是顶层，向上返回的按钮则无法点击
                upButton.select("text").attr("opacity", node.depth === 0 ? 0.5 : 1);
            }

            const voronoiTreeMap = d3VoronoiTreemap()
                .prng(seedrandom("a seed"))
                .clip(baseShape);

            voronoiTreeMap(node);
            node.each((node) => {
                const [x0, x1] = d3.extent(node.polygon, (d) => d[0]);
                const [y0, y1] = d3.extent(node.polygon, (d) => d[1]);

                node.simplePolygon = node.polygon;
                const width = x1 - x0;
                const height = y1 - y0;
                node.polyProps = {
                    centroid: d3.polygonCentroid(node.simplePolygon),
                    bounds: [
                        [x0, y0],
                        [x1, y1]
                    ],
                    width,
                    height,
                    aspect: height / width,
                    max: d3.max([width, height]),
                    min: d3.min([width, height])
                };
                node.polygon = coordinatePolygons(node.oldPolygon, node.polygon);
            });
            let nodes = node.descendants().sort((a, b) => b.depth - a.depth);
            const nodeExit = (selection) => {
                selection.remove();
            };
            voronoi
                .selectAll(".node")
                .data(nodes, getId)
                .join((selection) =>
                        nodeEnter({
                            selection,
                            current: node,
                            prevouse: current
                        }),
                    (selection) =>
                        nodeUpdate({
                            selection,
                            current: node
                        }),
                    nodeExit
                );

            current = node;
        }

        renderNode(data);
        
        const computeAngle = ([x0, y0], [x1, y1]) => {
            return Math.atan2(y1 - y0, x1 - x0)
          }
        function coordinatePolygons(source, target, pointCount = 20){
            const expandedPolygon = fixedPointCount(target, pointCount);
            if (!source || source.length === 0) return expandedPolygon;
            const sourceCentroid = computeCentroid(source);
            const targetCentroid = computeCentroid(expandedPolygon);
            const startTheta = computeAngle(sourceCentroid, source[0]);
            const pointWidthClosestTheta = expandedPolygon
                .map((point, i) => ({
                    theta: Math.abs(computeAngle(targetCentroid, point)),
                    index: i
                }))
                .sort((a, b) => a.theta - b.theta)[0].index;

            const coordinatedPolygon = [
                ...expandedPolygon.slice(pointWidthClosestTheta),
                ...expandedPolygon.slice(0, pointWidthClosestTheta)
            ];

            return d3.polygonArea(source) * d3.polygonArea(coordinatedPolygon) < 0
                ? coordinatedPolygon.reverse()
                : coordinatedPolygon;
        }

        function nodeEnter({
            selection,
            current,
            previouse
        }){
            delay(previouse === null ? 0 : phase1Duration).then(()=>{
                const all = selection.append("g").classed("node", true);
                 const t = new d3.transition().duration(phase2Duration);
                //  const applyLabels = () => {
                //    all
                //      .filter((d) => showLabel(d, current))
                //      .each(function (datum, index) {
                //        appendLabel(d3.select(this), datum, index, getName);
                //      });
           
                //    all
                //      .filter((d) => !showLabel(d, current))
                //      .select(".label")
                //      .remove();
                //    dispatcher.call(EVENT_TYPE_ENTER_TRANSITION_COMPLETE, this);
                //  };
           
                //  t.end().then(applyLabels, applyLabels);
                const hexbin = d3Hexbin()
                .x(d => d.x)
                .y(d => d.y)
                .radius(5)
                .extent([[0, 0], [origin_width, origin_height]])


                 all
                   .append("polygon")
                   .classed("body", true)
                   .attr("points", (d) => d.polygon)
                   .attr("fill", (d) => (d.height > 0 ? "none" : getColor(d)))
                   .attr("stroke", "white")
                   .attr("stroke-opacity", 1)
                   .attr("stroke-width", 0)
                   .attr("stroke-linejoin", "round")
                   .attr("pointer-events", (d) => (d.height === 0 ? "fill" : "none"))
                   .attr("stroke-width", (d) => strokeWidth(d.depth))
                // all.selectAll(".hexagon")
                //    .data(d => d.polygon)
                //    join()

                const innerCirle = all
                    .filter((d) => d.depth === 1)
                    .append("g")
                    .attr('transform', d => "translate(" + d.polyProps.centroid[0] + "," + d.polyProps.centroid[1] + ")")
                    .attr("class", "circle-g")
                    .style("visibility", "visible")
                    .attr('id', d => 'cirle-g-' + d.data.id)
                    .on('mouseover', function(event, d){
                        if(d3.select(this).style('visibility') === 'hidden') return
                        let sourcePos = d.polyProps.centroid;   // 当前节点的中心坐标
                        d.data.connection.forEach((n, index) =>{
                            if(n !== 0){
                                let targetPos = d3.select('#cirle-g-' + index)._groups[0][0].__data__.polyProps.centroid
                                console.log(sourcePos, targetPos);
                                //创建一个对角线生成器
                                let dx = 20, cpx, cpy;
                                let dy = Math.round(Math.abs( ( ( targetPos[1] - targetPos[0] ) / ( sourcePos[1] - sourcePos[0] ) ) * dx ));
                                //向右上弯曲
                                if(targetPos[1]<sourcePos[1]){
                                    cpx = Math.round(( sourcePos[0] + targetPos[0] ) / 2 + dx);
                                    cpy = Math.round(( sourcePos[1] + targetPos[1] ) / 2 + dy);
                                }else{
                                    cpx = Math.round(( sourcePos[0] + targetPos[0] ) / 2 + dx);
                                    cpy = Math.round(( sourcePos[1] + targetPos[1] ) / 2 + dy);
                
                                }
                                let path = d3.path();
                                path.moveTo(sourcePos[0],sourcePos[1]);
                                path.quadraticCurveTo(cpx,cpy,targetPos[0],targetPos[1]);
                                svg.append('path')
                                .attr('d', path.toString())
                                .style('fill','none')
                                .attr('class', 'node-to-node')
                                .style('stroke', 'rgba(55, 55, 61, 0.5)')
                                .style('stroke-width','2');
                            }
                        })

                    })
                    .on('mouseout', function(event, d){
                        d3.selectAll('.node-to-node').remove()   // 移除节点之间的所有连接
                    })


                // 圆心点
                innerCirle
                    .append("circle")
                    .attr("cx", 0)
                    .attr("cy", 0)
                    .attr("r", innerRadius-6)
                    .attr("class", "center-point")
                    .attr("id", d => 'node-' + d.data.id)
                    .attr("fill", "white")
                innerCirle
                    .append("text")
                    .attr("x", 0)
                    .attr("y", 5)
                    .attr("font", "10px sans-serif")
                    .attr("fill", "black")
                    .attr("text-anchor", "middle")
                    .text((d) => d.data.id)
                const innerArc = d3
                                .arc()
                                .innerRadius(innerRadius - 10)
                                .outerRadius(innerRadius - 1)
                                .startAngle((i) => ((2 * Math.PI) / data.data.maxLength) * i - 2)
                                .endAngle((i) => ((2 * Math.PI) / data.data.maxLength) * (i + 1) - 2)
                                .cornerRadius(1)
                                .padAngle(0.05);
                const innerArcPath = innerCirle
                    .selectAll("path")
                    .data((d) => d.data.content)
                    .join("path")
                    .attr("d", (d, i) => innerArc(i))
                    .attr("stroke-width", '1')
                    .attr("fill", (d) => inner_color_map[d]);
                
                // 绘制外围bar表示关系
                const circleRingG = innerCirle.append('g').attr("class", 'circle-ring-g')
                const connectionArc = d3.arc()
                                        .innerRadius(d => connectionY(0))
                                        .outerRadius(d => connectionY(d))
                                        .startAngle((d, i) => connectionX(i))
                                        .endAngle((d, i) => connectionX(i) + connectionX.bandwidth())
                                        .padAngle(0.05)
                                        // .padRadius(innerR)
                const connectionX = d3.scaleBand()
                                    .domain(cluster_arr.map((d, i) => i))
                                    .range([0, 2 * Math.PI])
                                    .align(0)
                const connectionY = d3.scaleRadial()
                                    .domain([0, data.data.maxConnection])
                                    .range([innerRadius+ 1, innerRadius + 10])
                circleRingG.selectAll("path")
                        .data(d => d.data.connection)
                        .join("path")
                        .attr("d", connectionArc)
                        .attr('id', function(d, i){
                            let curCluster = d3.select(this.parentNode)._groups[0][0].__data__.data.id;
                            return 'connection-' + curCluster.toString() + '-' + i.toString()
                        })
                        .attr('fill', 'black')
                        .attr("stroke", 'rgba(30, 30, 30, 1)')
                        .attr("value", d => d)
                        .attr("center", connectionArc.centroid)
                        .attr("stroke-width", '1px')
                        .on('mouseover', function(event, d){
                            if(d3.select(this.parentNode.parentNode).style('visibility') === 'hidden') return
                            event.stopPropagation();    // 组织事件传播
                            if(d3.select(this).attr('value') === '0') return 
                            let curConnection = d3.select(this).attr("id").split('-').slice(1, 3)
                            let sourceG = d3.select(this.parentNode)._groups[0][0].__data__.polyProps.centroid
                            let sourceCenter = d3.select(this).attr('center').split(",").map(parseFloat)
                            let sourcePos = [sourceCenter[0] + sourceG[0], sourceCenter[1] + sourceG[1]]
                            let targetObj = d3.select('#connection-' + curConnection[1] + '-' + curConnection[0])
                            let targetCenter = targetObj.attr('center').split(",").map(parseFloat)
                            let targetG = d3.select(targetObj._groups[0][0].parentNode)._groups[0][0].__data__.polyProps.centroid
                            let targetPos = [targetCenter[0] + targetG[0], targetCenter[1] + targetG[1]]
                            //创建一个对角线生成器
                            let dx = 20, cpx, cpy;
                            let dy = Math.round(Math.abs( ( ( targetPos[1] - targetPos[0] ) / ( sourcePos[1] - sourcePos[0] ) ) * dx ));
                            //向右上弯曲
                            if(targetPos[1]<sourcePos[1]){
                                cpx = Math.round(( sourcePos[0] + targetPos[0] ) / 2 + dx);
                                cpy = Math.round(( sourcePos[1] + targetPos[1] ) / 2 + dy);
                            }else{
                                cpx = Math.round(( sourcePos[0] + targetPos[0] ) / 2 + dx);
                                cpy = Math.round(( sourcePos[1] + targetPos[1] ) / 2 + dy);
            
                            }
                            let path = d3.path();
                            path.moveTo(sourcePos[0],sourcePos[1]);
                            path.quadraticCurveTo(cpx,cpy,targetPos[0],targetPos[1]);
                            svg.append('path')
                            .attr('d', path.toString())
                            .style('fill','none')
                            .attr('id', 'temp-line')
                            .style('stroke', 'rgba(55, 55, 61, 0.5)')
                            .style('stroke-width','2');
                        })
                        .on("mouseout", function(){
                            d3.select("#temp-line").remove()
                        })

                 all
                   .filter((d) => d.height === 0)
                   .on(createEventName("click"), (event, node) =>
                     handleNodeClick(node, event)
                   )
                   .on(createEventName("mouseenter"), (event, node) =>
                     handleHoverEnter(node, event)
                   )
                   .on(createEventName("mouseleave"), (event, node) =>
                     handleHoverExit(node, event)
                   );
               })
        }

        function nodeUpdate({
            selection,
            current
        }){
            const branches = selection
                .filter((d) => d.height > 0)
                .attr("visibility", "hidden");
            const leaves = selection.filter((d) => d.height === 0);
            const t = d3.transition("update-phase-1").duration(phase1Duration);

            selection.selectAll(".label").remove();

            t.end().then(
                () => {
                    branches
                        .attr("visibility", "visible")
                        .select("polygon")
                        .attr("points", (d) => d.polygon)
                        .transition()
                        .duration(phase2Duration)
                        .attr("stroke-width", (d) => strokeWidth(d.depth));

                    // selection
                    //     .filter((d) => showLabel(d, current))
                    //     .each(function (datum, index) {
                    //         appendLabel(d3.select(this), datum, index, getName);
                    //     });

                    selection
                        .selectAll(".label")
                        .filter((d) => !showLabel(d, current))
                        .remove();

                    leaves
                        .on(createEventName("mouseenter"), (event, node) =>
                            handleHoverEnter(node, event)
                        )
                        .on(createEventName("mouseleave"), (event, node) =>
                            handleHoverExit(node, event)
                        );
                    dispatcher.call(EVENT_TYPE_UPDATE_TRANSITION_COMPLETE, this);
                }
            );

            leaves
                .on(createEventName("mouseenter"), null)
                .on(createEventName("mouseleave"), null)
                .attr("opacity", 1)
                .select(".body")
                .attr("stroke-width", (d) => strokeWidth(d.depth))
                .transition(t)
                .attr("points", (d) => d.polygon);
        }

        function computeCentroid(shape){
            return shape.reduce(([xSum, ySum], [x, y]) => [xSum + x, ySum + y], [0, 0])
                    .map(d => d / shape.length)
        }
        function createMeasurablePath(points){
            return d3.select("#root")
                .append('svg')
                .append("path")
                .datum(points)
                .attr("d", d3.line())
                .attr("stroke", 'none')
                .node()
        }
        function computeDistances(coordinates){
            return coordinates.reduce((distances, coordinate, i) => {
              const value =
                i === 0
                  ? 0
                  : distances[i - 1] + computeDistance(coordinates[i - 1], coordinate);
              distances.push(value);
              return distances;
            }, []);
          }
          function computeDistance(coord1, coord2){
            var distX = coord2[0] - coord1[0];
            var distY = coord2[1] - coord1[1];
            return Math.sqrt(distX * distX + distY * distY);
          }
        function fixedPointCount(shape, count){
            const measurablePath = createMeasurablePath(shape);

            const newPointCount = count - shape.length + 1;

            if (count < 1) return shape;

            const distances = computeDistances(shape);
            const length = distances[distances.length - 1];

            const distancePoints = distances.map((distance, i) => ({
                distance,
                point: shape[i]
            }));

            const positionScale = d3
                .scaleLinear()
                .domain([0, newPointCount - 1])
                .range([0.001, length]);

            return d3.range(newPointCount).reduce((points, index) => {
                const position = positionScale(index);
                while (distancePoints.length > 0 && position > distancePoints[0].distance) {
                    points.push(distancePoints[0].point);
                    distancePoints.shift();
                }
                const { x, y } = measurablePath.getPointAtLength(position);
                points.push([x, y]);
                return points;
            }, []);
        }

        // 为节点分配颜色
        function establishColor(root, domain = [0, 1], getWeight = d => d.value){
            const _establishColor = (node, domain) => {
                node.colorDomain = domain;
                node.colorValue = d3.sum(domain) / 2;
                if (node.children) {
                    const sum = d3.sum(node.children.map(getWeight));
                    const scale = d3
                        .scaleLinear()
                        .domain([0, sum])
                        .range(domain);

                    (node.children || [])
                        //.sort((a, b) => getWeight(a) - getWeight(b))
                        .reduce((sum, child) => {
                            const progress = sum + getWeight(child);
                            _establishColor(child, [sum, progress].map(scale));
                            return progress;
                        }, 0);
                }
            };

            _establishColor(root, domain);
        }

    }

    return (
        <div
            id="cluster-map"
            style={{ width: "100%", height: "100%" }}
            ref={resizeRef}
        ></div>
    );
};

export default ClusterView;
