import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { DatePicker, Space } from "antd";
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

var width = 0;
var height = 0;
const TimeFilter = () => {
  const resizeRef = useRef(null);
  const [value, setValue] = useState(null);
  const [dateRange, setDateRange] = useState([0, 100]);
  const [init, setInit] = useState(false);
  const data = {
    "2010/01": 72,
    "2010/02": 66,
    "2010/03": 30,
    "2010/04": 7,
    "2010/05": 74,
    "2010/06": 20,
    "2010/07": 19,
    "2010/08": 87,
    "2010/09": 12,
    "2010/10": 99,
    "2010/11": 69,
    "2010/12": 67,
    "2011/01": 72,
    "2011/02": 48,
    "2011/03": 4,
    "2011/04": 69,
    "2011/05": 78,
    "2011/06": 27,
    "2011/07": 7,
    "2011/08": 29,
    "2011/09": 22,
    "2011/10": 77,
    "2011/11": 61,
    "2011/12": 29,
    "2012/01": 6,
    "2012/02": 26,
    "2012/03": 56,
    "2012/04": 86,
    "2012/05": 41,
    "2012/06": 7,
    "2012/07": 91,
    "2012/08": 20,
    "2012/09": 48,
    "2012/10": 72,
    "2012/11": 91,
    "2012/12": 88,
    "2013/01": 84,
    "2013/02": 85,
    "2013/03": 53,
    "2013/04": 26,
    "2013/05": 18,
    "2013/06": 28,
    "2013/07": 73,
    "2013/08": 62,
    "2013/09": 29,
    "2013/10": 97,
    "2013/11": 31,
    "2013/12": 43,
    "2014/01": 22,
    "2014/02": 15,
    "2014/03": 43,
    "2014/04": 3,
    "2014/05": 3,
    "2014/06": 78,
    "2014/07": 83,
    "2014/08": 80,
    "2014/09": 60,
    "2014/10": 60,
    "2014/11": 87,
    "2014/12": 52,
    "2015/01": 32,
    "2015/02": 15,
    "2015/03": 60,
    "2015/04": 30,
    "2015/05": 58,
    "2015/06": 19,
    "2015/07": 33,
    "2015/08": 92,
    "2015/09": 18,
    "2015/10": 43,
    "2015/11": 84,
    "2015/12": 72,
    "2016/01": 100,
    "2016/02": 68,
    "2016/03": 15,
    "2016/04": 51,
    "2016/05": 13,
    "2016/06": 32,
    "2016/07": 12,
    "2016/08": 41,
    "2016/09": 31,
    "2016/10": 10,
    "2016/11": 92,
    "2016/12": 100,
    "2017/01": 75,
    "2017/02": 27,
    "2017/03": 44,
    "2017/04": 62,
    "2017/05": 63,
    "2017/06": 52,
    "2017/07": 90,
    "2017/08": 5,
    "2017/09": 69,
    "2017/10": 46,
    "2017/11": 20,
    "2017/12": 38,
    "2018/01": 39,
    "2018/02": 71,
    "2018/03": 50,
    "2018/04": 30,
    "2018/05": 86,
    "2018/06": 41,
    "2018/07": 7,
    "2018/08": 33,
    "2018/09": 63,
    "2018/10": 9,
    "2018/11": 33,
    "2018/12": 95,
    "2019/01": 52,
    "2019/02": 82,
    "2019/03": 12,
    "2019/04": 71,
    "2019/05": 65,
    "2019/06": 23,
    "2019/07": 37,
    "2019/08": 84,
    "2019/09": 27,
    "2019/10": 54,
    "2019/11": 44,
    "2019/12": 4,
    "2020/01": 57,
    "2020/02": 1,
    "2020/03": 62,
    "2020/04": 75,
    "2020/05": 50,
    "2020/06": 78,
    "2020/07": 27,
    "2020/08": 39,
    "2020/09": 91,
    "2020/10": 73,
    "2020/11": 88,
    "2020/12": 92,
    "2021/01": 15,
    "2021/02": 36,
    "2021/03": 49,
    "2021/04": 78,
    "2021/05": 52,
    "2021/06": 20,
    "2021/07": 37,
    "2021/08": 17,
    "2021/09": 6,
    "2021/10": 37,
    "2021/11": 5,
    "2021/12": 94,
    "2022/01": 43,
    "2022/02": 59,
    "2022/03": 55,
    "2022/04": 84,
    "2022/05": 83,
    "2022/06": 40,
    "2022/07": 25,
    "2022/08": 66,
    "2022/09": 13,
    "2022/10": 67,
    "2022/11": 83,
    "2022/12": 69,
  };
  const xDataTime = Object.keys(data).map(d => d);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    console.log('value', value);
  }, [value])


  useEffect(() => {
    if(init){
      drawTimeFilterChart()   // 重新绘制时间刷
    }
  }, [dateRange])

  useEffect(() => {
    if (init) {
      width = Math.floor(resizeRef.current.offsetWidth); // 初始化
      height = Math.floor(resizeRef.current.offsetHeight);
      drawTimeFilterChart();
    }
  }, [init]);

  const drawTimeFilterChart = () => {

    d3.select("#time-filter-chart svg").remove(); // 每次画图前移除多余的元素
    const margin = { top: 1, right: 40, bottom: 15, left: 10 };
    const gWidth = width - margin.left - margin.right; // 初始化
    const gHeight = height - margin.top - margin.bottom;
    const svg = d3
      .select("#time-filter-chart")
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", [0, 0, width, gHeight]);

    const wrapperG = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    // 创建比例尺
    const xData = Object.keys(data).map((d, i)=> i);
    const [ min, max ] = d3.extent(Object.keys(data).map((d, i)=> +i));
    const xRange = [min, max + 1]
    const yData = Object.values(data);

    const x = d3.scaleLinear().domain(xRange).range([0, gWidth]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(yData)])
      .range([0, gHeight]);
    const rectWidth = gWidth /  (xRange[1] - xRange[0])
    wrapperG
      .append("g")
      .selectAll("rect")
      .data(d3.range(xRange[0], xRange[1]+1))
      .join("rect")
      .attr("x", (d) => x(d))
      .attr("y", (d) => gHeight - y(data[xDataTime[d]] || 0))
      .attr("width", rectWidth)
      .attr("height", (d) => y(data[xDataTime[d]] || 0))
      .attr("value", (d) => data[xDataTime[d]] || 0)
      .attr("fill", "#e8d52f");
    // 背景线条
    wrapperG
      .append("g")
      .selectAll("line")
      .data(d3.range(xRange[0], xRange[1]+1))
      .join("line")
      .attr("x1", (d) => x(d))
      .attr("x2", (d) => x(d))
      .attr("y1", 0)
      .attr("y1", gHeight)
      .attr("stroke", (d, i) => {
        if (i % 12 === 0) return "rgba(51, 51, 51, 0.5)";
        return "rgba(51, 51, 51, 0.3)";
      })
      .attr("stroke-width", (d, i) => {
        if (i % 12 === 0) return "1";
        return "0.5";
      });

    // labels
    wrapperG
      .append("text")
      .attr("id", "label-min")
      .attr("x", "-0.9em")
      .attr("font-size", "0.5em")
      .attr("y", gHeight)
      .text(0);

    wrapperG
      .append("text")
      .attr("id", "label-max")
      .attr("x", "-0.9em")
      .attr("font-size", "0.5em")
      .attr("y", 0)
      .text(d3.max(yData));

    for(let i=0; i<xData.length; i = i+ 12){
      wrapperG.append('text')
        .attr('font-size', '0.5em')
        .attr('id', 'bottomLabel')
        .attr('x', x(xData[i]))
        .attr('y', gHeight + 7)
        .attr('font-size', '0.5em')
        .text(xDataTime[i]);
    }
    
    var labelL =wrapperG
      .append("text")
      .attr("id", "labelleft")
      .attr("x", 0)
      .attr('fill', '#ce310d')
      .attr('font-size', '0.5em')
      .attr("y", -1);

    var labelR = wrapperG
      .append("text")
      .attr("id", "labelright")
      .attr("x", 0)
      .attr('fill', '#ce310d')
      .attr('font-size', '0.5em')
      .attr("y", -1);

    // 定义brush
    const bucketSize = 1
    var brush = d3
      .brushX()
      .extent([
        [0, 0],
        [gWidth, gHeight],
      ])
      .on("brush", function (event) {
        var s = event.selection;
        labelL
          .attr("x", s[0])
          .text(xDataTime[Math.round(x.invert(s[0])) * bucketSize] );
        labelR
          .attr("x", s[1])
          .text(xDataTime[(Math.round(x.invert(s[1])) - 1) * bucketSize]);
        // move brush handles
        handle
          .attr("display", null)
          .attr(
            "transform",
            (d, i) => "translate(" + [s[i], -gHeight / 4] + ")"
          );
        // 更新视图
        svg.node().value = s.map((d) => xDataTime[Math.round(x.invert(d))*bucketSize]);
        svg.node().dispatchEvent(new CustomEvent("input"));
      })
      .on("end", function (event) {
        if (!event.sourceEvent) return;
        var d0 = event.selection.map(x.invert);
        var d1 = d0.map(Math.round);
        d3.select(this).transition().call(event.target.move, d1.map(x));

        let labelLText = d3.select('#labelleft')._groups[0][0].innerHTML
        let labelRText = d3.select('#labelright')._groups[0][0].innerHTML
        setValue([dayjs(labelLText), dayjs(labelRText)])

      });

    // 添加brush的g
    var gBrush = wrapperG.append("g").attr("class", "brush").call(brush);

    // 添加brush
    var brushResizePath = function (d) {
      var e = +(d.type == "e"),
        x = e ? 1 : -1,
        y = gHeight / 2;
      return (
        "M" +
        0.5 * x +
        "," +
        y +
        "A6,6 0 0 " +
        e +
        " " +
        6.5 * x +
        "," +
        (y + 6) +
        "V" +
        (2 * y - 6) +
        "A6,6 0 0 " +
        e +
        " " +
        0.5 * x +
        "," +
        2 * y +
        "Z" +
        "M" +
        2.5 * x +
        "," +
        (y + 8) +
        "V" +
        (2 * y - 8) +
        "M" +
        4.5 * x +
        "," +
        (y + 8) +
        "V" +
        (2 * y - 8)
      );
    };

    var handle = gBrush
      .selectAll(".handle--custom")
      .data([{ type: "w" }, { type: "e" }])
      .enter()
      .append("path")
      .attr("class", "handle--custom")
      .attr("stroke", "#888")
      .attr("fill", "#eee")
      .attr("cursor", "ew-resize")
      .attr("d", brushResizePath);

    gBrush
      .selectAll(".overlay")
      .each(function (d) {
        d.type = "selection";
      })
      .on("mousedown touchstart", brushcentered);

    function brushcentered() {
      var dx = x(1) - x(0), // Use a fixed width when recentering.
        cx = d3.pointer(this)[0],
        x0 = cx - dx / 2,
        x1 = cx + dx / 2;
      d3.select(this.parentNode).call(
        brush.move,
        x1 > gWidth ? [gWidth - dx, gWidth] : x0 < 0 ? [0, dx] : [x0, x1]
      );
    }

    // 选择整个范围
    //  gBrush.call(brush.move, xRange.map(x))

    // 设置默认时间范围
    gBrush.call(
      brush.move,
      dateRange
        .map((d) => gWidth * (d / 100))
        .map(x.invert)
        .map(Math.round)
        .map(x)
    );

  };


// eslint-disable-next-line arrow-body-style
const disabledDate = (current) => {
  return (
    current &&
    (current >= dayjs('2022-08-31').endOf('day') || current <= dayjs('2010'))
  );
};

  return (
    <>
    <style>
      {`
        #time-filter-antd{
          padding-top: 0.7vh;
        }
      `}
    </style>
      <div id="time-filter-antd" style={{ width: "15%", height: "100%" }}>
        <RangePicker
          picker="month"
          size="small"
          value={value}
          disabledDate={disabledDate}
          onChange={(val) => {
            if(val === null){
              setDateRange([0, 100])
              setValue(null)
            }
            let startIndex = xDataTime.indexOf(val[0].format("YYYY/MM"))
            let endIndex = xDataTime.indexOf(val[1].format("YYYY/MM"))
            setValue([dayjs(val[0].format("YYYY/MM")), dayjs(val[1].format("YYYY/MM"))])
            setDateRange([startIndex/xDataTime.length*100,endIndex/xDataTime.length*100 + 0.5])
          }}
        />
      </div>
      <div
        id="time-filter-chart"
        style={{ width: "85%", height: "100%" }}
        ref={resizeRef}
      ></div>
    </>
  );
};

export default TimeFilter;
