import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import * as seedrandom from "seedrandom";
import { voronoiTreemap as d3VoronoiTreemap } from "d3-voronoi-treemap";
import * as d3Cloud from "d3-cloud";
import "./css/clusterView.css";
import ClusterTopics from "./clusterTopics";
// import { hexgrid as d3Hexgrid } from "d3-hexgrid";
// import { hexbin as d3Hexbin } from "d3-hexbin";
// 首先根据力导向图生成布局
// 然后生成Voronoi Grid

var originWidth = 0;
var originHeight = 0;
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
  const [clusterHovering, setClusterHovering] = useState(-1); // 当前聚类视图中滚动条正放置的元素
  const resizeRef = useRef(null);

  useEffect(() => {
    setInit(true);
  }, []);

  // useEffect(() => {
  //   if (init && (originHeight !== 0 || originWidth !== 0)) {
  //     drawMap();
  //   }
  // }, [maximum]);
  useEffect(() => {
    if (init) {
      originWidth = Math.floor(resizeRef.current.offsetWidth) * 0.9; // 初始化
      originHeight = Math.floor(resizeRef.current.offsetHeight) * 0.9;
      drawMap();
    }
  }, [init]);

  const drawMap = () => {
    const innerRadius = 15,
      openWeight = 40000,
      ringIncrement = 3;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 },
      minHeight = 0;
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
      EVENT_TYPE_UPDATE_TRANSITION_COMPLETE,
    ];
    const phase1Duration = 1200,
      phase2Duration = 500;
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // connection需要排序
    const cluster_arr = [];
    const Origindata = {
      id: 999,
      maxLength: 3,
      maxConnection: 10,
      children: [
        {
          id: 0,
          value: 7074,
          type: "cluster",
          content: [0, 1, 2],
          connection: [0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          children: [
            {
              id: "AgglomerativeCluster",
              value: 3938,
            },
            {
              id: "CommunityStructure",
              value: 3812,
            },
            {
              id: "HierarchicalCluster",
              value: 6714,
            },
            {
              id: "MergeEdge",
              value: 743,
            },
            {
              id: "AgglomerativeCluster1",
              value: 3938,
            },
            {
              id: "CommunityStructure1",
              value: 3812,
            },
            {
              id: "HierarchicalCluster1",
              value: 6714,
            },
            {
              id: "MergeEdge1",
              value: 743,
            },
            {
              id: "AgglomerativeCluster2",
              value: 3938,
            },
            {
              id: "CommunityStructure2",
              value: 3812,
            },
            {
              id: "HierarchicalCluster2",
              value: 6714,
            },
            {
              id: "MergeEdge2",
              value: 743,
            },
          ],
        },
        {
          id: 1,
          type: "cluster",
          value: 3938,
          content: [0, 2],
          connection: [4, 0, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          children: [
            {
              id: "BetweennessCentrality",
              value: 3534,
            },
            {
              id: "LinkDistance",
              value: 5731,
            },
            {
              id: "MaxFlowMinCut",
              value: 7840,
            },
            {
              id: "ShortestPaths",
              value: 5914,
            },
            {
              id: "SpanningTree",
              value: 3416,
            },
          ],
        },
        {
          id: 2,
          type: "cluster",
          value: 840,
          content: [2, 0],
          connection: [5, 7, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          children: [
            {
              id: "AspectRatioBanker",
              value: 7074,
            },
          ],
        },
        {
          id: 3,
          type: "cluster",
          value: 212,
          content: [0, 1, 2],
          connection: [0, 4, 10, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
          children: [
            {
              id: "AxisLabel",
              value: 636,
            },
            {
              id: "CartesianAxes",
              value: 6703,
            },
          ],
        },
        {
          id: 4,
          type: "cluster",
          value: 7074,
          content: [0],
          connection: [0, 0, 0, 6, 0, 8, 0, 0, 0, 5, 0, 0, 0],
          children: [
            {
              id: "Easing",
              value: 17010,
            },
            {
              id: "FunctionSequence",
              value: 5842,
            },
            {
              id: "Parallel",
              value: 5176,
            },
            {
              id: "Pause",
              value: 449,
            },
          ],
        },
        {
          id: 5,
          type: "cluster",
          value: 938,
          content: [1],
          connection: [0, 0, 0, 0, 8, 0, 4, 0, 0, 0, 0, 0, 0],
          children: [
            {
              id: "ExpandControl",
              value: 2832,
            },
            {
              id: "HoverControl",
              value: 4896,
            },
            {
              id: "IControl",
              value: 763,
            },
            {
              id: "PanZoomControl",
              value: 5222,
            },
            {
              id: "SelectionControl",
              value: 7862,
            },
            {
              id: "TooltipControl",
              value: 8435,
            },
          ],
        },
        {
          id: 6,
          type: "cluster",
          value: 740,
          content: [0, 1, 2],
          connection: [0, 0, 0, 0, 0, 4, 0, 1, 3, 0, 0, 0, 0],
          children: [
            {
              id: "ObjectInterpolator",
              value: 1629,
            },
            {
              id: "PointInterpolator",
              value: 1675,
            },
            {
              id: "RectangleInterpolator",
              value: 2042,
            },
          ],
        },
        {
          id: 7,
          type: "cluster",
          value: 212,
          content: [2],
          connection: [0, 0, 0, 0, 0, 0, 1, 0, 8, 0, 0, 0, 0],
          children: [
            {
              id: "Scheduler",
              value: 5593,
            },
            {
              id: "Sequence",
              value: 5534,
            },
            {
              id: "Transition",
              value: 9201,
            },
            {
              id: "Transitioner",
              value: 19975,
            },
            {
              id: "TransitionEvent",
              value: 1116,
            },
            {
              id: "Tween",
              value: 6006,
            },
          ],
        },
        {
          id: 8,
          type: "cluster",
          value: 7074,
          content: [0, 1, 2],
          connection: [0, 0, 0, 0, 0, 0, 3, 8, 0, 0, 0, 0, 0],
          children: [
            {
              id: "Converters",
              value: 721,
            },
            {
              id: "DelimitedTextConverter",
              value: 4294,
            },
            {
              id: "GraphMLConverter",
              value: 9800,
            },
            {
              id: "IDataConverter",
              value: 1314,
            },
            {
              id: "JSONConverter",
              value: 2220,
            },
          ],
        },
        {
          id: 9,
          type: "cluster",
          value: 3938,
          content: [1, 2],
          connection: [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 7, 3, 0],
          children: [
            {
              id: "DirtySprite",
              value: 8833,
            },
            {
              id: "LineSprite",
              value: 1732,
            },
            {
              id: "RectSprite",
              value: 3623,
            },
            {
              id: "TextSprite",
              value: 10066,
            },
          ],
        },
        {
          id: 10,
          type: "cluster",
          value: 6840,
          content: [2, 1],
          connection: [0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 4, 2],
          children: [
            {
              id: "Legend",
              value: 20859,
            },
            {
              id: "LegendItem",
              value: 4614,
            },
            {
              id: "LegendRange",
              value: 10530,
            },
          ],
        },
        {
          id: 11,
          type: "cluster",
          value: 212,
          content: [0, 2, 1],
          connection: [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 0, 8],
          children: [
            {
              id: "AnchorControl",
              value: 2138,
            },
            {
              id: "ClickControl",
              value: 3824,
            },
            {
              id: "Control",
              value: 1353,
            },
            {
              id: "ControlList",
              value: 4665,
            },
            {
              id: "DragControl",
              value: 2649,
            },
          ],
        },
        {
          id: 12,
          type: "cluster",
          value: 656,
          content: [0, 2, 1],
          connection: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          children: [
            {
              id: "Axes",
              value: 1302,
            },
            {
              id: "Axis",
              value: 24593,
            },
            {
              id: "AxisGridLine",
              value: 652,
            },
          ],
        },
      ],
    };

    const data = d3.hierarchy(Origindata).sum((d) => {
      if (d.type === "cluster") {
        cluster_arr.push(d.id);
      }
      return d.children ? 0 : d.value;
    });
    const svg = d3
      .select("#cluster-map")
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", [
        0,
        0,
        originWidth - margin.left - margin.right,
        originHeight - margin.top - margin.bottom,
      ])
      .attr("stroke-width", 2);

    // 绘图内容的形状
    const upButtonSize = 50,
      showUpButton = true;
    const createDispatcher = () => new d3.dispatch(...EVENT_TYPES);
    const dispatcher = createDispatcher();
    const createBaseShape = (
      originWidth,
      originHeight,
      upButtonSize,
      showUpButton
    ) =>
      showUpButton
        ? [
            [0, upButtonSize],
            [upButtonSize, 0],
            [originWidth - 1, 0],
            [originWidth - 1, originHeight - 1],
            [0, originHeight - 1],
          ]
        : [
            [0, 0],
            [originWidth - 1, 0],
            [originWidth - 1, originHeight - 1],
            [0, originHeight - 1],
          ];
    const baseShape = createBaseShape(
      originWidth,
      originHeight,
      upButtonSize,
      showUpButton
    );
    let current = null;
    const focusParent = () => {
      if (current.parent && current.height !== 0) {
        // 当前是第二层
        delay(phase1Duration).then(() => {
          console.log(current.height);
          d3.selectAll(".circle-g").style("visibility", "visible");
        });
      }
      return current.parent ? renderNode(current.parent) : null;
    };
    dispatcher.on(EVENT_TYPE_FOCUS, renderNode);
    document.addEventListener("keyup", ({ code, key }) => {
      if (code === "ArrowUp" || code === "Escape") {
        focusParent();
      }
    });
    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("id", "map-background")
      .style("fill", "white");
    const voronoi = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
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
          [upButtonSize, 0],
        ])
        .attr("d", d3.line())
        .attr("cx", upButtonSize / 2)
        .attr("cy", upButtonSize / 2)
        .attr("r", upButtonSize / 2)
        .attr("fill", "#333333");

      upButton
        .append("text")
        .attr("fill", "#fff")
        .attr("font-size", "1.5emem")
        .attr("font-weight", "bold")
        .attr("dx", "0.1em")
        .attr("dy", "1.1em")
        .text("UP");
      upButton.append("title");
    }

    establishColor(data);
    const strokeWidthRange = [15, 1];
    const strokeWidth = d3.scalePow().exponent(1.2).range(strokeWidthRange);
    strokeWidth.domain(d3.extent(data.descendants(), (d) => d.depth)); // 边线的宽度，随深度变化
    const getId = (d) => d.data.id;
    const isEqual = (a, b) => getId(a) === getId(b);

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
    const onFocus = () => {},
      onHover = () => {};
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
      dispatcher.call(EVENT_TYPE_HOVER_LOSE, this);
      voronoi
        .selectAll(".node")
        .filter((d) => d.height === 0)
        .attr("opacity", 1);
    };
    const handleNodeClick = (node) => {
      d3.selectAll(".circle-g").style("visibility", "hidden");
      const target =
        node !== current
          ? node.ancestors().find((d) => d.depth === current.depth + 1)
          : node.parent;

      if (target.height > minHeight) {
        // 最后一层不进入
        renderNode(target);
      }
    };

    const colorScale = d3.scaleSequential(d3.interpolateTurbo);
    const getColor = (d) => colorScale(d.colorValue);
    const getName = (d) => d.data.name;
    const uuid = () =>
      ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    const chartUid = uuid();
    const createEventName = (name) => [name, chartUid].join(".");
    const showLabel = (node, current) => {
      return (
        node.depth === current.depth + 1 ||
        (node.height === 0 && current.height === 0)
      );
    };

    // 在区域中心添加文本
    const appendLabel = (selection, datum, i, getName) => {
      const { id, href } = uuid("centerline"); // necessary for Firefox

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
        .text((d) => d.value.toString().split(".")[1]);
    };

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
            [x1, y1],
          ],
          width,
          height,
          aspect: height / width,
          max: d3.max([width, height]),
          min: d3.min([width, height]),
          maxRadius: polygonMaxRadius(
            node.simplePolygon,
            d3.polygonCentroid(node.simplePolygon),
            strokeWidth(node.depth)
          ),
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
        .join(
          (selection) =>
            nodeEnter({
              selection,
              current: node,
              prevouse: current,
            }),
          (selection) =>
            nodeUpdate({
              selection,
              current: node,
            }),
          nodeExit
        );

      current = node;
    }

    renderNode(data);

    console.log(data);

    const computeAngle = ([x0, y0], [x1, y1]) => {
      return Math.atan2(y1 - y0, x1 - x0);
    };
    function coordinatePolygons(source, target, pointCount = 20) {
      const expandedPolygon = fixedPointCount(target, pointCount);
      if (!source || source.length === 0) return expandedPolygon;
      const sourceCentroid = computeCentroid(source);
      const targetCentroid = computeCentroid(expandedPolygon);
      const startTheta = computeAngle(sourceCentroid, source[0]);
      const pointWidthClosestTheta = expandedPolygon
        .map((point, i) => ({
          theta: Math.abs(computeAngle(targetCentroid, point)),
          index: i,
        }))
        .sort((a, b) => a.theta - b.theta)[0].index;

      const coordinatedPolygon = [
        ...expandedPolygon.slice(pointWidthClosestTheta),
        ...expandedPolygon.slice(0, pointWidthClosestTheta),
      ];

      return d3.polygonArea(source) * d3.polygonArea(coordinatedPolygon) < 0
        ? coordinatedPolygon.reverse()
        : coordinatedPolygon;
    }

    function nodeEnter({ selection, current, previouse }) {
      delay(previouse === null ? 0 : phase1Duration).then(() => {
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

        all
          .append("polygon")
          .classed("body", true)
          .attr("points", (d) => d.polygon)
          .attr("fill", (d) => (d.height > 0 ? "none" : getColor(d)))
          .attr("stroke", "white")
          .attr("stroke-opacity", 1)
          .attr("value", (d) => (d.children ? d.children.length : d.data.value))
          .attr("stroke-width", 0)
          .attr("stroke-linejoin", "round")
          .attr("pointer-events", (d) => (d.height === 0 ? "fill" : "none"))
          .attr("stroke-width", (d) => strokeWidth(d.depth));

        const relationR = 0.85;
        const matchR = 0.8; // 词云所占据的区域比例
        const wordCloudR = 0.77;

        const innerCirle = all
          .filter((d) => d.depth === 1) // 只在第一次分层下面绘制点
          .append("g")
          .attr(
            "transform",
            (d) =>
              "translate(" +
              d.polyProps.centroid[0] +
              "," +
              d.polyProps.centroid[1] +
              ")"
          )
          .attr("class", "circle-g")
          .style("visibility", "visible")
          .attr("id", (d) => "cirle-g-" + d.data.id)
          .on("mouseover", function (event, d) {
            if (d3.select(this).style("visibility") === "hidden") return;
            let sourcePos = d.polyProps.centroid; // 当前节点的中心坐标
            d.data.connection.forEach((n, index) => {
              if (n !== 0) {
                let targetPos = d3.select("#cirle-g-" + index)._groups[0][0]
                  .__data__.polyProps.centroid;
                //创建一个对角线生成器
                let dx = 20,
                  cpx,
                  cpy;
                let dy = Math.round(
                  Math.abs(
                    ((targetPos[1] - targetPos[0]) /
                      (sourcePos[1] - sourcePos[0])) *
                      dx
                  )
                );
                //向右上弯曲
                if (targetPos[1] < sourcePos[1]) {
                  cpx = Math.round((sourcePos[0] + targetPos[0]) / 2 + dx);
                  cpy = Math.round((sourcePos[1] + targetPos[1]) / 2 + dy);
                } else {
                  cpx = Math.round((sourcePos[0] + targetPos[0]) / 2 + dx);
                  cpy = Math.round((sourcePos[1] + targetPos[1]) / 2 + dy);
                }
                let path = d3.path();
                path.moveTo(sourcePos[0], sourcePos[1]);
                path.quadraticCurveTo(cpx, cpy, targetPos[0], targetPos[1]);
                svg
                  .append("path")
                  .attr("d", path.toString())
                  .style("fill", "none")
                  .attr("class", "node-to-node")
                  .style("stroke", "rgba(55, 55, 61, 0.5)")
                  .style("stroke-width", "2");
              }
            });
            console.log(d.data.id);
            setClusterHovering(d.data.id); // 当前选择的集群的id: 数字
          })
          .on("mouseout", function (event, d) {
            d3.selectAll(".node-to-node").remove(); // 移除节点之间的所有连接
            setClusterHovering(-1); // 重置选择的集群的id: 数字
          });

        // 整个内部圆区域
        innerCirle
          .append("circle")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("r", (d) => d.polyProps.maxRadius)
          .attr("class", "center-point")
          .attr("id", (d) => "node-" + d.data.id)
          .attr("fill", "rgba(255, 255, 255, 0.5)");

        // 圆中心的编号
        // innerCirle
        //   .append("text")
        //   .attr("x", 0)
        //   .attr("y", 5)
        //   .attr("font", "1em sans-serif")
        //   .attr("fill", "black")
        //   .attr("text-anchor", "middle")
        //   .text((d) => d.data.id);
        // 表示匹配特征的圆环
        const innerArc = d3
          .arc()
          .innerRadius((i, maxRadius) => maxRadius * matchR)
          .outerRadius((i, maxRadius) => maxRadius * relationR - 1)
          .startAngle((i) => ((2 * Math.PI) / data.data.maxLength) * i - 2)
          .endAngle((i) => ((2 * Math.PI) / data.data.maxLength) * (i + 1) - 2)
          .cornerRadius(1)
          .padAngle(0.05);
        innerCirle
          .selectAll("path")
          .data((d) => d.data.content)
          .join("path")
          .attr("d", function (d, i) {
            let curMaxRadius = d3.select(this.parentNode)._groups[0][0].__data__
              .polyProps.maxRadius;

            return innerArc(i, curMaxRadius);
          })
          .attr("stroke-width", "1")
          .attr("fill", (d) => inner_color_map[d]);
        // 内部词云
        // .append('circle')
        // .attr('cx', 0)
        // .attr('cy', 0)
        // .attr('r', d => d.polyProps.maxRadius * wordCloudR)
        // .attr('fill', 'none')
        // 表示连接关系的外部bar
        const circleRingG = innerCirle
          .append("g")
          .attr("class", "circle-ring-g");

        const wordclousG = innerCirle.append("g").attr("class", "wordcloud-g");
        const connectionX = d3
          .scaleBand()
          .domain(cluster_arr.map((d, i) => i))
          .range([0, 2 * Math.PI])
          .align(0);
        for (let i = 0; i < circleRingG._groups[0].length; i++) {
          // 当前圆的半径
          let curMaxRadius = d3.select(circleRingG._groups[0][i])._groups[0][0]
            .__data__.polyProps.maxRadius;
          let y = d3
            .scaleRadial()
            .domain([0, data.data.maxConnection]) // 连接的最大权重
            .range([curMaxRadius * relationR, curMaxRadius]);
          let connectionArc = d3
            .arc()
            .innerRadius((d) => y(0))
            .outerRadius((d) => y(d))
            .startAngle((d, i) => connectionX(i))
            .endAngle((d, i) => connectionX(i) + connectionX.bandwidth())
            .padAngle(0.1)
            .cornerRadius(2);
          d3.select(circleRingG._groups[0][i])
            .selectAll("path")
            .data((d) => d.data.connection)
            .join("path")
            .attr("d", connectionArc)
            .attr("id", function (d, i) {
              let curCluster = d3.select(this.parentNode)._groups[0][0].__data__
                .data.id;
              return "connection-" + curCluster.toString() + "-" + i.toString();
            })
            .attr("fill", "rgba(255, 250, 225, 1)")
            .attr("stroke", "rgba(255, 250, 225, 1)")
            .attr("value", (d) => d)
            .attr("center", connectionArc.centroid) // 每个关系圆弧的中心
            .attr("stroke-width", "1px")
            .on("mouseover", function (event, d) {
              if (
                d3.select(this.parentNode.parentNode).style("visibility") ===
                "hidden"
              )
                return;
              event.stopPropagation(); // 组织事件传播
              if (d3.select(this).attr("value") === "0") return;
              let curConnection = d3
                .select(this)
                .attr("id")
                .split("-")
                .slice(1, 3);
              let sourceG = d3.select(this.parentNode)._groups[0][0].__data__
                .polyProps.centroid;
              let sourceCenter = d3
                .select(this)
                .attr("center")
                .split(",")
                .map(parseFloat);
              let sourcePos = [
                sourceCenter[0] + sourceG[0],
                sourceCenter[1] + sourceG[1],
              ];
              let targetObj = d3.select(
                "#connection-" + curConnection[1] + "-" + curConnection[0]
              );
              let targetCenter = targetObj
                .attr("center")
                .split(",")
                .map(parseFloat);
              let targetG = d3.select(targetObj._groups[0][0].parentNode)
                ._groups[0][0].__data__.polyProps.centroid;
              let targetPos = [
                targetCenter[0] + targetG[0],
                targetCenter[1] + targetG[1],
              ];
              //创建一个对角线生成器
              let dx = 20,
                cpx,
                cpy;
              let dy = Math.round(
                Math.abs(
                  ((targetPos[1] - targetPos[0]) /
                    (sourcePos[1] - sourcePos[0])) *
                    dx
                )
              );
              //向右上弯曲
              if (targetPos[1] < sourcePos[1]) {
                cpx = Math.round((sourcePos[0] + targetPos[0]) / 2 + dx);
                cpy = Math.round((sourcePos[1] + targetPos[1]) / 2 + dy);
              } else {
                cpx = Math.round((sourcePos[0] + targetPos[0]) / 2 + dx);
                cpy = Math.round((sourcePos[1] + targetPos[1]) / 2 + dy);
              }
              let path = d3.path();
              path.moveTo(sourcePos[0], sourcePos[1]);
              path.quadraticCurveTo(cpx, cpy, targetPos[0], targetPos[1]);
              svg
                .append("path")
                .attr("d", path.toString())
                .style("fill", "none")
                .attr("id", "temp-line")
                .style("stroke", "rgba(55, 55, 61, 0.5)")
                .style("stroke-width", "2");
            })
            .on("mouseout", function () {
              d3.select("#temp-line").remove();
            });

          // 添加词云
          let words1 = [
            {
              text: "go",
              value: 12,
            },
            {
              text: "sea",
              value: 10,
            },
            {
              text: "one",
              value: 10,
            },
            {
              text: "part",
              value: 7,
            },
            {
              text: "water",
              value: 7,
            },
            {
              text: "way way",
              value: 6,
            },
            {
              text: "get",
              value: 6,
            },
            {
              text: "way way",
              value: 6,
            },
          ];
          let tt = "1111;23232;3321321;132321312;13213213;";
          let fontSize = curMaxRadius / (tt.split(";").length * 9.9); // 根据当前圆的半径和包含的主题数量确定文本的大小
          d3.select(wordclousG._groups[0][i])
            .append("text")
            .attr("font-size", `${fontSize}em`)
            .style("text-anchor", "middle")
            .selectAll("tspan")
            .data((d) => lines(words(tt)))
            .join("tspan")
            .attr("x", 0)
            .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.9}em`)
            .text((d) => d.text);
        }

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
      });
    }

    function nodeUpdate({ selection, current }) {
      const branches = selection
        .filter((d) => d.height > 0)
        .attr("visibility", "hidden");
      const leaves = selection.filter((d) => d.height === 0);
      const t = d3.transition("update-phase-1").duration(phase1Duration);

      selection.selectAll(".label").remove();

      t.end().then(() => {
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
      });

      leaves
        .on(createEventName("mouseenter"), null)
        .on(createEventName("mouseleave"), null)
        .attr("opacity", 1)
        .select(".body")
        .attr("stroke-width", (d) => strokeWidth(d.depth))
        .transition(t)
        .attr("points", (d) => d.polygon);
    }

    function computeCentroid(shape) {
      return shape
        .reduce(([xSum, ySum], [x, y]) => [xSum + x, ySum + y], [0, 0])
        .map((d) => d / shape.length);
    }
    function createMeasurablePath(points) {
      return d3
        .select("#root")
        .append("svg")
        .append("path")
        .datum(points)
        .attr("d", d3.line())
        .attr("stroke", "none")
        .node();
    }
    function computeDistances(coordinates) {
      return coordinates.reduce((distances, coordinate, i) => {
        const value =
          i === 0
            ? 0
            : distances[i - 1] +
              computeDistance(coordinates[i - 1], coordinate);
        distances.push(value);
        return distances;
      }, []);
    }
    function computeDistance(coord1, coord2) {
      var distX = coord2[0] - coord1[0];
      var distY = coord2[1] - coord1[1];
      return Math.sqrt(distX * distX + distY * distY);
    }
    function fixedPointCount(shape, count) {
      const measurablePath = createMeasurablePath(shape);

      const newPointCount = count - shape.length + 1;

      if (count < 1) return shape;

      const distances = computeDistances(shape);
      const length = distances[distances.length - 1];

      const distancePoints = distances.map((distance, i) => ({
        distance,
        point: shape[i],
      }));

      const positionScale = d3
        .scaleLinear()
        .domain([0, newPointCount - 1])
        .range([0.001, length]);

      return d3.range(newPointCount).reduce((points, index) => {
        const position = positionScale(index);
        while (
          distancePoints.length > 0 &&
          position > distancePoints[0].distance
        ) {
          points.push(distancePoints[0].point);
          distancePoints.shift();
        }
        const { x, y } = measurablePath.getPointAtLength(position);
        points.push([x, y]);
        return points;
      }, []);
    }

    // 为节点分配颜色
    function establishColor(root, domain = [0, 1], getWeight = (d) => d.value) {
      const _establishColor = (node, domain) => {
        node.colorDomain = domain;
        node.colorValue = d3.sum(domain) / 2;
        if (node.children) {
          const sum = d3.sum(node.children.map(getWeight)); // 根据value确定颜色深浅
          const scale = d3.scaleLinear().domain([0, sum]).range(domain);

          (node.children || [])
            // .sort((a, b) => getWeight(a) - getWeight(b))
            .reduce((sum, child) => {
              const progress = sum + getWeight(child);
              _establishColor(child, [sum, progress].map(scale));
              return progress;
            }, 0);
        }
      };
      _establishColor(root, domain);
    }
  };

  // 计算多边形内的近似最大圆半径
  function polygonMaxRadius(polygon, center, strokeWidth) {
    let minRadius = 99999;
    for (let p = 0; p < polygon.length; p++) {
      if (p == polygon.length - 1) {
        // 最后一个点
        minRadius = Math.min(
          minRadius,
          distance(
            center[0],
            center[1],
            polygon[p][0],
            polygon[p][1],
            polygon[0][0],
            polygon[0][1]
          )
        );
      } else {
        minRadius = Math.min(
          minRadius,
          distance(
            center[0],
            center[1],
            polygon[p][0],
            polygon[p][1],
            polygon[p + 1][0],
            polygon[p + 1][1]
          )
        );
      }
    }

    function distance(x, y, x1, y1, x2, y2) {
      var A = x - x1;
      var B = y - y1;
      var C = x2 - x1;
      var D = y2 - y1;

      var dot = A * C + B * D;
      var len_sq = C * C + D * D;
      var param = -1;
      if (len_sq != 0)
        //in case of 0 length line
        param = dot / len_sq;

      var xx, yy;

      if (param < 0) {
        xx = x1;
        yy = y1;
      } else if (param > 1) {
        xx = x2;
        yy = y2;
      } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }

      var dx = x - xx;
      var dy = y - yy;
      return Math.floor(Math.sqrt(dx * dx + dy * dy));
    }

    return Math.floor(minRadius - strokeWidth);
  }

  function words(text) {
    const words = text.split(";"); // To hyphenate: /\s+|(?<=-)/
    if (!words[words.length - 1]) words.pop();
    if (!words[0]) words.shift();
    return words;
  }
  function lines(words) {
    let line;
    let lineWidth0 = Infinity;
    const lines = [];
    for (let i = 0, n = words.length; i < n; ++i) {
      let lineText1 = (line ? line.text + " " : "") + words[i];
      let lineWidth1 = measureWidth(lineText1);
      if (
        (lineWidth0 + lineWidth1) / 2 <
        Math.sqrt(measureWidth(words.join(" ").trim()) * 18)
      ) {
        line.width = lineWidth0 = lineWidth1;
        line.text = lineText1;
      } else {
        lineWidth0 = measureWidth(words[i]);
        line = { width: lineWidth0, text: words[i] };
        lines.push(line);
      }
    }
    return lines;
  }
  function measureWidth() {
    const context = document.createElement("canvas").getContext("2d");
    return (text) => context.measureText(text).width;
  }

  return (
    <>
      <div
        id="cluster-map"
        style={{ width: "80%", height: "100%", float: "left" }}
        ref={resizeRef}
      ></div>

      {/* <div
        id="cluster-topics"
        style={{ width: "20%", height: "100%", float: "left" }}
      > */}
      <ClusterTopics clusterHovering={clusterHovering}></ClusterTopics>
      {/* </div> */}
    </>
  );
};

export default ClusterView;
