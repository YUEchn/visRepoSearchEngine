import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const ClusterDetails = () => {
  const [init, setInit] = useState(false);
  const [xAxisType, setXAisType] = useState("score"); // 横纵轴排列的数据类型
  const [yAxisType, , setYAisType] = useState("star");
  const chartRef = useRef();
  const data = [
    {
        "id": "r0",
        "reponame": "r0",
        "star": 82,
        "watch": 15,
        "score": 0.06,
        "data": "2014-10-05"
    },
    {
        "id": "r1",
        "reponame": "r1",
        "star": 38,
        "watch": 22,
        "score": 0.75,
        "data": "2018-06-03"
    },
    {
        "id": "r2",
        "reponame": "r2",
        "star": 71,
        "watch": 86,
        "score": 0.9,
        "data": "2022-12-28"
    },
    {
        "id": "r3",
        "reponame": "r3",
        "star": 24,
        "watch": 52,
        "score": 0.26,
        "data": "2016-09-24"
    },
    {
        "id": "r4",
        "reponame": "r4",
        "star": 59,
        "watch": 29,
        "score": 0.4,
        "data": "2016-11-20"
    },
    {
        "id": "r5",
        "reponame": "r5",
        "star": 98,
        "watch": 47,
        "score": 0.08,
        "data": "2013-02-05"
    },
    {
        "id": "r5",
        "reponame": "r5",
        "star": 67,
        "watch": 47,
        "score": 0.08,
        "data": "2013-02-05"
    },
    {
        "id": "r6",
        "reponame": "r6",
        "star": 77,
        "watch": 77,
        "score": 0.08,
        "data": "2021-06-13"
    },
    {
        "id": "r7",
        "reponame": "r7",
        "star": 51,
        "watch": 13,
        "score": 0.3,
        "data": "2021-11-07"
    },
    {
        "id": "r8",
        "reponame": "r8",
        "star": 70,
        "watch": 18,
        "score": 0.96,
        "data": "2016-08-01"
    },
    {
        "id": "r9",
        "reponame": "r9",
        "star": 56,
        "watch": 87,
        "score": 0.56,
        "data": "2022-04-03"
    },
    {
        "id": "r10",
        "reponame": "r10",
        "star": 49,
        "watch": 32,
        "score": 0.56,
        "data": "2012-11-18"
    },
    {
        "id": "r11",
        "reponame": "r11",
        "star": 59,
        "watch": 69,
        "score": 0.25,
        "data": "2014-01-13"
    },
    {
        "id": "r12",
        "reponame": "r12",
        "star": 39,
        "watch": 86,
        "score": 0.17,
        "data": "2021-10-02"
    },
    {
        "id": "r13",
        "reponame": "r13",
        "star": 79,
        "watch": 36,
        "score": 0.91,
        "data": "2010-04-04"
    },
    {
        "id": "r14",
        "reponame": "r14",
        "star": 21,
        "watch": 89,
        "score": 0.59,
        "data": "2014-05-21"
    },
    {
        "id": "r15",
        "reponame": "r15",
        "star": 49,
        "watch": 64,
        "score": 0.97,
        "data": "2015-10-29"
    },
    {
        "id": "r16",
        "reponame": "r16",
        "star": 26,
        "watch": 99,
        "score": 0.54,
        "data": "2017-09-21"
    },
    {
        "id": "r17",
        "reponame": "r17",
        "star": 27,
        "watch": 71,
        "score": 0.11,
        "data": "2019-02-07"
    },
    {
        "id": "r18",
        "reponame": "r18",
        "star": 36,
        "watch": 53,
        "score": 0.28,
        "data": "2022-03-06"
    },
    {
        "id": "r19",
        "reponame": "r19",
        "star": 90,
        "watch": 32,
        "score": 0.9,
        "data": "2021-06-04"
    },
    {
        "id": "r20",
        "reponame": "r20",
        "star": 95,
        "watch": 68,
        "score": 0.88,
        "data": "2016-10-19"
    },
    {
        "id": "r21",
        "reponame": "r21",
        "star": 55,
        "watch": 90,
        "score": 0.73,
        "data": "2017-10-30"
    },
    {
        "id": "r22",
        "reponame": "r22",
        "star": 87,
        "watch": 0,
        "score": 0.59,
        "data": "2013-09-17"
    },
    {
        "id": "r23",
        "reponame": "r23",
        "star": 53,
        "watch": 46,
        "score": 0.17,
        "data": "2013-05-22"
    },
    {
        "id": "r24",
        "reponame": "r24",
        "star": 41,
        "watch": 70,
        "score": 0.4,
        "data": "2011-02-05"
    },
    {
        "id": "r25",
        "reponame": "r25",
        "star": 88,
        "watch": 96,
        "score": 0.45,
        "data": "2019-10-25"
    },
    {
        "id": "r26",
        "reponame": "r26",
        "star": 87,
        "watch": 55,
        "score": 0.53,
        "data": "2019-03-09"
    },
    {
        "id": "r27",
        "reponame": "r27",
        "star": 35,
        "watch": 96,
        "score": 0.63,
        "data": "2022-10-13"
    },
    {
        "id": "r28",
        "reponame": "r28",
        "star": 96,
        "watch": 55,
        "score": 0.46,
        "data": "2017-09-28"
    },
    {
        "id": "r29",
        "reponame": "r29",
        "star": 46,
        "watch": 77,
        "score": 0.58,
        "data": "2020-10-16"
    },
    {
        "id": "r30",
        "reponame": "r30",
        "star": 81,
        "watch": 16,
        "score": 0.97,
        "data": "2018-04-16"
    },
    {
        "id": "r31",
        "reponame": "r31",
        "star": 68,
        "watch": 85,
        "score": 0.89,
        "data": "2021-04-24"
    },
    {
        "id": "r32",
        "reponame": "r32",
        "star": 73,
        "watch": 4,
        "score": 0.53,
        "data": "2013-10-08"
    },
    {
        "id": "r33",
        "reponame": "r33",
        "star": 34,
        "watch": 85,
        "score": 0.77,
        "data": "2010-08-18"
    },
    {
        "id": "r34",
        "reponame": "r34",
        "star": 71,
        "watch": 72,
        "score": 0.69,
        "data": "2022-04-29"
    },
    {
        "id": "r35",
        "reponame": "r35",
        "star": 45,
        "watch": 63,
        "score": 0.65,
        "data": "2015-10-19"
    },
    {
        "id": "r36",
        "reponame": "r36",
        "star": 24,
        "watch": 18,
        "score": 0.5,
        "data": "2015-02-12"
    },
    {
        "id": "r37",
        "reponame": "r37",
        "star": 56,
        "watch": 24,
        "score": 0.43,
        "data": "2017-03-09"
    },
    {
        "id": "r38",
        "reponame": "r38",
        "star": 29,
        "watch": 53,
        "score": 0.5,
        "data": "2018-05-11"
    },
    {
        "id": "r39",
        "reponame": "r39",
        "star": 20,
        "watch": 18,
        "score": 0.41,
        "data": "2017-02-18"
    },
    {
        "id": "r40",
        "reponame": "r40",
        "star": 62,
        "watch": 8,
        "score": 0.52,
        "data": "2018-12-29"
    },
    {
        "id": "r41",
        "reponame": "r41",
        "star": 20,
        "watch": 32,
        "score": 0.88,
        "data": "2013-02-09"
    },
    {
        "id": "r42",
        "reponame": "r42",
        "star": 47,
        "watch": 40,
        "score": 0.56,
        "data": "2010-03-24"
    },
    {
        "id": "r43",
        "reponame": "r43",
        "star": 18,
        "watch": 85,
        "score": 0.92,
        "data": "2012-04-23"
    },
    {
        "id": "r44",
        "reponame": "r44",
        "star": 85,
        "watch": 8,
        "score": 0.53,
        "data": "2020-10-05"
    },
    {
        "id": "r45",
        "reponame": "r45",
        "star": 85,
        "watch": 41,
        "score": 0.96,
        "data": "2010-08-09"
    },
    {
        "id": "r46",
        "reponame": "r46",
        "star": 12,
        "watch": 25,
        "score": 0.49,
        "data": "2015-05-04"
    },
    {
        "id": "r47",
        "reponame": "r47",
        "star": 38,
        "watch": 13,
        "score": 0.7,
        "data": "2013-04-19"
    },
    {
        "id": "r48",
        "reponame": "r48",
        "star": 12,
        "watch": 40,
        "score": 0.54,
        "data": "2020-04-15"
    },
    {
        "id": "r49",
        "reponame": "r49",
        "star": 99,
        "watch": 66,
        "score": 0.23,
        "data": "2021-05-25"
    },
    {
        "id": "r50",
        "reponame": "r50",
        "star": 87,
        "watch": 22,
        "score": 0.85,
        "data": "2014-12-21"
    },
    {
        "id": "r51",
        "reponame": "r51",
        "star": 44,
        "watch": 95,
        "score": 0.07,
        "data": "2010-02-08"
    },
    {
        "id": "r52",
        "reponame": "r52",
        "star": 72,
        "watch": 43,
        "score": 0.82,
        "data": "2014-05-14"
    },
    {
        "id": "r53",
        "reponame": "r53",
        "star": 93,
        "watch": 5,
        "score": 0.09,
        "data": "2017-06-03"
    },
    {
        "id": "r54",
        "reponame": "r54",
        "star": 69,
        "watch": 2,
        "score": 0.39,
        "data": "2018-09-27"
    },
    {
        "id": "r55",
        "reponame": "r55",
        "star": 81,
        "watch": 82,
        "score": 0.3,
        "data": "2017-07-06"
    },
    {
        "id": "r56",
        "reponame": "r56",
        "star": 30,
        "watch": 61,
        "score": 0.6,
        "data": "2011-06-16"
    },
    {
        "id": "r57",
        "reponame": "r57",
        "star": 69,
        "watch": 9,
        "score": 0.1,
        "data": "2012-05-30"
    },
    {
        "id": "r58",
        "reponame": "r58",
        "star": 35,
        "watch": 31,
        "score": 0.24,
        "data": "2022-10-03"
    },
    {
        "id": "r59",
        "reponame": "r59",
        "star": 38,
        "watch": 29,
        "score": 0.44,
        "data": "2018-04-10"
    },
    {
        "id": "r60",
        "reponame": "r60",
        "star": 36,
        "watch": 91,
        "score": 0.43,
        "data": "2013-12-28"
    },
    {
        "id": "r61",
        "reponame": "r61",
        "star": 99,
        "watch": 96,
        "score": 0.34,
        "data": "2011-10-23"
    },
    {
        "id": "r62",
        "reponame": "r62",
        "star": 59,
        "watch": 27,
        "score": 0.12,
        "data": "2022-08-17"
    },
    {
        "id": "r63",
        "reponame": "r63",
        "star": 96,
        "watch": 92,
        "score": 0.99,
        "data": "2018-09-29"
    },
    {
        "id": "r64",
        "reponame": "r64",
        "star": 28,
        "watch": 78,
        "score": 0.32,
        "data": "2022-09-18"
    },
    {
        "id": "r65",
        "reponame": "r65",
        "star": 48,
        "watch": 59,
        "score": 0.97,
        "data": "2017-01-17"
    },
    {
        "id": "r66",
        "reponame": "r66",
        "star": 12,
        "watch": 87,
        "score": 0.92,
        "data": "2021-04-30"
    },
    {
        "id": "r67",
        "reponame": "r67",
        "star": 35,
        "watch": 60,
        "score": 0.36,
        "data": "2017-05-10"
    },
    {
        "id": "r68",
        "reponame": "r68",
        "star": 24,
        "watch": 65,
        "score": 0.05,
        "data": "2022-08-30"
    },
    {
        "id": "r69",
        "reponame": "r69",
        "star": 13,
        "watch": 7,
        "score": 0.39,
        "data": "2014-06-21"
    },
    {
        "id": "r70",
        "reponame": "r70",
        "star": 2,
        "watch": 78,
        "score": 0.1,
        "data": "2011-11-08"
    },
    {
        "id": "r71",
        "reponame": "r71",
        "star": 94,
        "watch": 45,
        "score": 0.43,
        "data": "2021-12-11"
    },
    {
        "id": "r72",
        "reponame": "r72",
        "star": 76,
        "watch": 90,
        "score": 0.2,
        "data": "2019-08-18"
    },
    {
        "id": "r73",
        "reponame": "r73",
        "star": 71,
        "watch": 66,
        "score": 0.57,
        "data": "2022-05-16"
    },
    {
        "id": "r74",
        "reponame": "r74",
        "star": 15,
        "watch": 43,
        "score": 0.2,
        "data": "2012-02-08"
    },
    {
        "id": "r75",
        "reponame": "r75",
        "star": 15,
        "watch": 72,
        "score": 0.33,
        "data": "2019-08-25"
    },
    {
        "id": "r76",
        "reponame": "r76",
        "star": 93,
        "watch": 3,
        "score": 0.59,
        "data": "2013-09-15"
    },
    {
        "id": "r77",
        "reponame": "r77",
        "star": 77,
        "watch": 4,
        "score": 0.69,
        "data": "2019-07-21"
    },
    {
        "id": "r78",
        "reponame": "r78",
        "star": 35,
        "watch": 18,
        "score": 0.7,
        "data": "2021-03-16"
    },
    {
        "id": "r79",
        "reponame": "r79",
        "star": 61,
        "watch": 27,
        "score": 0.05,
        "data": "2011-07-29"
    },
    {
        "id": "r80",
        "reponame": "r80",
        "star": 62,
        "watch": 64,
        "score": 0.77,
        "data": "2015-01-08"
    },
    {
        "id": "r81",
        "reponame": "r81",
        "star": 43,
        "watch": 42,
        "score": 0.43,
        "data": "2017-02-10"
    },
    {
        "id": "r82",
        "reponame": "r82",
        "star": 5,
        "watch": 19,
        "score": 0.81,
        "data": "2017-09-19"
    },
    {
        "id": "r83",
        "reponame": "r83",
        "star": 73,
        "watch": 62,
        "score": 0.9,
        "data": "2011-10-20"
    },
    {
        "id": "r84",
        "reponame": "r84",
        "star": 4,
        "watch": 58,
        "score": 0.03,
        "data": "2012-05-28"
    },
    {
        "id": "r85",
        "reponame": "r85",
        "star": 4,
        "watch": 1,
        "score": 0.32,
        "data": "2016-12-14"
    },
    {
        "id": "r86",
        "reponame": "r86",
        "star": 6,
        "watch": 82,
        "score": 0.76,
        "data": "2020-12-26"
    },
    {
        "id": "r87",
        "reponame": "r87",
        "star": 25,
        "watch": 81,
        "score": 0.01,
        "data": "2012-07-23"
    },
    {
        "id": "r88",
        "reponame": "r88",
        "star": 93,
        "watch": 27,
        "score": 0.68,
        "data": "2012-12-11"
    },
    {
        "id": "r89",
        "reponame": "r89",
        "star": 26,
        "watch": 83,
        "score": 0.14,
        "data": "2011-06-11"
    },
    {
        "id": "r90",
        "reponame": "r90",
        "star": 1,
        "watch": 88,
        "score": 0.61,
        "data": "2014-12-05"
    },
    {
        "id": "r91",
        "reponame": "r91",
        "star": 18,
        "watch": 70,
        "score": 0.46,
        "data": "2019-05-23"
    },
    {
        "id": "r92",
        "reponame": "r92",
        "star": 44,
        "watch": 1,
        "score": 0.21,
        "data": "2012-09-30"
    },
    {
        "id": "r93",
        "reponame": "r93",
        "star": 22,
        "watch": 28,
        "score": 0.94,
        "data": "2018-07-28"
    },
    {
        "id": "r94",
        "reponame": "r94",
        "star": 89,
        "watch": 25,
        "score": 0.69,
        "data": "2023-01-05"
    },
    {
        "id": "r95",
        "reponame": "r95",
        "star": 25,
        "watch": 82,
        "score": 0.22,
        "data": "2016-09-19"
    },
    {
        "id": "r96",
        "reponame": "r96",
        "star": 47,
        "watch": 86,
        "score": 0.72,
        "data": "2021-04-07"
    },
    {
        "id": "r97",
        "reponame": "r97",
        "star": 87,
        "watch": 28,
        "score": 0.85,
        "data": "2012-05-09"
    },
    {
        "id": "r98",
        "reponame": "r98",
        "star": 16,
        "watch": 28,
        "score": 0.44,
        "data": "2019-06-19"
    },
    {
        "id": "r99",
        "reponame": "r99",
        "star": 50,
        "watch": 6,
        "score": 0.21,
        "data": "2017-08-03"
    },
    {
        "id": "r100",
        "reponame": "r100",
        "star": 97,
        "watch": 83,
        "score": 0.88,
        "data": "2012-11-17"
    },
    {
        "id": "r101",
        "reponame": "r101",
        "star": 57,
        "watch": 92,
        "score": 0.66,
        "data": "2019-12-28"
    },
    {
        "id": "r102",
        "reponame": "r102",
        "star": 90,
        "watch": 66,
        "score": 0.28,
        "data": "2021-07-26"
    },
    {
        "id": "r103",
        "reponame": "r103",
        "star": 24,
        "watch": 22,
        "score": 0.72,
        "data": "2019-07-15"
    },
    {
        "id": "r104",
        "reponame": "r104",
        "star": 57,
        "watch": 18,
        "score": 0.5,
        "data": "2019-04-13"
    },
    {
        "id": "r105",
        "reponame": "r105",
        "star": 22,
        "watch": 12,
        "score": 0.8,
        "data": "2020-12-06"
    },
    {
        "id": "r106",
        "reponame": "r106",
        "star": 56,
        "watch": 73,
        "score": 0.13,
        "data": "2014-03-01"
    },
    {
        "id": "r107",
        "reponame": "r107",
        "star": 61,
        "watch": 34,
        "score": 0.94,
        "data": "2013-09-19"
    },
    {
        "id": "r108",
        "reponame": "r108",
        "star": 94,
        "watch": 98,
        "score": 0.49,
        "data": "2011-10-20"
    },
    {
        "id": "r109",
        "reponame": "r109",
        "star": 26,
        "watch": 34,
        "score": 0.95,
        "data": "2022-12-22"
    },
    {
        "id": "r110",
        "reponame": "r110",
        "star": 65,
        "watch": 32,
        "score": 0.49,
        "data": "2017-06-15"
    },
    {
        "id": "r111",
        "reponame": "r111",
        "star": 4,
        "watch": 71,
        "score": 0.25,
        "data": "2013-11-26"
    },
    {
        "id": "r112",
        "reponame": "r112",
        "star": 46,
        "watch": 41,
        "score": 0.65,
        "data": "2013-09-13"
    },
    {
        "id": "r113",
        "reponame": "r113",
        "star": 67,
        "watch": 44,
        "score": 0.82,
        "data": "2014-04-15"
    },
    {
        "id": "r114",
        "reponame": "r114",
        "star": 72,
        "watch": 83,
        "score": 0.42,
        "data": "2012-03-08"
    },
    {
        "id": "r115",
        "reponame": "r115",
        "star": 22,
        "watch": 0,
        "score": 0.3,
        "data": "2012-02-22"
    },
    {
        "id": "r116",
        "reponame": "r116",
        "star": 83,
        "watch": 38,
        "score": 0.4,
        "data": "2012-05-13"
    },
    {
        "id": "r117",
        "reponame": "r117",
        "star": 60,
        "watch": 73,
        "score": 0.04,
        "data": "2022-08-09"
    },
    {
        "id": "r118",
        "reponame": "r118",
        "star": 68,
        "watch": 47,
        "score": 0.28,
        "data": "2016-08-23"
    },
    {
        "id": "r119",
        "reponame": "r119",
        "star": 49,
        "watch": 14,
        "score": 0.94,
        "data": "2014-06-07"
    },
    {
        "id": "r120",
        "reponame": "r120",
        "star": 94,
        "watch": 53,
        "score": 0.37,
        "data": "2010-01-14"
    },
    {
        "id": "r121",
        "reponame": "r121",
        "star": 63,
        "watch": 82,
        "score": 0.27,
        "data": "2014-06-21"
    },
    {
        "id": "r122",
        "reponame": "r122",
        "star": 100,
        "watch": 25,
        "score": 0.53,
        "data": "2017-12-16"
    },
    {
        "id": "r123",
        "reponame": "r123",
        "star": 63,
        "watch": 24,
        "score": 0.98,
        "data": "2017-06-11"
    },
    {
        "id": "r124",
        "reponame": "r124",
        "star": 51,
        "watch": 39,
        "score": 0.9,
        "data": "2016-08-15"
    },
    {
        "id": "r125",
        "reponame": "r125",
        "star": 64,
        "watch": 44,
        "score": 0.73,
        "data": "2010-07-13"
    },
    {
        "id": "r126",
        "reponame": "r126",
        "star": 68,
        "watch": 48,
        "score": 0.65,
        "data": "2022-05-25"
    },
    {
        "id": "r127",
        "reponame": "r127",
        "star": 85,
        "watch": 79,
        "score": 0.78,
        "data": "2018-10-12"
    },
    {
        "id": "r128",
        "reponame": "r128",
        "star": 9,
        "watch": 39,
        "score": 0.34,
        "data": "2017-11-29"
    },
    {
        "id": "r129",
        "reponame": "r129",
        "star": 34,
        "watch": 87,
        "score": 0.84,
        "data": "2022-11-01"
    },
    {
        "id": "r130",
        "reponame": "r130",
        "star": 89,
        "watch": 42,
        "score": 0.45,
        "data": "2012-09-17"
    },
    {
        "id": "r131",
        "reponame": "r131",
        "star": 84,
        "watch": 57,
        "score": 0.06,
        "data": "2014-07-16"
    },
    {
        "id": "r132",
        "reponame": "r132",
        "star": 12,
        "watch": 33,
        "score": 0.18,
        "data": "2018-11-13"
    },
    {
        "id": "r133",
        "reponame": "r133",
        "star": 64,
        "watch": 25,
        "score": 0.3,
        "data": "2017-10-10"
    },
    {
        "id": "r134",
        "reponame": "r134",
        "star": 29,
        "watch": 53,
        "score": 0.52,
        "data": "2019-03-03"
    },
    {
        "id": "r135",
        "reponame": "r135",
        "star": 14,
        "watch": 25,
        "score": 0.34,
        "data": "2012-12-04"
    },
    {
        "id": "r136",
        "reponame": "r136",
        "star": 31,
        "watch": 31,
        "score": 0.8,
        "data": "2017-10-21"
    },
    {
        "id": "r137",
        "reponame": "r137",
        "star": 99,
        "watch": 92,
        "score": 0.62,
        "data": "2011-11-13"
    },
    {
        "id": "r138",
        "reponame": "r138",
        "star": 57,
        "watch": 82,
        "score": 0.67,
        "data": "2013-06-11"
    },
    {
        "id": "r139",
        "reponame": "r139",
        "star": 91,
        "watch": 65,
        "score": 0.97,
        "data": "2010-02-17"
    },
    {
        "id": "r140",
        "reponame": "r140",
        "star": 70,
        "watch": 27,
        "score": 0.31,
        "data": "2019-08-20"
    },
    {
        "id": "r141",
        "reponame": "r141",
        "star": 53,
        "watch": 12,
        "score": 0.17,
        "data": "2010-09-02"
    },
    {
        "id": "r142",
        "reponame": "r142",
        "star": 45,
        "watch": 18,
        "score": 0.57,
        "data": "2019-11-03"
    },
    {
        "id": "r143",
        "reponame": "r143",
        "star": 14,
        "watch": 71,
        "score": 0.03,
        "data": "2011-07-28"
    },
    {
        "id": "r144",
        "reponame": "r144",
        "star": 8,
        "watch": 37,
        "score": 0.92,
        "data": "2016-06-15"
    },
    {
        "id": "r145",
        "reponame": "r145",
        "star": 4,
        "watch": 3,
        "score": 0.82,
        "data": "2010-11-25"
    },
    {
        "id": "r146",
        "reponame": "r146",
        "star": 32,
        "watch": 62,
        "score": 0.32,
        "data": "2016-09-09"
    },
    {
        "id": "r147",
        "reponame": "r147",
        "star": 9,
        "watch": 14,
        "score": 0.51,
        "data": "2013-04-04"
    },
    {
        "id": "r148",
        "reponame": "r148",
        "star": 81,
        "watch": 73,
        "score": 0.78,
        "data": "2013-06-18"
    },
    {
        "id": "r149",
        "reponame": "r149",
        "star": 37,
        "watch": 9,
        "score": 0.29,
        "data": "2016-07-06"
    },
    {
        "id": "r150",
        "reponame": "r150",
        "star": 78,
        "watch": 44,
        "score": 0.65,
        "data": "2019-09-07"
    },
    {
        "id": "r151",
        "reponame": "r151",
        "star": 93,
        "watch": 80,
        "score": 0.27,
        "data": "2018-07-08"
    },
    {
        "id": "r152",
        "reponame": "r152",
        "star": 21,
        "watch": 48,
        "score": 0.38,
        "data": "2015-10-25"
    },
    {
        "id": "r153",
        "reponame": "r153",
        "star": 99,
        "watch": 50,
        "score": 0.76,
        "data": "2018-12-11"
    },
    {
        "id": "r154",
        "reponame": "r154",
        "star": 87,
        "watch": 80,
        "score": 0.92,
        "data": "2022-03-10"
    },
    {
        "id": "r155",
        "reponame": "r155",
        "star": 2,
        "watch": 20,
        "score": 0.96,
        "data": "2018-10-05"
    },
    {
        "id": "r156",
        "reponame": "r156",
        "star": 53,
        "watch": 59,
        "score": 0.25,
        "data": "2012-06-27"
    },
    {
        "id": "r157",
        "reponame": "r157",
        "star": 23,
        "watch": 67,
        "score": 0.57,
        "data": "2015-05-28"
    },
    {
        "id": "r158",
        "reponame": "r158",
        "star": 90,
        "watch": 26,
        "score": 0.98,
        "data": "2011-05-16"
    },
    {
        "id": "r159",
        "reponame": "r159",
        "star": 8,
        "watch": 18,
        "score": 0.97,
        "data": "2018-04-20"
    },
    {
        "id": "r160",
        "reponame": "r160",
        "star": 12,
        "watch": 89,
        "score": 0.88,
        "data": "2014-01-23"
    },
    {
        "id": "r161",
        "reponame": "r161",
        "star": 52,
        "watch": 13,
        "score": 0.39,
        "data": "2011-06-21"
    },
    {
        "id": "r162",
        "reponame": "r162",
        "star": 5,
        "watch": 52,
        "score": 0.24,
        "data": "2021-07-11"
    },
    {
        "id": "r163",
        "reponame": "r163",
        "star": 18,
        "watch": 39,
        "score": 0.52,
        "data": "2013-05-25"
    },
    {
        "id": "r164",
        "reponame": "r164",
        "star": 28,
        "watch": 22,
        "score": 0.86,
        "data": "2016-11-19"
    },
    {
        "id": "r165",
        "reponame": "r165",
        "star": 56,
        "watch": 41,
        "score": 0.83,
        "data": "2016-02-22"
    },
    {
        "id": "r166",
        "reponame": "r166",
        "star": 90,
        "watch": 5,
        "score": 0.65,
        "data": "2010-03-14"
    },
    {
        "id": "r167",
        "reponame": "r167",
        "star": 82,
        "watch": 94,
        "score": 0.27,
        "data": "2018-02-21"
    },
    {
        "id": "r168",
        "reponame": "r168",
        "star": 42,
        "watch": 8,
        "score": 0.4,
        "data": "2021-07-18"
    },
    {
        "id": "r169",
        "reponame": "r169",
        "star": 90,
        "watch": 92,
        "score": 0.31,
        "data": "2011-02-19"
    },
    {
        "id": "r170",
        "reponame": "r170",
        "star": 63,
        "watch": 40,
        "score": 0.26,
        "data": "2016-06-05"
    },
    {
        "id": "r171",
        "reponame": "r171",
        "star": 8,
        "watch": 3,
        "score": 0.03,
        "data": "2014-07-31"
    },
    {
        "id": "r172",
        "reponame": "r172",
        "star": 76,
        "watch": 34,
        "score": 0.73,
        "data": "2013-09-08"
    },
    {
        "id": "r173",
        "reponame": "r173",
        "star": 91,
        "watch": 10,
        "score": 0.86,
        "data": "2010-10-22"
    },
    {
        "id": "r174",
        "reponame": "r174",
        "star": 63,
        "watch": 86,
        "score": 0.08,
        "data": "2018-12-09"
    },
    {
        "id": "r175",
        "reponame": "r175",
        "star": 86,
        "watch": 77,
        "score": 0.29,
        "data": "2020-11-13"
    },
    {
        "id": "r176",
        "reponame": "r176",
        "star": 21,
        "watch": 19,
        "score": 0.7,
        "data": "2012-03-07"
    },
    {
        "id": "r177",
        "reponame": "r177",
        "star": 50,
        "watch": 84,
        "score": 0.3,
        "data": "2018-12-13"
    },
    {
        "id": "r178",
        "reponame": "r178",
        "star": 91,
        "watch": 55,
        "score": 0.07,
        "data": "2012-10-15"
    },
    {
        "id": "r179",
        "reponame": "r179",
        "star": 2,
        "watch": 54,
        "score": 0.25,
        "data": "2012-01-28"
    },
    {
        "id": "r180",
        "reponame": "r180",
        "star": 4,
        "watch": 45,
        "score": 0.11,
        "data": "2022-10-27"
    },
    {
        "id": "r181",
        "reponame": "r181",
        "star": 72,
        "watch": 17,
        "score": 0.95,
        "data": "2022-11-15"
    },
    {
        "id": "r182",
        "reponame": "r182",
        "star": 1,
        "watch": 85,
        "score": 0.39,
        "data": "2021-09-27"
    },
    {
        "id": "r183",
        "reponame": "r183",
        "star": 77,
        "watch": 99,
        "score": 0.99,
        "data": "2015-08-12"
    },
    {
        "id": "r184",
        "reponame": "r184",
        "star": 43,
        "watch": 33,
        "score": 0.72,
        "data": "2014-04-02"
    },
    {
        "id": "r185",
        "reponame": "r185",
        "star": 90,
        "watch": 49,
        "score": 0.77,
        "data": "2015-01-06"
    },
    {
        "id": "r186",
        "reponame": "r186",
        "star": 44,
        "watch": 98,
        "score": 0.11,
        "data": "2014-05-24"
    },
    {
        "id": "r187",
        "reponame": "r187",
        "star": 20,
        "watch": 67,
        "score": 0.51,
        "data": "2010-07-17"
    },
    {
        "id": "r188",
        "reponame": "r188",
        "star": 37,
        "watch": 62,
        "score": 0.86,
        "data": "2017-11-11"
    },
    {
        "id": "r189",
        "reponame": "r189",
        "star": 55,
        "watch": 31,
        "score": 0.66,
        "data": "2010-06-18"
    },
    {
        "id": "r190",
        "reponame": "r190",
        "star": 9,
        "watch": 46,
        "score": 0.82,
        "data": "2014-11-01"
    },
    {
        "id": "r191",
        "reponame": "r191",
        "star": 72,
        "watch": 14,
        "score": 0.59,
        "data": "2018-12-15"
    },
    {
        "id": "r192",
        "reponame": "r192",
        "star": 74,
        "watch": 5,
        "score": 0.5,
        "data": "2017-05-04"
    },
    {
        "id": "r193",
        "reponame": "r193",
        "star": 4,
        "watch": 60,
        "score": 0.46,
        "data": "2010-07-15"
    },
    {
        "id": "r194",
        "reponame": "r194",
        "star": 30,
        "watch": 20,
        "score": 0.46,
        "data": "2010-09-20"
    },
    {
        "id": "r195",
        "reponame": "r195",
        "star": 53,
        "watch": 91,
        "score": 0.13,
        "data": "2019-10-20"
    },
    {
        "id": "r196",
        "reponame": "r196",
        "star": 70,
        "watch": 60,
        "score": 0.52,
        "data": "2021-03-04"
    },
    {
        "id": "r197",
        "reponame": "r197",
        "star": 7,
        "watch": 74,
        "score": 0.29,
        "data": "2015-04-21"
    },
    {
        "id": "r198",
        "reponame": "r198",
        "star": 38,
        "watch": 58,
        "score": 0.26,
        "data": "2016-08-07"
    },
    {
        "id": "r199",
        "reponame": "r199",
        "star": 48,
        "watch": 2,
        "score": 0.48,
        "data": "2012-08-02"
    },
    {
        "id": "r200",
        "reponame": "r200",
        "star": 51,
        "watch": 8,
        "score": 0.01,
        "data": "2019-12-06"
    },
    {
        "id": "r201",
        "reponame": "r201",
        "star": 2,
        "watch": 49,
        "score": 0.15,
        "data": "2020-09-17"
    },
    {
        "id": "r202",
        "reponame": "r202",
        "star": 71,
        "watch": 95,
        "score": 0.93,
        "data": "2018-01-20"
    },
    {
        "id": "r203",
        "reponame": "r203",
        "star": 69,
        "watch": 80,
        "score": 0.97,
        "data": "2020-04-02"
    },
    {
        "id": "r204",
        "reponame": "r204",
        "star": 8,
        "watch": 18,
        "score": 0.32,
        "data": "2020-11-11"
    },
    {
        "id": "r205",
        "reponame": "r205",
        "star": 94,
        "watch": 0,
        "score": 0.63,
        "data": "2014-09-04"
    },
    {
        "id": "r206",
        "reponame": "r206",
        "star": 80,
        "watch": 38,
        "score": 0.76,
        "data": "2012-11-30"
    },
    {
        "id": "r207",
        "reponame": "r207",
        "star": 23,
        "watch": 83,
        "score": 0.81,
        "data": "2011-05-12"
    },
    {
        "id": "r208",
        "reponame": "r208",
        "star": 54,
        "watch": 83,
        "score": 0.03,
        "data": "2015-09-17"
    },
    {
        "id": "r209",
        "reponame": "r209",
        "star": 37,
        "watch": 52,
        "score": 0.44,
        "data": "2020-11-23"
    },
    {
        "id": "r210",
        "reponame": "r210",
        "star": 66,
        "watch": 86,
        "score": 0.46,
        "data": "2020-12-10"
    },
    {
        "id": "r211",
        "reponame": "r211",
        "star": 55,
        "watch": 75,
        "score": 0.81,
        "data": "2022-04-17"
    },
    {
        "id": "r212",
        "reponame": "r212",
        "star": 43,
        "watch": 3,
        "score": 0.06,
        "data": "2012-04-13"
    },
    {
        "id": "r213",
        "reponame": "r213",
        "star": 55,
        "watch": 9,
        "score": 0.96,
        "data": "2022-02-17"
    },
    {
        "id": "r214",
        "reponame": "r214",
        "star": 11,
        "watch": 65,
        "score": 0.87,
        "data": "2010-12-29"
    },
    {
        "id": "r215",
        "reponame": "r215",
        "star": 84,
        "watch": 75,
        "score": 0.01,
        "data": "2010-04-28"
    },
    {
        "id": "r216",
        "reponame": "r216",
        "star": 6,
        "watch": 79,
        "score": 0.78,
        "data": "2018-03-09"
    },
    {
        "id": "r217",
        "reponame": "r217",
        "star": 5,
        "watch": 36,
        "score": 0.13,
        "data": "2012-12-25"
    },
    {
        "id": "r218",
        "reponame": "r218",
        "star": 87,
        "watch": 90,
        "score": 0.86,
        "data": "2015-08-08"
    },
    {
        "id": "r219",
        "reponame": "r219",
        "star": 23,
        "watch": 16,
        "score": 0.84,
        "data": "2015-04-26"
    },
    {
        "id": "r220",
        "reponame": "r220",
        "star": 87,
        "watch": 2,
        "score": 0.62,
        "data": "2020-06-23"
    },
    {
        "id": "r221",
        "reponame": "r221",
        "star": 99,
        "watch": 19,
        "score": 0.77,
        "data": "2017-07-09"
    },
    {
        "id": "r222",
        "reponame": "r222",
        "star": 50,
        "watch": 68,
        "score": 0.53,
        "data": "2014-02-25"
    },
    {
        "id": "r223",
        "reponame": "r223",
        "star": 18,
        "watch": 86,
        "score": 0.93,
        "data": "2012-08-12"
    },
    {
        "id": "r224",
        "reponame": "r224",
        "star": 2,
        "watch": 33,
        "score": 0.15,
        "data": "2010-10-13"
    },
    {
        "id": "r225",
        "reponame": "r225",
        "star": 5,
        "watch": 92,
        "score": 0.62,
        "data": "2020-07-06"
    },
    {
        "id": "r226",
        "reponame": "r226",
        "star": 32,
        "watch": 58,
        "score": 0.1,
        "data": "2011-06-27"
    },
    {
        "id": "r227",
        "reponame": "r227",
        "star": 21,
        "watch": 20,
        "score": 0.97,
        "data": "2022-08-06"
    },
    {
        "id": "r228",
        "reponame": "r228",
        "star": 63,
        "watch": 42,
        "score": 0.17,
        "data": "2022-11-05"
    },
    {
        "id": "r229",
        "reponame": "r229",
        "star": 53,
        "watch": 44,
        "score": 0.89,
        "data": "2019-02-03"
    },
    {
        "id": "r230",
        "reponame": "r230",
        "star": 89,
        "watch": 84,
        "score": 0.4,
        "data": "2013-02-03"
    },
    {
        "id": "r231",
        "reponame": "r231",
        "star": 20,
        "watch": 25,
        "score": 0.19,
        "data": "2010-10-28"
    },
    {
        "id": "r232",
        "reponame": "r232",
        "star": 81,
        "watch": 30,
        "score": 0.94,
        "data": "2015-07-13"
    },
    {
        "id": "r233",
        "reponame": "r233",
        "star": 19,
        "watch": 99,
        "score": 0.07,
        "data": "2010-05-05"
    },
    {
        "id": "r234",
        "reponame": "r234",
        "star": 24,
        "watch": 5,
        "score": 0.48,
        "data": "2011-06-11"
    },
    {
        "id": "r235",
        "reponame": "r235",
        "star": 86,
        "watch": 33,
        "score": 0.81,
        "data": "2013-03-06"
    },
    {
        "id": "r236",
        "reponame": "r236",
        "star": 62,
        "watch": 72,
        "score": 0.68,
        "data": "2011-11-17"
    },
    {
        "id": "r237",
        "reponame": "r237",
        "star": 18,
        "watch": 96,
        "score": 0.59,
        "data": "2021-10-10"
    },
    {
        "id": "r238",
        "reponame": "r238",
        "star": 70,
        "watch": 73,
        "score": 0.57,
        "data": "2013-06-12"
    },
    {
        "id": "r239",
        "reponame": "r239",
        "star": 95,
        "watch": 62,
        "score": 0.61,
        "data": "2015-03-03"
    },
    {
        "id": "r240",
        "reponame": "r240",
        "star": 44,
        "watch": 3,
        "score": 0.97,
        "data": "2015-03-11"
    },
    {
        "id": "r241",
        "reponame": "r241",
        "star": 72,
        "watch": 4,
        "score": 0.08,
        "data": "2014-05-31"
    },
    {
        "id": "r242",
        "reponame": "r242",
        "star": 93,
        "watch": 94,
        "score": 0.23,
        "data": "2019-05-31"
    },
    {
        "id": "r243",
        "reponame": "r243",
        "star": 13,
        "watch": 99,
        "score": 0.23,
        "data": "2014-09-09"
    },
    {
        "id": "r244",
        "reponame": "r244",
        "star": 96,
        "watch": 93,
        "score": 0.08,
        "data": "2018-08-21"
    },
    {
        "id": "r245",
        "reponame": "r245",
        "star": 86,
        "watch": 39,
        "score": 0.08,
        "data": "2021-11-25"
    },
    {
        "id": "r246",
        "reponame": "r246",
        "star": 80,
        "watch": 75,
        "score": 0.08,
        "data": "2016-11-02"
    },
    {
        "id": "r247",
        "reponame": "r247",
        "star": 27,
        "watch": 94,
        "score": 0.08,
        "data": "2018-06-01"
    },
    {
        "id": "r248",
        "reponame": "r248",
        "star": 93,
        "watch": 63,
        "score": 0.54,
        "data": "2011-10-23"
    },
    {
        "id": "r249",
        "reponame": "r249",
        "star": 15,
        "watch": 99,
        "score": 0.05,
        "data": "2022-02-24"
    },
    {
        "id": "r250",
        "reponame": "r250",
        "star": 91,
        "watch": 27,
        "score": 0.46,
        "data": "2012-04-17"
    },
    {
        "id": "r251",
        "reponame": "r251",
        "star": 85,
        "watch": 90,
        "score": 0.08,
        "data": "2011-10-06"
    },
    {
        "id": "r252",
        "reponame": "r252",
        "star": 35,
        "watch": 11,
        "score": 0.68,
        "data": "2019-10-06"
    },
    {
        "id": "r253",
        "reponame": "r253",
        "star": 71,
        "watch": 55,
        "score": 0.08,
        "data": "2013-11-24"
    },
    {
        "id": "r254",
        "reponame": "r254",
        "star": 92,
        "watch": 7,
        "score": 0.08,
        "data": "2017-06-28"
    },
    {
        "id": "r255",
        "reponame": "r255",
        "star": 88,
        "watch": 34,
        "score": 0.08,
        "data": "2012-08-08"
    },
    {
        "id": "r256",
        "reponame": "r256",
        "star": 88,
        "watch": 67,
        "score": 0.08,
        "data": "2012-09-27"
    },
    {
        "id": "r257",
        "reponame": "r257",
        "star": 4,
        "watch": 97,
        "score": 0.99,
        "data": "2021-02-27"
    },
    {
        "id": "r258",
        "reponame": "r258",
        "star": 27,
        "watch": 47,
        "score": 0.56,
        "data": "2020-02-27"
    },
    {
        "id": "r259",
        "reponame": "r259",
        "star": 74,
        "watch": 48,
        "score": 0.08,
        "data": "2011-11-22"
    },
    {
        "id": "r260",
        "reponame": "r260",
        "star": 14,
        "watch": 91,
        "score": 0.58,
        "data": "2022-05-23"
    },
    {
        "id": "r261",
        "reponame": "r261",
        "star": 14,
        "watch": 56,
        "score": 0.52,
        "data": "2016-04-07"
    },
    {
        "id": "r262",
        "reponame": "r262",
        "star": 49,
        "watch": 94,
        "score": 0.01,
        "data": "2011-06-10"
    },
    {
        "id": "r263",
        "reponame": "r263",
        "star": 31,
        "watch": 79,
        "score": 0.49,
        "data": "2012-03-08"
    },
    {
        "id": "r264",
        "reponame": "r264",
        "star": 45,
        "watch": 42,
        "score": 0.91,
        "data": "2020-11-18"
    },
    {
        "id": "r265",
        "reponame": "r265",
        "star": 37,
        "watch": 48,
        "score": 0.61,
        "data": "2014-11-01"
    },
    {
        "id": "r266",
        "reponame": "r266",
        "star": 19,
        "watch": 43,
        "score": 0.48,
        "data": "2019-02-07"
    },
    {
        "id": "r267",
        "reponame": "r267",
        "star": 22,
        "watch": 66,
        "score": 0.41,
        "data": "2011-09-17"
    },
    {
        "id": "r268",
        "reponame": "r268",
        "star": 50,
        "watch": 48,
        "score": 0.08,
        "data": "2014-08-04"
    },
    {
        "id": "r269",
        "reponame": "r269",
        "star": 28,
        "watch": 56,
        "score": 0.33,
        "data": "2020-01-07"
    },
    {
        "id": "r270",
        "reponame": "r270",
        "star": 36,
        "watch": 5,
        "score": 0.46,
        "data": "2018-11-13"
    },
    {
        "id": "r271",
        "reponame": "r271",
        "star": 76,
        "watch": 33,
        "score": 0.08,
        "data": "2019-08-16"
    },
    {
        "id": "r272",
        "reponame": "r272",
        "star": 21,
        "watch": 46,
        "score": 0.74,
        "data": "2022-06-18"
    },
    {
        "id": "r273",
        "reponame": "r273",
        "star": 83,
        "watch": 9,
        "score": 0.16,
        "data": "2013-01-13"
    },
    {
        "id": "r274",
        "reponame": "r274",
        "star": 80,
        "watch": 17,
        "score": 0.67,
        "data": "2019-01-28"
    },
    {
        "id": "r275",
        "reponame": "r275",
        "star": 76,
        "watch": 60,
        "score": 0.82,
        "data": "2017-12-23"
    },
    {
        "id": "r276",
        "reponame": "r276",
        "star": 75,
        "watch": 33,
        "score": 0.55,
        "data": "2015-04-07"
    },
    {
        "id": "r277",
        "reponame": "r277",
        "star": 58,
        "watch": 96,
        "score": 1,
        "data": "2022-11-20"
    },
    {
        "id": "r278",
        "reponame": "r278",
        "star": 18,
        "watch": 20,
        "score": 0.91,
        "data": "2013-04-20"
    },
    {
        "id": "r279",
        "reponame": "r279",
        "star": 99,
        "watch": 61,
        "score": 0.39,
        "data": "2013-12-19"
    },
    {
        "id": "r280",
        "reponame": "r280",
        "star": 10,
        "watch": 35,
        "score": 0.8,
        "data": "2011-12-12"
    },
    {
        "id": "r281",
        "reponame": "r281",
        "star": 83,
        "watch": 61,
        "score": 0.8,
        "data": "2011-12-20"
    },
    {
        "id": "r282",
        "reponame": "r282",
        "star": 23,
        "watch": 73,
        "score": 0.42,
        "data": "2020-10-05"
    },
    {
        "id": "r283",
        "reponame": "r283",
        "star": 61,
        "watch": 26,
        "score": 0.74,
        "data": "2020-05-21"
    },
    {
        "id": "r284",
        "reponame": "r284",
        "star": 71,
        "watch": 57,
        "score": 0.88,
        "data": "2018-04-03"
    },
    {
        "id": "r285",
        "reponame": "r285",
        "star": 66,
        "watch": 83,
        "score": 0.82,
        "data": "2021-05-11"
    },
    {
        "id": "r286",
        "reponame": "r286",
        "star": 9,
        "watch": 86,
        "score": 0.73,
        "data": "2015-12-14"
    },
    {
        "id": "r287",
        "reponame": "r287",
        "star": 16,
        "watch": 75,
        "score": 0.11,
        "data": "2021-11-22"
    },
    {
        "id": "r288",
        "reponame": "r288",
        "star": 97,
        "watch": 34,
        "score": 0.98,
        "data": "2019-04-27"
    },
    {
        "id": "r289",
        "reponame": "r289",
        "star": 96,
        "watch": 88,
        "score": 0.17,
        "data": "2013-12-13"
    },
    {
        "id": "r290",
        "reponame": "r290",
        "star": 39,
        "watch": 11,
        "score": 0.27,
        "data": "2018-08-20"
    },
    {
        "id": "r291",
        "reponame": "r291",
        "star": 87,
        "watch": 88,
        "score": 0.45,
        "data": "2013-11-03"
    },
    {
        "id": "r292",
        "reponame": "r292",
        "star": 45,
        "watch": 66,
        "score": 0.19,
        "data": "2021-06-21"
    },
    {
        "id": "r293",
        "reponame": "r293",
        "star": 52,
        "watch": 18,
        "score": 0.87,
        "data": "2017-03-05"
    },
    {
        "id": "r294",
        "reponame": "r294",
        "star": 11,
        "watch": 79,
        "score": 0.01,
        "data": "2019-02-27"
    },
    {
        "id": "r295",
        "reponame": "r295",
        "star": 32,
        "watch": 30,
        "score": 0.03,
        "data": "2011-04-22"
    },
    {
        "id": "r296",
        "reponame": "r296",
        "star": 6,
        "watch": 65,
        "score": 0.5,
        "data": "2020-04-07"
    },
    {
        "id": "r297",
        "reponame": "r297",
        "star": 15,
        "watch": 54,
        "score": 0.75,
        "data": "2020-11-06"
    },
    {
        "id": "r298",
        "reponame": "r298",
        "star": 48,
        "watch": 38,
        "score": 0.71,
        "data": "2010-05-19"
    },
    {
        "id": "r299",
        "reponame": "r299",
        "star": 56,
        "watch": 84,
        "score": 0.4,
        "data": "2017-02-25"
    },
    {
        "id": "r300",
        "reponame": "r300",
        "star": 58,
        "watch": 18,
        "score": 0.11,
        "data": "2016-06-01"
    },
    {
        "id": "r301",
        "reponame": "r301",
        "star": 99,
        "watch": 29,
        "score": 0.54,
        "data": "2013-04-24"
    },
    {
        "id": "r302",
        "reponame": "r302",
        "star": 22,
        "watch": 53,
        "score": 0.81,
        "data": "2022-12-02"
    },
    {
        "id": "r303",
        "reponame": "r303",
        "star": 38,
        "watch": 6,
        "score": 0.32,
        "data": "2021-01-08"
    },
    {
        "id": "r304",
        "reponame": "r304",
        "star": 3,
        "watch": 17,
        "score": 0.37,
        "data": "2012-11-14"
    },
    {
        "id": "r305",
        "reponame": "r305",
        "star": 19,
        "watch": 50,
        "score": 0.32,
        "data": "2021-08-11"
    },
    {
        "id": "r306",
        "reponame": "r306",
        "star": 31,
        "watch": 78,
        "score": 0.07,
        "data": "2011-02-18"
    },
    {
        "id": "r307",
        "reponame": "r307",
        "star": 11,
        "watch": 84,
        "score": 0.88,
        "data": "2013-08-17"
    },
    {
        "id": "r308",
        "reponame": "r308",
        "star": 72,
        "watch": 55,
        "score": 0.12,
        "data": "2021-01-25"
    },
    {
        "id": "r309",
        "reponame": "r309",
        "star": 7,
        "watch": 2,
        "score": 0.73,
        "data": "2016-01-30"
    },
    {
        "id": "r310",
        "reponame": "r310",
        "star": 79,
        "watch": 59,
        "score": 0.58,
        "data": "2022-04-05"
    },
    {
        "id": "r311",
        "reponame": "r311",
        "star": 100,
        "watch": 93,
        "score": 0.84,
        "data": "2019-06-23"
    },
    {
        "id": "r312",
        "reponame": "r312",
        "star": 94,
        "watch": 2,
        "score": 0.75,
        "data": "2020-08-28"
    },
    {
        "id": "r313",
        "reponame": "r313",
        "star": 69,
        "watch": 76,
        "score": 0.18,
        "data": "2010-05-26"
    },
    {
        "id": "r314",
        "reponame": "r314",
        "star": 49,
        "watch": 57,
        "score": 0.64,
        "data": "2011-10-25"
    },
    {
        "id": "r315",
        "reponame": "r315",
        "star": 32,
        "watch": 62,
        "score": 0.77,
        "data": "2011-01-08"
    },
    {
        "id": "r316",
        "reponame": "r316",
        "star": 35,
        "watch": 24,
        "score": 0.19,
        "data": "2013-04-10"
    },
    {
        "id": "r317",
        "reponame": "r317",
        "star": 64,
        "watch": 35,
        "score": 0.43,
        "data": "2018-08-13"
    },
    {
        "id": "r318",
        "reponame": "r318",
        "star": 73,
        "watch": 70,
        "score": 0.38,
        "data": "2010-12-23"
    },
    {
        "id": "r319",
        "reponame": "r319",
        "star": 8,
        "watch": 31,
        "score": 0.02,
        "data": "2020-09-24"
    },
    {
        "id": "r320",
        "reponame": "r320",
        "star": 17,
        "watch": 64,
        "score": 0.34,
        "data": "2014-10-25"
    },
    {
        "id": "r321",
        "reponame": "r321",
        "star": 45,
        "watch": 12,
        "score": 0.9,
        "data": "2014-01-20"
    },
    {
        "id": "r322",
        "reponame": "r322",
        "star": 59,
        "watch": 58,
        "score": 0.17,
        "data": "2021-02-12"
    },
    {
        "id": "r323",
        "reponame": "r323",
        "star": 83,
        "watch": 16,
        "score": 0.99,
        "data": "2010-07-29"
    },
    {
        "id": "r324",
        "reponame": "r324",
        "star": 22,
        "watch": 77,
        "score": 0.48,
        "data": "2020-05-19"
    },
    {
        "id": "r325",
        "reponame": "r325",
        "star": 82,
        "watch": 51,
        "score": 0.47,
        "data": "2016-12-18"
    },
    {
        "id": "r326",
        "reponame": "r326",
        "star": 70,
        "watch": 85,
        "score": 0.9,
        "data": "2015-06-01"
    },
    {
        "id": "r327",
        "reponame": "r327",
        "star": 38,
        "watch": 12,
        "score": 0.08,
        "data": "2022-05-10"
    },
    {
        "id": "r328",
        "reponame": "r328",
        "star": 2,
        "watch": 20,
        "score": 0.84,
        "data": "2011-10-07"
    },
    {
        "id": "r329",
        "reponame": "r329",
        "star": 42,
        "watch": 6,
        "score": 0.7,
        "data": "2010-07-21"
    },
    {
        "id": "r330",
        "reponame": "r330",
        "star": 28,
        "watch": 90,
        "score": 0.86,
        "data": "2022-09-06"
    },
    {
        "id": "r331",
        "reponame": "r331",
        "star": 15,
        "watch": 26,
        "score": 0.32,
        "data": "2022-05-28"
    },
    {
        "id": "r332",
        "reponame": "r332",
        "star": 16,
        "watch": 15,
        "score": 0.03,
        "data": "2013-11-22"
    },
    {
        "id": "r333",
        "reponame": "r333",
        "star": 80,
        "watch": 11,
        "score": 0.02,
        "data": "2021-03-19"
    },
    {
        "id": "r334",
        "reponame": "r334",
        "star": 1,
        "watch": 97,
        "score": 0.44,
        "data": "2022-03-21"
    },
    {
        "id": "r335",
        "reponame": "r335",
        "star": 84,
        "watch": 89,
        "score": 0.23,
        "data": "2013-11-13"
    },
    {
        "id": "r336",
        "reponame": "r336",
        "star": 4,
        "watch": 55,
        "score": 0.53,
        "data": "2017-07-28"
    },
    {
        "id": "r337",
        "reponame": "r337",
        "star": 18,
        "watch": 6,
        "score": 0.34,
        "data": "2017-11-14"
    },
    {
        "id": "r338",
        "reponame": "r338",
        "star": 26,
        "watch": 85,
        "score": 0.51,
        "data": "2015-08-26"
    },
    {
        "id": "r339",
        "reponame": "r339",
        "star": 15,
        "watch": 47,
        "score": 0.75,
        "data": "2012-04-24"
    },
    {
        "id": "r340",
        "reponame": "r340",
        "star": 7,
        "watch": 26,
        "score": 0.32,
        "data": "2022-08-13"
    },
    {
        "id": "r341",
        "reponame": "r341",
        "star": 53,
        "watch": 51,
        "score": 0.08,
        "data": "2015-03-06"
    },
    {
        "id": "r342",
        "reponame": "r342",
        "star": 81,
        "watch": 33,
        "score": 0.92,
        "data": "2020-04-15"
    },
    {
        "id": "r343",
        "reponame": "r343",
        "star": 56,
        "watch": 54,
        "score": 0.19,
        "data": "2016-05-26"
    },
    {
        "id": "r344",
        "reponame": "r344",
        "star": 71,
        "watch": 20,
        "score": 0.84,
        "data": "2010-09-04"
    },
    {
        "id": "r345",
        "reponame": "r345",
        "star": 5,
        "watch": 54,
        "score": 0.37,
        "data": "2012-06-12"
    },
    {
        "id": "r346",
        "reponame": "r346",
        "star": 35,
        "watch": 19,
        "score": 0.23,
        "data": "2018-02-06"
    },
    {
        "id": "r347",
        "reponame": "r347",
        "star": 70,
        "watch": 64,
        "score": 0.53,
        "data": "2010-04-01"
    },
    {
        "id": "r348",
        "reponame": "r348",
        "star": 77,
        "watch": 10,
        "score": 0.93,
        "data": "2022-10-21"
    },
    {
        "id": "r349",
        "reponame": "r349",
        "star": 82,
        "watch": 54,
        "score": 0.33,
        "data": "2018-11-21"
    },
    {
        "id": "r350",
        "reponame": "r350",
        "star": 3,
        "watch": 67,
        "score": 0.58,
        "data": "2019-11-28"
    },
    {
        "id": "r351",
        "reponame": "r351",
        "star": 90,
        "watch": 55,
        "score": 0.03,
        "data": "2017-06-23"
    },
    {
        "id": "r352",
        "reponame": "r352",
        "star": 95,
        "watch": 34,
        "score": 0.15,
        "data": "2013-03-30"
    },
    {
        "id": "r353",
        "reponame": "r353",
        "star": 47,
        "watch": 73,
        "score": 0.93,
        "data": "2014-12-09"
    },
    {
        "id": "r354",
        "reponame": "r354",
        "star": 84,
        "watch": 44,
        "score": 0.56,
        "data": "2019-12-11"
    },
    {
        "id": "r355",
        "reponame": "r355",
        "star": 97,
        "watch": 41,
        "score": 0.19,
        "data": "2016-01-18"
    },
    {
        "id": "r356",
        "reponame": "r356",
        "star": 2,
        "watch": 21,
        "score": 0.12,
        "data": "2017-12-20"
    },
    {
        "id": "r357",
        "reponame": "r357",
        "star": 66,
        "watch": 56,
        "score": 0.74,
        "data": "2021-09-27"
    },
    {
        "id": "r358",
        "reponame": "r358",
        "star": 80,
        "watch": 25,
        "score": 0.62,
        "data": "2019-06-19"
    },
    {
        "id": "r359",
        "reponame": "r359",
        "star": 45,
        "watch": 13,
        "score": 0.37,
        "data": "2018-07-31"
    },
    {
        "id": "r360",
        "reponame": "r360",
        "star": 63,
        "watch": 24,
        "score": 0.22,
        "data": "2019-03-28"
    },
    {
        "id": "r361",
        "reponame": "r361",
        "star": 97,
        "watch": 80,
        "score": 0.18,
        "data": "2022-04-09"
    },
    {
        "id": "r362",
        "reponame": "r362",
        "star": 10,
        "watch": 30,
        "score": 0.29,
        "data": "2020-10-24"
    },
    {
        "id": "r363",
        "reponame": "r363",
        "star": 61,
        "watch": 86,
        "score": 0.84,
        "data": "2016-02-07"
    },
    {
        "id": "r364",
        "reponame": "r364",
        "star": 44,
        "watch": 27,
        "score": 0.15,
        "data": "2011-03-07"
    },
    {
        "id": "r365",
        "reponame": "r365",
        "star": 9,
        "watch": 0,
        "score": 0.1,
        "data": "2020-08-14"
    },
    {
        "id": "r366",
        "reponame": "r366",
        "star": 6,
        "watch": 39,
        "score": 0.13,
        "data": "2020-12-04"
    },
    {
        "id": "r367",
        "reponame": "r367",
        "star": 6,
        "watch": 17,
        "score": 0.43,
        "data": "2018-07-31"
    },
    {
        "id": "r368",
        "reponame": "r368",
        "star": 12,
        "watch": 1,
        "score": 0.36,
        "data": "2021-10-12"
    },
    {
        "id": "r369",
        "reponame": "r369",
        "star": 15,
        "watch": 29,
        "score": 0.79,
        "data": "2015-02-01"
    },
    {
        "id": "r370",
        "reponame": "r370",
        "star": 8,
        "watch": 71,
        "score": 0.1,
        "data": "2017-03-23"
    },
    {
        "id": "r371",
        "reponame": "r371",
        "star": 47,
        "watch": 63,
        "score": 0.82,
        "data": "2016-05-16"
    },
    {
        "id": "r372",
        "reponame": "r372",
        "star": 86,
        "watch": 73,
        "score": 0.16,
        "data": "2014-12-13"
    },
    {
        "id": "r373",
        "reponame": "r373",
        "star": 2,
        "watch": 43,
        "score": 0.61,
        "data": "2015-06-04"
    },
    {
        "id": "r374",
        "reponame": "r374",
        "star": 48,
        "watch": 82,
        "score": 0.06,
        "data": "2018-02-18"
    },
    {
        "id": "r375",
        "reponame": "r375",
        "star": 49,
        "watch": 49,
        "score": 0.85,
        "data": "2019-02-03"
    },
    {
        "id": "r376",
        "reponame": "r376",
        "star": 75,
        "watch": 37,
        "score": 0.42,
        "data": "2013-05-12"
    },
    {
        "id": "r377",
        "reponame": "r377",
        "star": 52,
        "watch": 16,
        "score": 0.18,
        "data": "2018-12-23"
    },
    {
        "id": "r378",
        "reponame": "r378",
        "star": 42,
        "watch": 13,
        "score": 0.86,
        "data": "2010-12-24"
    },
    {
        "id": "r379",
        "reponame": "r379",
        "star": 89,
        "watch": 15,
        "score": 0.09,
        "data": "2017-03-14"
    },
    {
        "id": "r380",
        "reponame": "r380",
        "star": 62,
        "watch": 33,
        "score": 0.82,
        "data": "2015-12-03"
    },
    {
        "id": "r381",
        "reponame": "r381",
        "star": 59,
        "watch": 70,
        "score": 0.8,
        "data": "2019-08-09"
    },
    {
        "id": "r382",
        "reponame": "r382",
        "star": 37,
        "watch": 64,
        "score": 0.47,
        "data": "2016-08-02"
    },
    {
        "id": "r383",
        "reponame": "r383",
        "star": 6,
        "watch": 75,
        "score": 0.14,
        "data": "2021-04-04"
    },
    {
        "id": "r384",
        "reponame": "r384",
        "star": 21,
        "watch": 12,
        "score": 0.31,
        "data": "2016-12-04"
    },
    {
        "id": "r385",
        "reponame": "r385",
        "star": 70,
        "watch": 70,
        "score": 0.88,
        "data": "2019-09-04"
    },
    {
        "id": "r386",
        "reponame": "r386",
        "star": 43,
        "watch": 43,
        "score": 0.92,
        "data": "2016-06-08"
    },
    {
        "id": "r387",
        "reponame": "r387",
        "star": 47,
        "watch": 6,
        "score": 0.28,
        "data": "2012-04-16"
    },
    {
        "id": "r388",
        "reponame": "r388",
        "star": 10,
        "watch": 61,
        "score": 0.08,
        "data": "2015-09-06"
    },
    {
        "id": "r389",
        "reponame": "r389",
        "star": 53,
        "watch": 1,
        "score": 0.16,
        "data": "2019-03-12"
    },
    {
        "id": "r390",
        "reponame": "r390",
        "star": 48,
        "watch": 42,
        "score": 0.89,
        "data": "2016-02-29"
    },
    {
        "id": "r391",
        "reponame": "r391",
        "star": 50,
        "watch": 10,
        "score": 0.84,
        "data": "2017-01-16"
    },
    {
        "id": "r392",
        "reponame": "r392",
        "star": 73,
        "watch": 77,
        "score": 0.22,
        "data": "2015-12-24"
    },
    {
        "id": "r393",
        "reponame": "r393",
        "star": 47,
        "watch": 15,
        "score": 0.46,
        "data": "2011-02-04"
    },
    {
        "id": "r394",
        "reponame": "r394",
        "star": 46,
        "watch": 50,
        "score": 0.38,
        "data": "2013-02-09"
    },
    {
        "id": "r395",
        "reponame": "r395",
        "star": 9,
        "watch": 94,
        "score": 0.12,
        "data": "2017-09-13"
    },
    {
        "id": "r396",
        "reponame": "r396",
        "star": 21,
        "watch": 38,
        "score": 0.73,
        "data": "2020-04-18"
    },
    {
        "id": "r397",
        "reponame": "r397",
        "star": 81,
        "watch": 34,
        "score": 0.9,
        "data": "2010-12-01"
    },
    {
        "id": "r398",
        "reponame": "r398",
        "star": 47,
        "watch": 78,
        "score": 0.2,
        "data": "2013-10-26"
    },
    {
        "id": "r399",
        "reponame": "r399",
        "star": 36,
        "watch": 64,
        "score": 0.77,
        "data": "2021-11-05"
    },
    {
        "id": "r400",
        "reponame": "r400",
        "star": 43,
        "watch": 71,
        "score": 0.55,
        "data": "2013-10-21"
    },
    {
        "id": "r401",
        "reponame": "r401",
        "star": 36,
        "watch": 16,
        "score": 0.23,
        "data": "2011-12-28"
    },
    {
        "id": "r402",
        "reponame": "r402",
        "star": 100,
        "watch": 7,
        "score": 0.8,
        "data": "2020-03-18"
    },
    {
        "id": "r403",
        "reponame": "r403",
        "star": 25,
        "watch": 16,
        "score": 0.15,
        "data": "2011-03-14"
    },
    {
        "id": "r404",
        "reponame": "r404",
        "star": 77,
        "watch": 46,
        "score": 0.01,
        "data": "2018-05-21"
    },
    {
        "id": "r405",
        "reponame": "r405",
        "star": 51,
        "watch": 66,
        "score": 0.84,
        "data": "2012-04-14"
    },
    {
        "id": "r406",
        "reponame": "r406",
        "star": 50,
        "watch": 75,
        "score": 0.56,
        "data": "2020-08-28"
    },
    {
        "id": "r407",
        "reponame": "r407",
        "star": 93,
        "watch": 45,
        "score": 0.89,
        "data": "2018-01-27"
    },
    {
        "id": "r408",
        "reponame": "r408",
        "star": 73,
        "watch": 100,
        "score": 0.3,
        "data": "2017-04-28"
    },
    {
        "id": "r409",
        "reponame": "r409",
        "star": 7,
        "watch": 27,
        "score": 0.65,
        "data": "2018-05-05"
    },
    {
        "id": "r410",
        "reponame": "r410",
        "star": 63,
        "watch": 20,
        "score": 0.23,
        "data": "2010-02-16"
    },
    {
        "id": "r411",
        "reponame": "r411",
        "star": 91,
        "watch": 66,
        "score": 0.11,
        "data": "2014-03-09"
    },
    {
        "id": "r412",
        "reponame": "r412",
        "star": 86,
        "watch": 47,
        "score": 0.96,
        "data": "2015-02-25"
    },
    {
        "id": "r413",
        "reponame": "r413",
        "star": 24,
        "watch": 24,
        "score": 0.6,
        "data": "2021-01-10"
    },
    {
        "id": "r414",
        "reponame": "r414",
        "star": 58,
        "watch": 4,
        "score": 0.11,
        "data": "2017-01-28"
    },
    {
        "id": "r415",
        "reponame": "r415",
        "star": 74,
        "watch": 69,
        "score": 0.06,
        "data": "2010-10-17"
    },
    {
        "id": "r416",
        "reponame": "r416",
        "star": 19,
        "watch": 16,
        "score": 0.6,
        "data": "2020-03-28"
    },
    {
        "id": "r417",
        "reponame": "r417",
        "star": 60,
        "watch": 22,
        "score": 0.51,
        "data": "2020-06-04"
    },
    {
        "id": "r418",
        "reponame": "r418",
        "star": 21,
        "watch": 64,
        "score": 0.8,
        "data": "2021-03-24"
    },
    {
        "id": "r419",
        "reponame": "r419",
        "star": 33,
        "watch": 55,
        "score": 0.26,
        "data": "2013-02-13"
    },
    {
        "id": "r420",
        "reponame": "r420",
        "star": 94,
        "watch": 27,
        "score": 0.28,
        "data": "2017-02-07"
    },
    {
        "id": "r421",
        "reponame": "r421",
        "star": 60,
        "watch": 91,
        "score": 0.08,
        "data": "2011-08-30"
    },
    {
        "id": "r422",
        "reponame": "r422",
        "star": 66,
        "watch": 25,
        "score": 0.41,
        "data": "2016-02-05"
    },
    {
        "id": "r423",
        "reponame": "r423",
        "star": 86,
        "watch": 59,
        "score": 0.22,
        "data": "2011-04-03"
    },
    {
        "id": "r424",
        "reponame": "r424",
        "star": 59,
        "watch": 70,
        "score": 0.17,
        "data": "2019-06-13"
    },
    {
        "id": "r425",
        "reponame": "r425",
        "star": 50,
        "watch": 41,
        "score": 0.47,
        "data": "2010-02-28"
    },
    {
        "id": "r426",
        "reponame": "r426",
        "star": 93,
        "watch": 60,
        "score": 0.72,
        "data": "2016-06-19"
    },
    {
        "id": "r427",
        "reponame": "r427",
        "star": 85,
        "watch": 97,
        "score": 0.02,
        "data": "2019-05-29"
    },
    {
        "id": "r428",
        "reponame": "r428",
        "star": 25,
        "watch": 32,
        "score": 0.01,
        "data": "2019-02-21"
    },
    {
        "id": "r429",
        "reponame": "r429",
        "star": 85,
        "watch": 50,
        "score": 0.06,
        "data": "2011-06-12"
    },
    {
        "id": "r430",
        "reponame": "r430",
        "star": 55,
        "watch": 84,
        "score": 0.08,
        "data": "2016-02-22"
    },
    {
        "id": "r431",
        "reponame": "r431",
        "star": 37,
        "watch": 32,
        "score": 0.9,
        "data": "2017-11-14"
    },
    {
        "id": "r432",
        "reponame": "r432",
        "star": 17,
        "watch": 99,
        "score": 0.07,
        "data": "2014-07-17"
    },
    {
        "id": "r433",
        "reponame": "r433",
        "star": 78,
        "watch": 27,
        "score": 0.24,
        "data": "2019-05-30"
    },
    {
        "id": "r434",
        "reponame": "r434",
        "star": 76,
        "watch": 42,
        "score": 0.63,
        "data": "2018-04-14"
    },
    {
        "id": "r435",
        "reponame": "r435",
        "star": 45,
        "watch": 35,
        "score": 0.89,
        "data": "2017-04-13"
    },
    {
        "id": "r436",
        "reponame": "r436",
        "star": 76,
        "watch": 69,
        "score": 0.02,
        "data": "2013-03-20"
    },
    {
        "id": "r437",
        "reponame": "r437",
        "star": 8,
        "watch": 1,
        "score": 0.83,
        "data": "2022-07-22"
    },
    {
        "id": "r438",
        "reponame": "r438",
        "star": 83,
        "watch": 15,
        "score": 0.07,
        "data": "2018-10-10"
    },
    {
        "id": "r439",
        "reponame": "r439",
        "star": 58,
        "watch": 8,
        "score": 0.83,
        "data": "2020-03-19"
    },
    {
        "id": "r440",
        "reponame": "r440",
        "star": 22,
        "watch": 76,
        "score": 0.7,
        "data": "2013-04-02"
    },
    {
        "id": "r441",
        "reponame": "r441",
        "star": 50,
        "watch": 13,
        "score": 0.36,
        "data": "2021-03-06"
    },
    {
        "id": "r442",
        "reponame": "r442",
        "star": 93,
        "watch": 50,
        "score": 0.59,
        "data": "2016-11-10"
    },
    {
        "id": "r443",
        "reponame": "r443",
        "star": 11,
        "watch": 92,
        "score": 0.67,
        "data": "2020-08-09"
    },
    {
        "id": "r444",
        "reponame": "r444",
        "star": 47,
        "watch": 71,
        "score": 0.41,
        "data": "2012-10-30"
    },
    {
        "id": "r445",
        "reponame": "r445",
        "star": 47,
        "watch": 44,
        "score": 0.87,
        "data": "2018-07-01"
    },
    {
        "id": "r446",
        "reponame": "r446",
        "star": 83,
        "watch": 97,
        "score": 0.42,
        "data": "2013-05-24"
    },
    {
        "id": "r447",
        "reponame": "r447",
        "star": 54,
        "watch": 94,
        "score": 0.31,
        "data": "2018-07-21"
    },
    {
        "id": "r448",
        "reponame": "r448",
        "star": 82,
        "watch": 19,
        "score": 0.71,
        "data": "2016-01-03"
    },
    {
        "id": "r449",
        "reponame": "r449",
        "star": 4,
        "watch": 99,
        "score": 0.86,
        "data": "2021-02-19"
    },
    {
        "id": "r450",
        "reponame": "r450",
        "star": 99,
        "watch": 81,
        "score": 0.95,
        "data": "2023-01-05"
    },
    {
        "id": "r451",
        "reponame": "r451",
        "star": 10,
        "watch": 38,
        "score": 0.37,
        "data": "2011-09-30"
    },
    {
        "id": "r452",
        "reponame": "r452",
        "star": 54,
        "watch": 89,
        "score": 0.32,
        "data": "2012-05-21"
    },
    {
        "id": "r453",
        "reponame": "r453",
        "star": 56,
        "watch": 15,
        "score": 0.27,
        "data": "2018-02-13"
    },
    {
        "id": "r454",
        "reponame": "r454",
        "star": 39,
        "watch": 20,
        "score": 0.23,
        "data": "2017-02-20"
    },
    {
        "id": "r455",
        "reponame": "r455",
        "star": 63,
        "watch": 60,
        "score": 0.11,
        "data": "2016-10-03"
    },
    {
        "id": "r456",
        "reponame": "r456",
        "star": 81,
        "watch": 8,
        "score": 0.2,
        "data": "2013-12-11"
    },
    {
        "id": "r457",
        "reponame": "r457",
        "star": 63,
        "watch": 35,
        "score": 0.45,
        "data": "2020-12-18"
    },
    {
        "id": "r458",
        "reponame": "r458",
        "star": 81,
        "watch": 64,
        "score": 0.71,
        "data": "2018-11-04"
    },
    {
        "id": "r459",
        "reponame": "r459",
        "star": 39,
        "watch": 28,
        "score": 0.57,
        "data": "2020-01-27"
    },
    {
        "id": "r460",
        "reponame": "r460",
        "star": 94,
        "watch": 95,
        "score": 0.25,
        "data": "2010-10-27"
    },
    {
        "id": "r461",
        "reponame": "r461",
        "star": 96,
        "watch": 24,
        "score": 0.78,
        "data": "2011-10-23"
    },
    {
        "id": "r462",
        "reponame": "r462",
        "star": 83,
        "watch": 96,
        "score": 0.09,
        "data": "2018-10-11"
    },
    {
        "id": "r463",
        "reponame": "r463",
        "star": 54,
        "watch": 58,
        "score": 0.66,
        "data": "2011-02-02"
    },
    {
        "id": "r464",
        "reponame": "r464",
        "star": 47,
        "watch": 10,
        "score": 0.17,
        "data": "2021-11-03"
    },
    {
        "id": "r465",
        "reponame": "r465",
        "star": 50,
        "watch": 83,
        "score": 0.81,
        "data": "2012-11-13"
    },
    {
        "id": "r466",
        "reponame": "r466",
        "star": 3,
        "watch": 84,
        "score": 0.07,
        "data": "2013-01-14"
    },
    {
        "id": "r467",
        "reponame": "r467",
        "star": 6,
        "watch": 2,
        "score": 0.1,
        "data": "2014-04-22"
    },
    {
        "id": "r468",
        "reponame": "r468",
        "star": 21,
        "watch": 29,
        "score": 0.06,
        "data": "2012-09-18"
    },
    {
        "id": "r469",
        "reponame": "r469",
        "star": 73,
        "watch": 46,
        "score": 0.9,
        "data": "2010-05-11"
    },
    {
        "id": "r470",
        "reponame": "r470",
        "star": 73,
        "watch": 66,
        "score": 0.49,
        "data": "2011-05-05"
    },
    {
        "id": "r471",
        "reponame": "r471",
        "star": 88,
        "watch": 90,
        "score": 0.56,
        "data": "2011-01-18"
    },
    {
        "id": "r472",
        "reponame": "r472",
        "star": 82,
        "watch": 83,
        "score": 0.95,
        "data": "2015-09-25"
    },
    {
        "id": "r473",
        "reponame": "r473",
        "star": 32,
        "watch": 18,
        "score": 0.96,
        "data": "2017-06-14"
    },
    {
        "id": "r474",
        "reponame": "r474",
        "star": 5,
        "watch": 81,
        "score": 0.78,
        "data": "2022-12-27"
    },
    {
        "id": "r475",
        "reponame": "r475",
        "star": 90,
        "watch": 57,
        "score": 0.85,
        "data": "2021-01-03"
    },
    {
        "id": "r476",
        "reponame": "r476",
        "star": 6,
        "watch": 76,
        "score": 0.48,
        "data": "2014-05-27"
    },
    {
        "id": "r477",
        "reponame": "r477",
        "star": 81,
        "watch": 70,
        "score": 0.67,
        "data": "2022-10-13"
    },
    {
        "id": "r478",
        "reponame": "r478",
        "star": 40,
        "watch": 38,
        "score": 0.47,
        "data": "2010-09-10"
    },
    {
        "id": "r479",
        "reponame": "r479",
        "star": 50,
        "watch": 6,
        "score": 0.04,
        "data": "2013-03-26"
    },
    {
        "id": "r480",
        "reponame": "r480",
        "star": 13,
        "watch": 68,
        "score": 0.74,
        "data": "2013-12-01"
    },
    {
        "id": "r481",
        "reponame": "r481",
        "star": 14,
        "watch": 1,
        "score": 0.68,
        "data": "2022-07-24"
    },
    {
        "id": "r482",
        "reponame": "r482",
        "star": 59,
        "watch": 95,
        "score": 0.05,
        "data": "2021-03-05"
    },
    {
        "id": "r483",
        "reponame": "r483",
        "star": 87,
        "watch": 81,
        "score": 0.69,
        "data": "2010-10-29"
    },
    {
        "id": "r484",
        "reponame": "r484",
        "star": 54,
        "watch": 74,
        "score": 0.3,
        "data": "2019-02-10"
    },
    {
        "id": "r485",
        "reponame": "r485",
        "star": 45,
        "watch": 36,
        "score": 0.82,
        "data": "2022-02-10"
    },
    {
        "id": "r486",
        "reponame": "r486",
        "star": 76,
        "watch": 92,
        "score": 0.49,
        "data": "2019-09-09"
    },
    {
        "id": "r487",
        "reponame": "r487",
        "star": 61,
        "watch": 63,
        "score": 0.81,
        "data": "2022-03-16"
    },
    {
        "id": "r488",
        "reponame": "r488",
        "star": 30,
        "watch": 28,
        "score": 0.77,
        "data": "2014-04-13"
    },
    {
        "id": "r489",
        "reponame": "r489",
        "star": 35,
        "watch": 15,
        "score": 0.89,
        "data": "2017-02-08"
    },
    {
        "id": "r490",
        "reponame": "r490",
        "star": 70,
        "watch": 42,
        "score": 0.35,
        "data": "2010-12-09"
    },
    {
        "id": "r491",
        "reponame": "r491",
        "star": 7,
        "watch": 93,
        "score": 0.39,
        "data": "2012-02-12"
    },
    {
        "id": "r492",
        "reponame": "r492",
        "star": 61,
        "watch": 67,
        "score": 0.13,
        "data": "2013-08-28"
    },
    {
        "id": "r493",
        "reponame": "r493",
        "star": 79,
        "watch": 41,
        "score": 0.03,
        "data": "2014-03-02"
    },
    {
        "id": "r494",
        "reponame": "r494",
        "star": 61,
        "watch": 96,
        "score": 0.1,
        "data": "2016-08-21"
    },
    {
        "id": "r495",
        "reponame": "r495",
        "star": 1,
        "watch": 11,
        "score": 0.52,
        "data": "2017-06-20"
    },
    {
        "id": "r496",
        "reponame": "r496",
        "star": 68,
        "watch": 36,
        "score": 0.08,
        "data": "2020-08-13"
    },
    {
        "id": "r497",
        "reponame": "r497",
        "star": 36,
        "watch": 99,
        "score": 0.69,
        "data": "2012-11-22"
    },
    {
        "id": "r498",
        "reponame": "r498",
        "star": 39,
        "watch": 45,
        "score": 0.54,
        "data": "2013-09-18"
    },
    {
        "id": "r499",
        "reponame": "r499",
        "star": 21,
        "watch": 79,
        "score": 0.64,
        "data": "2015-03-18"
    },
    {
        "id": "r500",
        "reponame": "r500",
        "star": 53,
        "watch": 92,
        "score": 0.6,
        "data": "2015-11-28"
    },
    {
        "id": "r501",
        "reponame": "r501",
        "star": 37,
        "watch": 74,
        "score": 0.65,
        "data": "2021-10-21"
    },
    {
        "id": "r502",
        "reponame": "r502",
        "star": 78,
        "watch": 28,
        "score": 0.56,
        "data": "2014-05-19"
    },
    {
        "id": "r503",
        "reponame": "r503",
        "star": 18,
        "watch": 22,
        "score": 0.01,
        "data": "2015-12-22"
    },
    {
        "id": "r504",
        "reponame": "r504",
        "star": 76,
        "watch": 29,
        "score": 0.14,
        "data": "2011-01-20"
    },
    {
        "id": "r505",
        "reponame": "r505",
        "star": 85,
        "watch": 90,
        "score": 0.69,
        "data": "2017-03-23"
    },
    {
        "id": "r506",
        "reponame": "r506",
        "star": 15,
        "watch": 61,
        "score": 0.92,
        "data": "2013-10-02"
    },
    {
        "id": "r507",
        "reponame": "r507",
        "star": 50,
        "watch": 97,
        "score": 0.15,
        "data": "2019-09-19"
    },
    {
        "id": "r508",
        "reponame": "r508",
        "star": 83,
        "watch": 44,
        "score": 0.52,
        "data": "2016-04-19"
    },
    {
        "id": "r509",
        "reponame": "r509",
        "star": 25,
        "watch": 47,
        "score": 0.05,
        "data": "2012-12-28"
    },
    {
        "id": "r510",
        "reponame": "r510",
        "star": 86,
        "watch": 34,
        "score": 0.7,
        "data": "2021-02-05"
    },
    {
        "id": "r511",
        "reponame": "r511",
        "star": 82,
        "watch": 31,
        "score": 0.91,
        "data": "2012-04-11"
    },
    {
        "id": "r512",
        "reponame": "r512",
        "star": 57,
        "watch": 51,
        "score": 0.67,
        "data": "2021-07-08"
    },
    {
        "id": "r513",
        "reponame": "r513",
        "star": 53,
        "watch": 36,
        "score": 0.31,
        "data": "2018-11-20"
    },
    {
        "id": "r514",
        "reponame": "r514",
        "star": 17,
        "watch": 18,
        "score": 0.9,
        "data": "2022-11-05"
    },
    {
        "id": "r515",
        "reponame": "r515",
        "star": 6,
        "watch": 8,
        "score": 0.37,
        "data": "2016-03-10"
    },
    {
        "id": "r516",
        "reponame": "r516",
        "star": 51,
        "watch": 71,
        "score": 0.9,
        "data": "2014-04-02"
    },
    {
        "id": "r517",
        "reponame": "r517",
        "star": 57,
        "watch": 64,
        "score": 0.12,
        "data": "2012-11-30"
    },
    {
        "id": "r518",
        "reponame": "r518",
        "star": 18,
        "watch": 50,
        "score": 0.53,
        "data": "2014-01-01"
    },
    {
        "id": "r519",
        "reponame": "r519",
        "star": 75,
        "watch": 37,
        "score": 0.86,
        "data": "2017-08-10"
    },
    {
        "id": "r520",
        "reponame": "r520",
        "star": 63,
        "watch": 73,
        "score": 0.99,
        "data": "2011-01-26"
    },
    {
        "id": "r521",
        "reponame": "r521",
        "star": 95,
        "watch": 32,
        "score": 0.02,
        "data": "2021-11-05"
    },
    {
        "id": "r522",
        "reponame": "r522",
        "star": 99,
        "watch": 32,
        "score": 0.21,
        "data": "2010-12-21"
    },
    {
        "id": "r523",
        "reponame": "r523",
        "star": 52,
        "watch": 47,
        "score": 0.85,
        "data": "2017-11-30"
    },
    {
        "id": "r524",
        "reponame": "r524",
        "star": 89,
        "watch": 95,
        "score": 0.24,
        "data": "2020-08-31"
    },
    {
        "id": "r525",
        "reponame": "r525",
        "star": 14,
        "watch": 14,
        "score": 0.15,
        "data": "2018-02-25"
    },
    {
        "id": "r526",
        "reponame": "r526",
        "star": 98,
        "watch": 37,
        "score": 0.83,
        "data": "2010-10-13"
    },
    {
        "id": "r527",
        "reponame": "r527",
        "star": 63,
        "watch": 5,
        "score": 0.64,
        "data": "2015-03-10"
    },
    {
        "id": "r528",
        "reponame": "r528",
        "star": 9,
        "watch": 73,
        "score": 0.56,
        "data": "2015-02-06"
    },
    {
        "id": "r529",
        "reponame": "r529",
        "star": 49,
        "watch": 22,
        "score": 0.87,
        "data": "2021-03-30"
    },
    {
        "id": "r530",
        "reponame": "r530",
        "star": 82,
        "watch": 2,
        "score": 0.47,
        "data": "2011-07-28"
    },
    {
        "id": "r531",
        "reponame": "r531",
        "star": 25,
        "watch": 17,
        "score": 0.11,
        "data": "2018-09-23"
    },
    {
        "id": "r532",
        "reponame": "r532",
        "star": 33,
        "watch": 76,
        "score": 0.38,
        "data": "2018-07-15"
    },
    {
        "id": "r533",
        "reponame": "r533",
        "star": 4,
        "watch": 66,
        "score": 0.45,
        "data": "2014-11-13"
    },
    {
        "id": "r534",
        "reponame": "r534",
        "star": 6,
        "watch": 32,
        "score": 0.65,
        "data": "2016-04-30"
    },
    {
        "id": "r535",
        "reponame": "r535",
        "star": 29,
        "watch": 20,
        "score": 0.94,
        "data": "2013-03-31"
    },
    {
        "id": "r536",
        "reponame": "r536",
        "star": 49,
        "watch": 72,
        "score": 0.26,
        "data": "2010-05-17"
    },
    {
        "id": "r537",
        "reponame": "r537",
        "star": 12,
        "watch": 78,
        "score": 0.64,
        "data": "2022-03-03"
    },
    {
        "id": "r538",
        "reponame": "r538",
        "star": 82,
        "watch": 27,
        "score": 0.43,
        "data": "2018-12-12"
    },
    {
        "id": "r539",
        "reponame": "r539",
        "star": 82,
        "watch": 42,
        "score": 0.39,
        "data": "2013-07-23"
    },
    {
        "id": "r540",
        "reponame": "r540",
        "star": 15,
        "watch": 79,
        "score": 0.05,
        "data": "2013-10-04"
    },
    {
        "id": "r541",
        "reponame": "r541",
        "star": 6,
        "watch": 32,
        "score": 0.42,
        "data": "2013-11-10"
    },
    {
        "id": "r542",
        "reponame": "r542",
        "star": 95,
        "watch": 9,
        "score": 0.46,
        "data": "2016-06-09"
    },
    {
        "id": "r543",
        "reponame": "r543",
        "star": 36,
        "watch": 37,
        "score": 0.04,
        "data": "2013-12-30"
    },
    {
        "id": "r544",
        "reponame": "r544",
        "star": 46,
        "watch": 12,
        "score": 0.04,
        "data": "2010-05-07"
    },
    {
        "id": "r545",
        "reponame": "r545",
        "star": 7,
        "watch": 94,
        "score": 0.86,
        "data": "2020-11-05"
    },
    {
        "id": "r546",
        "reponame": "r546",
        "star": 53,
        "watch": 8,
        "score": 0.7,
        "data": "2015-12-06"
    },
    {
        "id": "r547",
        "reponame": "r547",
        "star": 23,
        "watch": 28,
        "score": 0.25,
        "data": "2022-03-11"
    },
    {
        "id": "r548",
        "reponame": "r548",
        "star": 27,
        "watch": 21,
        "score": 0.89,
        "data": "2014-03-22"
    },
    {
        "id": "r549",
        "reponame": "r549",
        "star": 5,
        "watch": 77,
        "score": 0.96,
        "data": "2015-07-24"
    },
    {
        "id": "r550",
        "reponame": "r550",
        "star": 68,
        "watch": 95,
        "score": 0.98,
        "data": "2018-08-10"
    },
    {
        "id": "r551",
        "reponame": "r551",
        "star": 51,
        "watch": 53,
        "score": 0.98,
        "data": "2019-09-27"
    },
    {
        "id": "r552",
        "reponame": "r552",
        "star": 83,
        "watch": 45,
        "score": 0.72,
        "data": "2021-05-16"
    },
    {
        "id": "r553",
        "reponame": "r553",
        "star": 68,
        "watch": 96,
        "score": 0.72,
        "data": "2010-07-07"
    },
    {
        "id": "r554",
        "reponame": "r554",
        "star": 93,
        "watch": 25,
        "score": 0.15,
        "data": "2017-08-24"
    },
    {
        "id": "r555",
        "reponame": "r555",
        "star": 10,
        "watch": 88,
        "score": 0.12,
        "data": "2018-12-08"
    },
    {
        "id": "r556",
        "reponame": "r556",
        "star": 77,
        "watch": 60,
        "score": 0.21,
        "data": "2012-12-23"
    },
    {
        "id": "r557",
        "reponame": "r557",
        "star": 27,
        "watch": 15,
        "score": 0.3,
        "data": "2022-01-14"
    },
    {
        "id": "r558",
        "reponame": "r558",
        "star": 61,
        "watch": 90,
        "score": 0.05,
        "data": "2016-04-22"
    },
    {
        "id": "r559",
        "reponame": "r559",
        "star": 100,
        "watch": 56,
        "score": 0.21,
        "data": "2015-09-26"
    },
    {
        "id": "r560",
        "reponame": "r560",
        "star": 53,
        "watch": 82,
        "score": 0.51,
        "data": "2012-11-14"
    },
    {
        "id": "r561",
        "reponame": "r561",
        "star": 31,
        "watch": 37,
        "score": 0.7,
        "data": "2020-07-19"
    },
    {
        "id": "r562",
        "reponame": "r562",
        "star": 35,
        "watch": 55,
        "score": 0.58,
        "data": "2017-12-02"
    },
    {
        "id": "r563",
        "reponame": "r563",
        "star": 77,
        "watch": 13,
        "score": 0.62,
        "data": "2021-12-26"
    },
    {
        "id": "r564",
        "reponame": "r564",
        "star": 85,
        "watch": 42,
        "score": 0.24,
        "data": "2010-08-04"
    },
    {
        "id": "r565",
        "reponame": "r565",
        "star": 98,
        "watch": 57,
        "score": 0.84,
        "data": "2010-09-22"
    },
    {
        "id": "r566",
        "reponame": "r566",
        "star": 77,
        "watch": 75,
        "score": 0.67,
        "data": "2013-07-18"
    },
    {
        "id": "r567",
        "reponame": "r567",
        "star": 36,
        "watch": 63,
        "score": 0.79,
        "data": "2022-12-03"
    },
    {
        "id": "r568",
        "reponame": "r568",
        "star": 33,
        "watch": 76,
        "score": 0.64,
        "data": "2015-02-13"
    },
    {
        "id": "r569",
        "reponame": "r569",
        "star": 8,
        "watch": 62,
        "score": 0.82,
        "data": "2011-07-08"
    },
    {
        "id": "r570",
        "reponame": "r570",
        "star": 15,
        "watch": 58,
        "score": 0.33,
        "data": "2014-11-10"
    },
    {
        "id": "r571",
        "reponame": "r571",
        "star": 23,
        "watch": 54,
        "score": 0.3,
        "data": "2014-12-02"
    },
    {
        "id": "r572",
        "reponame": "r572",
        "star": 8,
        "watch": 1,
        "score": 0.19,
        "data": "2020-07-06"
    },
    {
        "id": "r573",
        "reponame": "r573",
        "star": 70,
        "watch": 37,
        "score": 0.87,
        "data": "2020-03-31"
    },
    {
        "id": "r574",
        "reponame": "r574",
        "star": 32,
        "watch": 93,
        "score": 0.44,
        "data": "2021-04-20"
    },
    {
        "id": "r575",
        "reponame": "r575",
        "star": 44,
        "watch": 64,
        "score": 0.66,
        "data": "2013-10-19"
    },
    {
        "id": "r576",
        "reponame": "r576",
        "star": 14,
        "watch": 30,
        "score": 0.08,
        "data": "2019-06-05"
    },
    {
        "id": "r577",
        "reponame": "r577",
        "star": 13,
        "watch": 16,
        "score": 0.19,
        "data": "2012-11-27"
    },
    {
        "id": "r578",
        "reponame": "r578",
        "star": 31,
        "watch": 17,
        "score": 0.62,
        "data": "2022-01-23"
    },
    {
        "id": "r579",
        "reponame": "r579",
        "star": 82,
        "watch": 93,
        "score": 0.36,
        "data": "2015-08-07"
    },
    {
        "id": "r580",
        "reponame": "r580",
        "star": 42,
        "watch": 73,
        "score": 0.48,
        "data": "2010-01-13"
    },
    {
        "id": "r581",
        "reponame": "r581",
        "star": 75,
        "watch": 2,
        "score": 0.15,
        "data": "2016-06-11"
    },
    {
        "id": "r582",
        "reponame": "r582",
        "star": 87,
        "watch": 95,
        "score": 0.52,
        "data": "2017-11-04"
    },
    {
        "id": "r583",
        "reponame": "r583",
        "star": 7,
        "watch": 88,
        "score": 0.65,
        "data": "2014-02-16"
    },
    {
        "id": "r584",
        "reponame": "r584",
        "star": 9,
        "watch": 16,
        "score": 0.41,
        "data": "2010-07-27"
    },
    {
        "id": "r585",
        "reponame": "r585",
        "star": 7,
        "watch": 82,
        "score": 0.29,
        "data": "2013-09-30"
    },
    {
        "id": "r586",
        "reponame": "r586",
        "star": 92,
        "watch": 82,
        "score": 0.28,
        "data": "2022-08-05"
    },
    {
        "id": "r587",
        "reponame": "r587",
        "star": 52,
        "watch": 30,
        "score": 0.62,
        "data": "2015-12-25"
    },
    {
        "id": "r588",
        "reponame": "r588",
        "star": 28,
        "watch": 56,
        "score": 0.52,
        "data": "2012-08-17"
    },
    {
        "id": "r589",
        "reponame": "r589",
        "star": 84,
        "watch": 85,
        "score": 0.01,
        "data": "2012-11-23"
    },
    {
        "id": "r590",
        "reponame": "r590",
        "star": 4,
        "watch": 88,
        "score": 0.05,
        "data": "2016-09-09"
    },
    {
        "id": "r591",
        "reponame": "r591",
        "star": 88,
        "watch": 7,
        "score": 0.99,
        "data": "2013-06-05"
    },
    {
        "id": "r592",
        "reponame": "r592",
        "star": 37,
        "watch": 45,
        "score": 0.98,
        "data": "2012-12-27"
    },
    {
        "id": "r593",
        "reponame": "r593",
        "star": 31,
        "watch": 89,
        "score": 0.28,
        "data": "2012-01-02"
    },
    {
        "id": "r594",
        "reponame": "r594",
        "star": 90,
        "watch": 16,
        "score": 0.06,
        "data": "2022-01-22"
    },
    {
        "id": "r595",
        "reponame": "r595",
        "star": 30,
        "watch": 44,
        "score": 0.32,
        "data": "2021-01-23"
    },
    {
        "id": "r596",
        "reponame": "r596",
        "star": 76,
        "watch": 62,
        "score": 0.79,
        "data": "2021-07-13"
    },
    {
        "id": "r597",
        "reponame": "r597",
        "star": 68,
        "watch": 83,
        "score": 0.4,
        "data": "2014-12-01"
    },
    {
        "id": "r598",
        "reponame": "r598",
        "star": 88,
        "watch": 29,
        "score": 0.13,
        "data": "2015-09-17"
    },
    {
        "id": "r599",
        "reponame": "r599",
        "star": 52,
        "watch": 34,
        "score": 0.09,
        "data": "2010-09-10"
    },
    {
        "id": "r600",
        "reponame": "r600",
        "star": 41,
        "watch": 23,
        "score": 0.55,
        "data": "2017-02-25"
    },
    {
        "id": "r601",
        "reponame": "r601",
        "star": 38,
        "watch": 1,
        "score": 0.28,
        "data": "2011-04-18"
    },
    {
        "id": "r602",
        "reponame": "r602",
        "star": 23,
        "watch": 4,
        "score": 0.14,
        "data": "2012-12-05"
    },
    {
        "id": "r603",
        "reponame": "r603",
        "star": 57,
        "watch": 68,
        "score": 0.84,
        "data": "2020-12-11"
    },
    {
        "id": "r604",
        "reponame": "r604",
        "star": 89,
        "watch": 88,
        "score": 0.32,
        "data": "2022-12-20"
    },
    {
        "id": "r605",
        "reponame": "r605",
        "star": 4,
        "watch": 74,
        "score": 0.08,
        "data": "2016-02-03"
    },
    {
        "id": "r606",
        "reponame": "r606",
        "star": 5,
        "watch": 96,
        "score": 0.42,
        "data": "2022-06-07"
    },
    {
        "id": "r607",
        "reponame": "r607",
        "star": 21,
        "watch": 55,
        "score": 0.73,
        "data": "2022-06-12"
    },
    {
        "id": "r608",
        "reponame": "r608",
        "star": 5,
        "watch": 55,
        "score": 0.6,
        "data": "2011-05-15"
    },
    {
        "id": "r609",
        "reponame": "r609",
        "star": 89,
        "watch": 70,
        "score": 0.38,
        "data": "2016-01-04"
    },
    {
        "id": "r610",
        "reponame": "r610",
        "star": 34,
        "watch": 63,
        "score": 0.84,
        "data": "2014-10-26"
    },
    {
        "id": "r611",
        "reponame": "r611",
        "star": 84,
        "watch": 53,
        "score": 0.32,
        "data": "2019-12-06"
    },
    {
        "id": "r612",
        "reponame": "r612",
        "star": 23,
        "watch": 66,
        "score": 0.85,
        "data": "2011-05-22"
    },
    {
        "id": "r613",
        "reponame": "r613",
        "star": 5,
        "watch": 83,
        "score": 0.81,
        "data": "2018-12-31"
    },
    {
        "id": "r614",
        "reponame": "r614",
        "star": 68,
        "watch": 10,
        "score": 0.31,
        "data": "2018-05-11"
    },
    {
        "id": "r615",
        "reponame": "r615",
        "star": 47,
        "watch": 80,
        "score": 0.51,
        "data": "2014-04-08"
    },
    {
        "id": "r616",
        "reponame": "r616",
        "star": 52,
        "watch": 94,
        "score": 0.41,
        "data": "2013-02-11"
    },
    {
        "id": "r617",
        "reponame": "r617",
        "star": 38,
        "watch": 21,
        "score": 0.37,
        "data": "2015-02-28"
    },
    {
        "id": "r618",
        "reponame": "r618",
        "star": 30,
        "watch": 84,
        "score": 0.73,
        "data": "2014-07-14"
    },
    {
        "id": "r619",
        "reponame": "r619",
        "star": 33,
        "watch": 63,
        "score": 0.91,
        "data": "2013-09-28"
    },
    {
        "id": "r620",
        "reponame": "r620",
        "star": 78,
        "watch": 6,
        "score": 0.8,
        "data": "2020-09-02"
    },
    {
        "id": "r621",
        "reponame": "r621",
        "star": 89,
        "watch": 70,
        "score": 0.17,
        "data": "2011-12-06"
    },
    {
        "id": "r622",
        "reponame": "r622",
        "star": 23,
        "watch": 79,
        "score": 0.6,
        "data": "2019-10-15"
    },
    {
        "id": "r623",
        "reponame": "r623",
        "star": 4,
        "watch": 67,
        "score": 0.66,
        "data": "2019-08-13"
    },
    {
        "id": "r624",
        "reponame": "r624",
        "star": 47,
        "watch": 62,
        "score": 0.64,
        "data": "2014-11-11"
    },
    {
        "id": "r625",
        "reponame": "r625",
        "star": 31,
        "watch": 1,
        "score": 0.46,
        "data": "2018-09-01"
    },
    {
        "id": "r626",
        "reponame": "r626",
        "star": 94,
        "watch": 60,
        "score": 0.52,
        "data": "2016-07-31"
    },
    {
        "id": "r627",
        "reponame": "r627",
        "star": 68,
        "watch": 32,
        "score": 0.62,
        "data": "2010-04-07"
    },
    {
        "id": "r628",
        "reponame": "r628",
        "star": 46,
        "watch": 52,
        "score": 0.9,
        "data": "2017-06-10"
    },
    {
        "id": "r629",
        "reponame": "r629",
        "star": 16,
        "watch": 35,
        "score": 0.7,
        "data": "2022-01-28"
    },
    {
        "id": "r630",
        "reponame": "r630",
        "star": 26,
        "watch": 64,
        "score": 0.73,
        "data": "2017-05-13"
    },
    {
        "id": "r631",
        "reponame": "r631",
        "star": 97,
        "watch": 51,
        "score": 0.93,
        "data": "2013-03-03"
    },
    {
        "id": "r632",
        "reponame": "r632",
        "star": 91,
        "watch": 69,
        "score": 0.65,
        "data": "2016-07-10"
    },
    {
        "id": "r633",
        "reponame": "r633",
        "star": 87,
        "watch": 70,
        "score": 0.03,
        "data": "2018-07-28"
    },
    {
        "id": "r634",
        "reponame": "r634",
        "star": 56,
        "watch": 88,
        "score": 0.18,
        "data": "2021-06-10"
    },
    {
        "id": "r635",
        "reponame": "r635",
        "star": 72,
        "watch": 0,
        "score": 0.77,
        "data": "2013-03-05"
    },
    {
        "id": "r636",
        "reponame": "r636",
        "star": 40,
        "watch": 3,
        "score": 0.79,
        "data": "2010-09-06"
    },
    {
        "id": "r637",
        "reponame": "r637",
        "star": 66,
        "watch": 93,
        "score": 0.88,
        "data": "2011-01-03"
    },
    {
        "id": "r638",
        "reponame": "r638",
        "star": 26,
        "watch": 62,
        "score": 0.78,
        "data": "2011-03-01"
    },
    {
        "id": "r639",
        "reponame": "r639",
        "star": 88,
        "watch": 90,
        "score": 0.48,
        "data": "2022-02-13"
    },
    {
        "id": "r640",
        "reponame": "r640",
        "star": 22,
        "watch": 15,
        "score": 0.25,
        "data": "2013-11-17"
    },
    {
        "id": "r641",
        "reponame": "r641",
        "star": 68,
        "watch": 25,
        "score": 0.92,
        "data": "2016-05-30"
    },
    {
        "id": "r642",
        "reponame": "r642",
        "star": 87,
        "watch": 12,
        "score": 0.78,
        "data": "2016-10-06"
    },
    {
        "id": "r643",
        "reponame": "r643",
        "star": 91,
        "watch": 13,
        "score": 0.59,
        "data": "2010-01-07"
    },
    {
        "id": "r644",
        "reponame": "r644",
        "star": 85,
        "watch": 11,
        "score": 0.18,
        "data": "2014-06-10"
    },
    {
        "id": "r645",
        "reponame": "r645",
        "star": 78,
        "watch": 14,
        "score": 0.9,
        "data": "2017-03-17"
    },
    {
        "id": "r646",
        "reponame": "r646",
        "star": 86,
        "watch": 74,
        "score": 0.97,
        "data": "2014-01-04"
    },
    {
        "id": "r647",
        "reponame": "r647",
        "star": 91,
        "watch": 21,
        "score": 0.84,
        "data": "2013-05-29"
    },
    {
        "id": "r648",
        "reponame": "r648",
        "star": 68,
        "watch": 10,
        "score": 0.8,
        "data": "2015-06-10"
    },
    {
        "id": "r649",
        "reponame": "r649",
        "star": 33,
        "watch": 55,
        "score": 0.52,
        "data": "2022-01-15"
    },
    {
        "id": "r650",
        "reponame": "r650",
        "star": 26,
        "watch": 83,
        "score": 0.94,
        "data": "2017-07-08"
    },
    {
        "id": "r651",
        "reponame": "r651",
        "star": 27,
        "watch": 6,
        "score": 0.58,
        "data": "2022-08-25"
    },
    {
        "id": "r652",
        "reponame": "r652",
        "star": 19,
        "watch": 4,
        "score": 0.29,
        "data": "2019-01-03"
    },
    {
        "id": "r653",
        "reponame": "r653",
        "star": 18,
        "watch": 54,
        "score": 0.72,
        "data": "2011-12-27"
    },
    {
        "id": "r654",
        "reponame": "r654",
        "star": 33,
        "watch": 100,
        "score": 0.47,
        "data": "2020-06-09"
    },
    {
        "id": "r655",
        "reponame": "r655",
        "star": 64,
        "watch": 100,
        "score": 0.22,
        "data": "2019-01-13"
    },
    {
        "id": "r656",
        "reponame": "r656",
        "star": 29,
        "watch": 63,
        "score": 0.17,
        "data": "2022-10-11"
    },
    {
        "id": "r657",
        "reponame": "r657",
        "star": 23,
        "watch": 94,
        "score": 0.7,
        "data": "2011-07-25"
    },
    {
        "id": "r658",
        "reponame": "r658",
        "star": 91,
        "watch": 20,
        "score": 0.65,
        "data": "2010-07-21"
    },
    {
        "id": "r659",
        "reponame": "r659",
        "star": 94,
        "watch": 79,
        "score": 0.9,
        "data": "2019-07-03"
    },
    {
        "id": "r660",
        "reponame": "r660",
        "star": 27,
        "watch": 12,
        "score": 0.82,
        "data": "2013-04-18"
    },
    {
        "id": "r661",
        "reponame": "r661",
        "star": 20,
        "watch": 97,
        "score": 0.23,
        "data": "2017-12-25"
    },
    {
        "id": "r662",
        "reponame": "r662",
        "star": 5,
        "watch": 49,
        "score": 0.74,
        "data": "2019-06-24"
    },
    {
        "id": "r663",
        "reponame": "r663",
        "star": 64,
        "watch": 84,
        "score": 0.98,
        "data": "2021-11-16"
    },
    {
        "id": "r664",
        "reponame": "r664",
        "star": 0,
        "watch": 49,
        "score": 0.44,
        "data": "2019-04-30"
    },
    {
        "id": "r665",
        "reponame": "r665",
        "star": 52,
        "watch": 14,
        "score": 0.58,
        "data": "2015-12-05"
    },
    {
        "id": "r666",
        "reponame": "r666",
        "star": 99,
        "watch": 87,
        "score": 0.86,
        "data": "2018-08-03"
    },
    {
        "id": "r667",
        "reponame": "r667",
        "star": 59,
        "watch": 24,
        "score": 0.73,
        "data": "2011-07-03"
    },
    {
        "id": "r668",
        "reponame": "r668",
        "star": 1,
        "watch": 36,
        "score": 0.12,
        "data": "2013-08-31"
    },
    {
        "id": "r669",
        "reponame": "r669",
        "star": 14,
        "watch": 77,
        "score": 0.02,
        "data": "2011-01-26"
    },
    {
        "id": "r670",
        "reponame": "r670",
        "star": 49,
        "watch": 16,
        "score": 0.41,
        "data": "2019-10-09"
    },
    {
        "id": "r671",
        "reponame": "r671",
        "star": 72,
        "watch": 67,
        "score": 0.72,
        "data": "2011-03-07"
    },
    {
        "id": "r672",
        "reponame": "r672",
        "star": 47,
        "watch": 64,
        "score": 0.29,
        "data": "2021-05-09"
    },
    {
        "id": "r673",
        "reponame": "r673",
        "star": 97,
        "watch": 40,
        "score": 0.24,
        "data": "2015-09-19"
    },
    {
        "id": "r674",
        "reponame": "r674",
        "star": 48,
        "watch": 38,
        "score": 0.96,
        "data": "2013-01-07"
    },
    {
        "id": "r675",
        "reponame": "r675",
        "star": 15,
        "watch": 8,
        "score": 0.8,
        "data": "2020-01-10"
    },
    {
        "id": "r676",
        "reponame": "r676",
        "star": 98,
        "watch": 48,
        "score": 0.4,
        "data": "2012-06-03"
    },
    {
        "id": "r677",
        "reponame": "r677",
        "star": 19,
        "watch": 71,
        "score": 0.87,
        "data": "2020-05-03"
    },
    {
        "id": "r678",
        "reponame": "r678",
        "star": 78,
        "watch": 15,
        "score": 0.69,
        "data": "2021-08-20"
    },
    {
        "id": "r679",
        "reponame": "r679",
        "star": 30,
        "watch": 57,
        "score": 0.59,
        "data": "2020-06-06"
    },
    {
        "id": "r680",
        "reponame": "r680",
        "star": 29,
        "watch": 65,
        "score": 0.12,
        "data": "2010-04-04"
    },
    {
        "id": "r681",
        "reponame": "r681",
        "star": 8,
        "watch": 4,
        "score": 0.82,
        "data": "2017-10-14"
    },
    {
        "id": "r682",
        "reponame": "r682",
        "star": 18,
        "watch": 35,
        "score": 0.37,
        "data": "2019-04-04"
    },
    {
        "id": "r683",
        "reponame": "r683",
        "star": 62,
        "watch": 48,
        "score": 0.06,
        "data": "2019-02-09"
    },
    {
        "id": "r684",
        "reponame": "r684",
        "star": 14,
        "watch": 37,
        "score": 0.65,
        "data": "2014-02-03"
    },
    {
        "id": "r685",
        "reponame": "r685",
        "star": 21,
        "watch": 95,
        "score": 0.87,
        "data": "2014-09-08"
    },
    {
        "id": "r686",
        "reponame": "r686",
        "star": 38,
        "watch": 89,
        "score": 0.06,
        "data": "2018-12-14"
    },
    {
        "id": "r687",
        "reponame": "r687",
        "star": 61,
        "watch": 71,
        "score": 0.74,
        "data": "2012-04-26"
    },
    {
        "id": "r688",
        "reponame": "r688",
        "star": 37,
        "watch": 63,
        "score": 0.56,
        "data": "2022-04-06"
    },
    {
        "id": "r689",
        "reponame": "r689",
        "star": 24,
        "watch": 63,
        "score": 0.13,
        "data": "2020-10-08"
    },
    {
        "id": "r690",
        "reponame": "r690",
        "star": 16,
        "watch": 22,
        "score": 0.8,
        "data": "2011-04-28"
    },
    {
        "id": "r691",
        "reponame": "r691",
        "star": 73,
        "watch": 66,
        "score": 0.53,
        "data": "2020-08-06"
    },
    {
        "id": "r692",
        "reponame": "r692",
        "star": 45,
        "watch": 29,
        "score": 0.81,
        "data": "2016-09-11"
    },
    {
        "id": "r693",
        "reponame": "r693",
        "star": 14,
        "watch": 48,
        "score": 0.13,
        "data": "2015-09-07"
    },
    {
        "id": "r694",
        "reponame": "r694",
        "star": 6,
        "watch": 93,
        "score": 0.89,
        "data": "2020-09-03"
    },
    {
        "id": "r695",
        "reponame": "r695",
        "star": 89,
        "watch": 67,
        "score": 0.43,
        "data": "2011-02-07"
    },
    {
        "id": "r696",
        "reponame": "r696",
        "star": 53,
        "watch": 23,
        "score": 0.71,
        "data": "2021-03-22"
    },
    {
        "id": "r697",
        "reponame": "r697",
        "star": 8,
        "watch": 22,
        "score": 0.73,
        "data": "2015-08-25"
    },
    {
        "id": "r698",
        "reponame": "r698",
        "star": 41,
        "watch": 55,
        "score": 0.46,
        "data": "2022-10-03"
    },
    {
        "id": "r699",
        "reponame": "r699",
        "star": 51,
        "watch": 6,
        "score": 0,
        "data": "2013-09-27"
    },
    {
        "id": "r700",
        "reponame": "r700",
        "star": 20,
        "watch": 55,
        "score": 0.16,
        "data": "2018-09-06"
    },
    {
        "id": "r701",
        "reponame": "r701",
        "star": 65,
        "watch": 46,
        "score": 0.94,
        "data": "2018-11-20"
    },
    {
        "id": "r702",
        "reponame": "r702",
        "star": 38,
        "watch": 70,
        "score": 0.16,
        "data": "2014-03-20"
    },
    {
        "id": "r703",
        "reponame": "r703",
        "star": 94,
        "watch": 39,
        "score": 0.7,
        "data": "2013-05-21"
    },
    {
        "id": "r704",
        "reponame": "r704",
        "star": 67,
        "watch": 78,
        "score": 0.91,
        "data": "2022-08-09"
    },
    {
        "id": "r705",
        "reponame": "r705",
        "star": 81,
        "watch": 65,
        "score": 0.2,
        "data": "2011-07-09"
    },
    {
        "id": "r706",
        "reponame": "r706",
        "star": 99,
        "watch": 19,
        "score": 0.79,
        "data": "2017-12-17"
    },
    {
        "id": "r707",
        "reponame": "r707",
        "star": 35,
        "watch": 60,
        "score": 0.28,
        "data": "2017-01-04"
    },
    {
        "id": "r708",
        "reponame": "r708",
        "star": 53,
        "watch": 39,
        "score": 0.87,
        "data": "2010-08-29"
    },
    {
        "id": "r709",
        "reponame": "r709",
        "star": 85,
        "watch": 88,
        "score": 0.18,
        "data": "2015-11-04"
    },
    {
        "id": "r710",
        "reponame": "r710",
        "star": 69,
        "watch": 92,
        "score": 0.39,
        "data": "2013-10-06"
    },
    {
        "id": "r711",
        "reponame": "r711",
        "star": 34,
        "watch": 27,
        "score": 0.35,
        "data": "2012-09-28"
    },
    {
        "id": "r712",
        "reponame": "r712",
        "star": 63,
        "watch": 74,
        "score": 0.33,
        "data": "2022-04-04"
    },
    {
        "id": "r713",
        "reponame": "r713",
        "star": 29,
        "watch": 49,
        "score": 0.86,
        "data": "2014-09-08"
    },
    {
        "id": "r714",
        "reponame": "r714",
        "star": 58,
        "watch": 66,
        "score": 0.29,
        "data": "2017-04-19"
    },
    {
        "id": "r715",
        "reponame": "r715",
        "star": 72,
        "watch": 94,
        "score": 0.56,
        "data": "2019-07-17"
    },
    {
        "id": "r716",
        "reponame": "r716",
        "star": 13,
        "watch": 98,
        "score": 0.14,
        "data": "2011-11-26"
    },
    {
        "id": "r717",
        "reponame": "r717",
        "star": 29,
        "watch": 49,
        "score": 0.29,
        "data": "2018-11-10"
    },
    {
        "id": "r718",
        "reponame": "r718",
        "star": 27,
        "watch": 69,
        "score": 0.52,
        "data": "2019-05-16"
    },
    {
        "id": "r719",
        "reponame": "r719",
        "star": 24,
        "watch": 73,
        "score": 0.68,
        "data": "2014-11-17"
    },
    {
        "id": "r720",
        "reponame": "r720",
        "star": 77,
        "watch": 2,
        "score": 0.97,
        "data": "2018-08-16"
    },
    {
        "id": "r721",
        "reponame": "r721",
        "star": 3,
        "watch": 67,
        "score": 0.6,
        "data": "2011-06-27"
    },
    {
        "id": "r722",
        "reponame": "r722",
        "star": 8,
        "watch": 44,
        "score": 0.52,
        "data": "2022-04-11"
    },
    {
        "id": "r723",
        "reponame": "r723",
        "star": 92,
        "watch": 49,
        "score": 0.44,
        "data": "2021-11-25"
    },
    {
        "id": "r724",
        "reponame": "r724",
        "star": 91,
        "watch": 36,
        "score": 0.86,
        "data": "2018-03-25"
    },
    {
        "id": "r725",
        "reponame": "r725",
        "star": 98,
        "watch": 93,
        "score": 0.98,
        "data": "2019-01-30"
    },
    {
        "id": "r726",
        "reponame": "r726",
        "star": 42,
        "watch": 83,
        "score": 0.6,
        "data": "2021-08-30"
    },
    {
        "id": "r727",
        "reponame": "r727",
        "star": 61,
        "watch": 42,
        "score": 0.16,
        "data": "2018-04-28"
    },
    {
        "id": "r728",
        "reponame": "r728",
        "star": 29,
        "watch": 91,
        "score": 0.32,
        "data": "2010-05-27"
    },
    {
        "id": "r729",
        "reponame": "r729",
        "star": 52,
        "watch": 12,
        "score": 0.89,
        "data": "2012-12-25"
    },
    {
        "id": "r730",
        "reponame": "r730",
        "star": 97,
        "watch": 46,
        "score": 0.07,
        "data": "2016-09-16"
    },
    {
        "id": "r731",
        "reponame": "r731",
        "star": 56,
        "watch": 63,
        "score": 0.14,
        "data": "2011-02-19"
    },
    {
        "id": "r732",
        "reponame": "r732",
        "star": 89,
        "watch": 4,
        "score": 0.29,
        "data": "2011-05-23"
    },
    {
        "id": "r733",
        "reponame": "r733",
        "star": 68,
        "watch": 76,
        "score": 0.5,
        "data": "2021-10-30"
    },
    {
        "id": "r734",
        "reponame": "r734",
        "star": 22,
        "watch": 87,
        "score": 0.83,
        "data": "2011-02-04"
    },
    {
        "id": "r735",
        "reponame": "r735",
        "star": 46,
        "watch": 37,
        "score": 0.82,
        "data": "2020-08-05"
    },
    {
        "id": "r736",
        "reponame": "r736",
        "star": 45,
        "watch": 1,
        "score": 0.05,
        "data": "2022-04-17"
    },
    {
        "id": "r737",
        "reponame": "r737",
        "star": 37,
        "watch": 76,
        "score": 0.86,
        "data": "2019-08-15"
    },
    {
        "id": "r738",
        "reponame": "r738",
        "star": 42,
        "watch": 48,
        "score": 0.1,
        "data": "2022-06-08"
    },
    {
        "id": "r739",
        "reponame": "r739",
        "star": 22,
        "watch": 81,
        "score": 0.03,
        "data": "2013-05-05"
    },
    {
        "id": "r740",
        "reponame": "r740",
        "star": 10,
        "watch": 10,
        "score": 0.13,
        "data": "2015-09-24"
    },
    {
        "id": "r741",
        "reponame": "r741",
        "star": 11,
        "watch": 20,
        "score": 0.33,
        "data": "2019-06-16"
    },
    {
        "id": "r742",
        "reponame": "r742",
        "star": 41,
        "watch": 52,
        "score": 0.36,
        "data": "2014-02-21"
    },
    {
        "id": "r743",
        "reponame": "r743",
        "star": 33,
        "watch": 40,
        "score": 0.45,
        "data": "2015-03-26"
    },
    {
        "id": "r744",
        "reponame": "r744",
        "star": 62,
        "watch": 81,
        "score": 0.83,
        "data": "2018-03-20"
    },
    {
        "id": "r745",
        "reponame": "r745",
        "star": 47,
        "watch": 29,
        "score": 0.78,
        "data": "2015-08-22"
    },
    {
        "id": "r746",
        "reponame": "r746",
        "star": 9,
        "watch": 17,
        "score": 0.34,
        "data": "2012-02-02"
    },
    {
        "id": "r747",
        "reponame": "r747",
        "star": 20,
        "watch": 8,
        "score": 0.91,
        "data": "2012-09-27"
    },
    {
        "id": "r748",
        "reponame": "r748",
        "star": 37,
        "watch": 21,
        "score": 0.46,
        "data": "2015-10-24"
    },
    {
        "id": "r749",
        "reponame": "r749",
        "star": 39,
        "watch": 89,
        "score": 0.02,
        "data": "2013-08-06"
    },
    {
        "id": "r750",
        "reponame": "r750",
        "star": 43,
        "watch": 64,
        "score": 0.98,
        "data": "2019-01-06"
    },
    {
        "id": "r751",
        "reponame": "r751",
        "star": 20,
        "watch": 84,
        "score": 0.84,
        "data": "2016-09-07"
    },
    {
        "id": "r752",
        "reponame": "r752",
        "star": 41,
        "watch": 27,
        "score": 0.94,
        "data": "2020-03-18"
    },
    {
        "id": "r753",
        "reponame": "r753",
        "star": 4,
        "watch": 65,
        "score": 0.87,
        "data": "2021-08-11"
    },
    {
        "id": "r754",
        "reponame": "r754",
        "star": 23,
        "watch": 84,
        "score": 0.16,
        "data": "2014-05-04"
    },
    {
        "id": "r755",
        "reponame": "r755",
        "star": 64,
        "watch": 76,
        "score": 0.47,
        "data": "2016-05-27"
    },
    {
        "id": "r756",
        "reponame": "r756",
        "star": 91,
        "watch": 81,
        "score": 0.02,
        "data": "2022-06-06"
    },
    {
        "id": "r757",
        "reponame": "r757",
        "star": 91,
        "watch": 58,
        "score": 0.58,
        "data": "2013-07-22"
    },
    {
        "id": "r758",
        "reponame": "r758",
        "star": 24,
        "watch": 39,
        "score": 0.58,
        "data": "2013-06-29"
    },
    {
        "id": "r759",
        "reponame": "r759",
        "star": 36,
        "watch": 32,
        "score": 0.58,
        "data": "2016-09-25"
    },
    {
        "id": "r760",
        "reponame": "r760",
        "star": 24,
        "watch": 74,
        "score": 0.1,
        "data": "2021-11-26"
    },
    {
        "id": "r761",
        "reponame": "r761",
        "star": 58,
        "watch": 18,
        "score": 0.8,
        "data": "2012-04-06"
    },
    {
        "id": "r762",
        "reponame": "r762",
        "star": 90,
        "watch": 92,
        "score": 0.2,
        "data": "2018-05-18"
    },
    {
        "id": "r763",
        "reponame": "r763",
        "star": 19,
        "watch": 99,
        "score": 0.44,
        "data": "2010-03-30"
    },
    {
        "id": "r764",
        "reponame": "r764",
        "star": 37,
        "watch": 66,
        "score": 0.27,
        "data": "2014-09-03"
    },
    {
        "id": "r765",
        "reponame": "r765",
        "star": 9,
        "watch": 32,
        "score": 0.87,
        "data": "2011-01-03"
    },
    {
        "id": "r766",
        "reponame": "r766",
        "star": 18,
        "watch": 10,
        "score": 0.67,
        "data": "2012-01-02"
    },
    {
        "id": "r767",
        "reponame": "r767",
        "star": 52,
        "watch": 9,
        "score": 0.19,
        "data": "2014-02-27"
    },
    {
        "id": "r768",
        "reponame": "r768",
        "star": 27,
        "watch": 28,
        "score": 0.02,
        "data": "2015-11-17"
    },
    {
        "id": "r769",
        "reponame": "r769",
        "star": 82,
        "watch": 42,
        "score": 0.08,
        "data": "2018-06-04"
    },
    {
        "id": "r770",
        "reponame": "r770",
        "star": 89,
        "watch": 10,
        "score": 0.43,
        "data": "2022-10-01"
    },
    {
        "id": "r771",
        "reponame": "r771",
        "star": 60,
        "watch": 82,
        "score": 0.86,
        "data": "2014-02-13"
    },
    {
        "id": "r772",
        "reponame": "r772",
        "star": 8,
        "watch": 92,
        "score": 0.94,
        "data": "2011-07-02"
    },
    {
        "id": "r773",
        "reponame": "r773",
        "star": 69,
        "watch": 9,
        "score": 0.01,
        "data": "2012-02-08"
    },
    {
        "id": "r774",
        "reponame": "r774",
        "star": 50,
        "watch": 46,
        "score": 0.87,
        "data": "2011-11-02"
    },
    {
        "id": "r775",
        "reponame": "r775",
        "star": 87,
        "watch": 87,
        "score": 0.03,
        "data": "2014-09-11"
    },
    {
        "id": "r776",
        "reponame": "r776",
        "star": 73,
        "watch": 36,
        "score": 0.08,
        "data": "2013-01-21"
    },
    {
        "id": "r777",
        "reponame": "r777",
        "star": 70,
        "watch": 3,
        "score": 0.15,
        "data": "2018-11-06"
    },
    {
        "id": "r778",
        "reponame": "r778",
        "star": 31,
        "watch": 8,
        "score": 0.68,
        "data": "2016-05-09"
    },
    {
        "id": "r779",
        "reponame": "r779",
        "star": 71,
        "watch": 94,
        "score": 0.86,
        "data": "2015-12-07"
    },
    {
        "id": "r780",
        "reponame": "r780",
        "star": 17,
        "watch": 31,
        "score": 0.73,
        "data": "2019-08-20"
    },
    {
        "id": "r781",
        "reponame": "r781",
        "star": 12,
        "watch": 8,
        "score": 0.96,
        "data": "2011-11-12"
    },
    {
        "id": "r782",
        "reponame": "r782",
        "star": 40,
        "watch": 4,
        "score": 0.08,
        "data": "2015-08-18"
    },
    {
        "id": "r783",
        "reponame": "r783",
        "star": 83,
        "watch": 26,
        "score": 0.42,
        "data": "2018-11-24"
    },
    {
        "id": "r784",
        "reponame": "r784",
        "star": 58,
        "watch": 43,
        "score": 0.69,
        "data": "2016-11-22"
    },
    {
        "id": "r785",
        "reponame": "r785",
        "star": 41,
        "watch": 74,
        "score": 0.72,
        "data": "2013-07-19"
    },
    {
        "id": "r786",
        "reponame": "r786",
        "star": 27,
        "watch": 43,
        "score": 0.46,
        "data": "2010-05-18"
    },
    {
        "id": "r787",
        "reponame": "r787",
        "star": 51,
        "watch": 86,
        "score": 0.72,
        "data": "2020-05-29"
    },
    {
        "id": "r788",
        "reponame": "r788",
        "star": 9,
        "watch": 3,
        "score": 0.83,
        "data": "2021-06-16"
    },
    {
        "id": "r789",
        "reponame": "r789",
        "star": 93,
        "watch": 53,
        "score": 0.47,
        "data": "2016-03-06"
    },
    {
        "id": "r790",
        "reponame": "r790",
        "star": 26,
        "watch": 25,
        "score": 0.37,
        "data": "2015-03-21"
    },
    {
        "id": "r791",
        "reponame": "r791",
        "star": 16,
        "watch": 50,
        "score": 0.73,
        "data": "2020-02-25"
    },
    {
        "id": "r792",
        "reponame": "r792",
        "star": 67,
        "watch": 1,
        "score": 0.12,
        "data": "2018-05-11"
    },
    {
        "id": "r793",
        "reponame": "r793",
        "star": 43,
        "watch": 11,
        "score": 0.1,
        "data": "2014-02-27"
    },
    {
        "id": "r794",
        "reponame": "r794",
        "star": 72,
        "watch": 69,
        "score": 0.73,
        "data": "2019-10-01"
    },
    {
        "id": "r795",
        "reponame": "r795",
        "star": 60,
        "watch": 91,
        "score": 0.31,
        "data": "2019-08-01"
    },
    {
        "id": "r796",
        "reponame": "r796",
        "star": 42,
        "watch": 60,
        "score": 0.14,
        "data": "2020-04-28"
    },
    {
        "id": "r797",
        "reponame": "r797",
        "star": 32,
        "watch": 25,
        "score": 0.02,
        "data": "2020-07-13"
    },
    {
        "id": "r798",
        "reponame": "r798",
        "star": 0,
        "watch": 61,
        "score": 0.15,
        "data": "2014-09-03"
    },
    {
        "id": "r799",
        "reponame": "r799",
        "star": 25,
        "watch": 73,
        "score": 0.91,
        "data": "2014-08-29"
    },
    {
        "id": "r800",
        "reponame": "r800",
        "star": 65,
        "watch": 0,
        "score": 0.59,
        "data": "2019-11-01"
    },
    {
        "id": "r801",
        "reponame": "r801",
        "star": 28,
        "watch": 18,
        "score": 0.45,
        "data": "2010-01-29"
    },
    {
        "id": "r802",
        "reponame": "r802",
        "star": 73,
        "watch": 50,
        "score": 0.58,
        "data": "2012-12-07"
    },
    {
        "id": "r803",
        "reponame": "r803",
        "star": 20,
        "watch": 55,
        "score": 0.6,
        "data": "2019-03-19"
    },
    {
        "id": "r804",
        "reponame": "r804",
        "star": 31,
        "watch": 83,
        "score": 0.16,
        "data": "2020-06-26"
    },
    {
        "id": "r805",
        "reponame": "r805",
        "star": 80,
        "watch": 49,
        "score": 0.4,
        "data": "2020-09-22"
    },
    {
        "id": "r806",
        "reponame": "r806",
        "star": 4,
        "watch": 25,
        "score": 0.98,
        "data": "2021-10-25"
    },
    {
        "id": "r807",
        "reponame": "r807",
        "star": 18,
        "watch": 72,
        "score": 0.52,
        "data": "2020-02-06"
    },
    {
        "id": "r808",
        "reponame": "r808",
        "star": 87,
        "watch": 72,
        "score": 0.95,
        "data": "2013-04-22"
    },
    {
        "id": "r809",
        "reponame": "r809",
        "star": 96,
        "watch": 85,
        "score": 0.55,
        "data": "2015-12-05"
    },
    {
        "id": "r810",
        "reponame": "r810",
        "star": 30,
        "watch": 69,
        "score": 0.31,
        "data": "2022-11-21"
    },
    {
        "id": "r811",
        "reponame": "r811",
        "star": 84,
        "watch": 85,
        "score": 0.66,
        "data": "2018-06-06"
    },
    {
        "id": "r812",
        "reponame": "r812",
        "star": 65,
        "watch": 41,
        "score": 0.84,
        "data": "2016-10-03"
    },
    {
        "id": "r813",
        "reponame": "r813",
        "star": 83,
        "watch": 0,
        "score": 0.72,
        "data": "2018-03-07"
    },
    {
        "id": "r814",
        "reponame": "r814",
        "star": 4,
        "watch": 35,
        "score": 0.46,
        "data": "2021-10-31"
    },
    {
        "id": "r815",
        "reponame": "r815",
        "star": 53,
        "watch": 52,
        "score": 0.12,
        "data": "2016-02-07"
    },
    {
        "id": "r816",
        "reponame": "r816",
        "star": 2,
        "watch": 91,
        "score": 0.96,
        "data": "2014-10-28"
    },
    {
        "id": "r817",
        "reponame": "r817",
        "star": 67,
        "watch": 19,
        "score": 0.83,
        "data": "2011-08-26"
    },
    {
        "id": "r818",
        "reponame": "r818",
        "star": 82,
        "watch": 86,
        "score": 0.43,
        "data": "2010-06-21"
    },
    {
        "id": "r819",
        "reponame": "r819",
        "star": 95,
        "watch": 5,
        "score": 0.91,
        "data": "2022-08-31"
    },
    {
        "id": "r820",
        "reponame": "r820",
        "star": 95,
        "watch": 7,
        "score": 0.09,
        "data": "2014-01-19"
    },
    {
        "id": "r821",
        "reponame": "r821",
        "star": 96,
        "watch": 42,
        "score": 0.14,
        "data": "2010-04-09"
    },
    {
        "id": "r822",
        "reponame": "r822",
        "star": 9,
        "watch": 19,
        "score": 0.9,
        "data": "2010-10-10"
    },
    {
        "id": "r823",
        "reponame": "r823",
        "star": 90,
        "watch": 48,
        "score": 0.08,
        "data": "2020-02-19"
    },
    {
        "id": "r824",
        "reponame": "r824",
        "star": 30,
        "watch": 74,
        "score": 0.92,
        "data": "2010-01-31"
    },
    {
        "id": "r825",
        "reponame": "r825",
        "star": 1,
        "watch": 18,
        "score": 0.97,
        "data": "2015-01-05"
    },
    {
        "id": "r826",
        "reponame": "r826",
        "star": 37,
        "watch": 22,
        "score": 0.07,
        "data": "2021-02-24"
    },
    {
        "id": "r827",
        "reponame": "r827",
        "star": 56,
        "watch": 92,
        "score": 1,
        "data": "2016-10-02"
    },
    {
        "id": "r828",
        "reponame": "r828",
        "star": 97,
        "watch": 56,
        "score": 0.49,
        "data": "2020-12-07"
    },
    {
        "id": "r829",
        "reponame": "r829",
        "star": 87,
        "watch": 2,
        "score": 0.84,
        "data": "2013-03-15"
    },
    {
        "id": "r830",
        "reponame": "r830",
        "star": 20,
        "watch": 50,
        "score": 0.47,
        "data": "2016-09-03"
    },
    {
        "id": "r831",
        "reponame": "r831",
        "star": 3,
        "watch": 19,
        "score": 0.24,
        "data": "2022-02-06"
    },
    {
        "id": "r832",
        "reponame": "r832",
        "star": 33,
        "watch": 99,
        "score": 0.51,
        "data": "2021-02-20"
    },
    {
        "id": "r833",
        "reponame": "r833",
        "star": 29,
        "watch": 14,
        "score": 0.93,
        "data": "2011-10-19"
    },
    {
        "id": "r834",
        "reponame": "r834",
        "star": 1,
        "watch": 26,
        "score": 0.37,
        "data": "2012-10-31"
    },
    {
        "id": "r835",
        "reponame": "r835",
        "star": 79,
        "watch": 10,
        "score": 0.28,
        "data": "2017-07-05"
    },
    {
        "id": "r836",
        "reponame": "r836",
        "star": 55,
        "watch": 9,
        "score": 0.22,
        "data": "2015-11-20"
    },
    {
        "id": "r837",
        "reponame": "r837",
        "star": 45,
        "watch": 79,
        "score": 0.6,
        "data": "2014-05-01"
    },
    {
        "id": "r838",
        "reponame": "r838",
        "star": 18,
        "watch": 71,
        "score": 0.02,
        "data": "2021-10-14"
    },
    {
        "id": "r839",
        "reponame": "r839",
        "star": 27,
        "watch": 85,
        "score": 0.21,
        "data": "2018-03-16"
    },
    {
        "id": "r840",
        "reponame": "r840",
        "star": 0,
        "watch": 24,
        "score": 0.78,
        "data": "2017-09-17"
    },
    {
        "id": "r841",
        "reponame": "r841",
        "star": 84,
        "watch": 2,
        "score": 0.03,
        "data": "2019-05-03"
    },
    {
        "id": "r842",
        "reponame": "r842",
        "star": 51,
        "watch": 85,
        "score": 0.06,
        "data": "2022-10-22"
    },
    {
        "id": "r843",
        "reponame": "r843",
        "star": 18,
        "watch": 78,
        "score": 0.04,
        "data": "2010-11-06"
    },
    {
        "id": "r844",
        "reponame": "r844",
        "star": 85,
        "watch": 8,
        "score": 0.5,
        "data": "2020-01-15"
    },
    {
        "id": "r845",
        "reponame": "r845",
        "star": 5,
        "watch": 8,
        "score": 0.58,
        "data": "2015-04-18"
    },
    {
        "id": "r846",
        "reponame": "r846",
        "star": 16,
        "watch": 75,
        "score": 0.06,
        "data": "2020-06-15"
    },
    {
        "id": "r847",
        "reponame": "r847",
        "star": 4,
        "watch": 5,
        "score": 0.14,
        "data": "2011-08-14"
    },
    {
        "id": "r848",
        "reponame": "r848",
        "star": 90,
        "watch": 27,
        "score": 0.37,
        "data": "2022-07-24"
    },
    {
        "id": "r849",
        "reponame": "r849",
        "star": 71,
        "watch": 46,
        "score": 0.24,
        "data": "2013-09-18"
    },
    {
        "id": "r850",
        "reponame": "r850",
        "star": 5,
        "watch": 34,
        "score": 0.58,
        "data": "2012-09-01"
    },
    {
        "id": "r851",
        "reponame": "r851",
        "star": 48,
        "watch": 89,
        "score": 0.57,
        "data": "2010-11-16"
    },
    {
        "id": "r852",
        "reponame": "r852",
        "star": 17,
        "watch": 69,
        "score": 0.48,
        "data": "2012-07-12"
    },
    {
        "id": "r853",
        "reponame": "r853",
        "star": 97,
        "watch": 14,
        "score": 0.79,
        "data": "2016-06-15"
    },
    {
        "id": "r854",
        "reponame": "r854",
        "star": 39,
        "watch": 69,
        "score": 0.43,
        "data": "2019-02-21"
    },
    {
        "id": "r855",
        "reponame": "r855",
        "star": 25,
        "watch": 23,
        "score": 0.52,
        "data": "2014-12-27"
    },
    {
        "id": "r856",
        "reponame": "r856",
        "star": 37,
        "watch": 77,
        "score": 0.72,
        "data": "2011-06-17"
    },
    {
        "id": "r857",
        "reponame": "r857",
        "star": 91,
        "watch": 88,
        "score": 0.81,
        "data": "2010-07-22"
    },
    {
        "id": "r858",
        "reponame": "r858",
        "star": 90,
        "watch": 18,
        "score": 0.14,
        "data": "2013-07-11"
    },
    {
        "id": "r859",
        "reponame": "r859",
        "star": 35,
        "watch": 60,
        "score": 0.06,
        "data": "2014-03-25"
    },
    {
        "id": "r860",
        "reponame": "r860",
        "star": 21,
        "watch": 44,
        "score": 0.79,
        "data": "2015-11-26"
    },
    {
        "id": "r861",
        "reponame": "r861",
        "star": 87,
        "watch": 25,
        "score": 0.23,
        "data": "2013-06-01"
    },
    {
        "id": "r862",
        "reponame": "r862",
        "star": 82,
        "watch": 99,
        "score": 0.62,
        "data": "2012-05-07"
    },
    {
        "id": "r863",
        "reponame": "r863",
        "star": 14,
        "watch": 59,
        "score": 0.2,
        "data": "2013-06-29"
    },
    {
        "id": "r864",
        "reponame": "r864",
        "star": 6,
        "watch": 23,
        "score": 0.5,
        "data": "2020-04-07"
    },
    {
        "id": "r865",
        "reponame": "r865",
        "star": 70,
        "watch": 94,
        "score": 0.08,
        "data": "2016-07-03"
    },
    {
        "id": "r866",
        "reponame": "r866",
        "star": 43,
        "watch": 88,
        "score": 0.53,
        "data": "2019-11-30"
    },
    {
        "id": "r867",
        "reponame": "r867",
        "star": 94,
        "watch": 9,
        "score": 0.53,
        "data": "2015-08-24"
    },
    {
        "id": "r868",
        "reponame": "r868",
        "star": 57,
        "watch": 57,
        "score": 0.87,
        "data": "2010-02-03"
    },
    {
        "id": "r869",
        "reponame": "r869",
        "star": 95,
        "watch": 27,
        "score": 0.21,
        "data": "2014-10-03"
    },
    {
        "id": "r870",
        "reponame": "r870",
        "star": 45,
        "watch": 19,
        "score": 0.07,
        "data": "2011-06-12"
    },
    {
        "id": "r871",
        "reponame": "r871",
        "star": 23,
        "watch": 97,
        "score": 0.95,
        "data": "2011-03-19"
    },
    {
        "id": "r872",
        "reponame": "r872",
        "star": 65,
        "watch": 50,
        "score": 0.15,
        "data": "2021-06-17"
    },
    {
        "id": "r873",
        "reponame": "r873",
        "star": 49,
        "watch": 29,
        "score": 0.11,
        "data": "2013-10-01"
    },
    {
        "id": "r874",
        "reponame": "r874",
        "star": 6,
        "watch": 83,
        "score": 0.97,
        "data": "2014-02-01"
    },
    {
        "id": "r875",
        "reponame": "r875",
        "star": 43,
        "watch": 16,
        "score": 0.46,
        "data": "2022-09-08"
    },
    {
        "id": "r876",
        "reponame": "r876",
        "star": 30,
        "watch": 20,
        "score": 0.41,
        "data": "2022-10-09"
    },
    {
        "id": "r877",
        "reponame": "r877",
        "star": 35,
        "watch": 23,
        "score": 0.71,
        "data": "2019-09-23"
    },
    {
        "id": "r878",
        "reponame": "r878",
        "star": 63,
        "watch": 31,
        "score": 0.66,
        "data": "2014-11-28"
    },
    {
        "id": "r879",
        "reponame": "r879",
        "star": 54,
        "watch": 2,
        "score": 0.95,
        "data": "2020-07-17"
    },
    {
        "id": "r880",
        "reponame": "r880",
        "star": 93,
        "watch": 15,
        "score": 0.57,
        "data": "2021-02-20"
    },
    {
        "id": "r881",
        "reponame": "r881",
        "star": 14,
        "watch": 70,
        "score": 1,
        "data": "2019-01-21"
    },
    {
        "id": "r882",
        "reponame": "r882",
        "star": 83,
        "watch": 29,
        "score": 0.42,
        "data": "2021-05-09"
    },
    {
        "id": "r883",
        "reponame": "r883",
        "star": 38,
        "watch": 64,
        "score": 0.92,
        "data": "2015-11-24"
    },
    {
        "id": "r884",
        "reponame": "r884",
        "star": 16,
        "watch": 79,
        "score": 0.07,
        "data": "2017-10-24"
    },
    {
        "id": "r885",
        "reponame": "r885",
        "star": 91,
        "watch": 0,
        "score": 0.71,
        "data": "2019-12-01"
    },
    {
        "id": "r886",
        "reponame": "r886",
        "star": 9,
        "watch": 52,
        "score": 0.82,
        "data": "2016-04-13"
    },
    {
        "id": "r887",
        "reponame": "r887",
        "star": 24,
        "watch": 82,
        "score": 0.76,
        "data": "2017-03-05"
    },
    {
        "id": "r888",
        "reponame": "r888",
        "star": 42,
        "watch": 82,
        "score": 0.41,
        "data": "2016-11-12"
    },
    {
        "id": "r889",
        "reponame": "r889",
        "star": 21,
        "watch": 18,
        "score": 0.9,
        "data": "2017-03-22"
    },
    {
        "id": "r890",
        "reponame": "r890",
        "star": 74,
        "watch": 54,
        "score": 0.15,
        "data": "2015-06-30"
    },
    {
        "id": "r891",
        "reponame": "r891",
        "star": 86,
        "watch": 19,
        "score": 0.13,
        "data": "2020-02-09"
    },
    {
        "id": "r892",
        "reponame": "r892",
        "star": 19,
        "watch": 14,
        "score": 0.95,
        "data": "2013-04-02"
    },
    {
        "id": "r893",
        "reponame": "r893",
        "star": 33,
        "watch": 28,
        "score": 0,
        "data": "2021-06-18"
    },
    {
        "id": "r894",
        "reponame": "r894",
        "star": 33,
        "watch": 76,
        "score": 0.09,
        "data": "2022-10-15"
    },
    {
        "id": "r895",
        "reponame": "r895",
        "star": 73,
        "watch": 84,
        "score": 0.47,
        "data": "2021-07-06"
    },
    {
        "id": "r896",
        "reponame": "r896",
        "star": 86,
        "watch": 12,
        "score": 0.83,
        "data": "2014-11-26"
    },
    {
        "id": "r897",
        "reponame": "r897",
        "star": 20,
        "watch": 74,
        "score": 0.64,
        "data": "2012-11-10"
    },
    {
        "id": "r898",
        "reponame": "r898",
        "star": 4,
        "watch": 65,
        "score": 0.85,
        "data": "2017-01-02"
    },
    {
        "id": "r899",
        "reponame": "r899",
        "star": 84,
        "watch": 35,
        "score": 0.1,
        "data": "2015-02-28"
    },
    {
        "id": "r900",
        "reponame": "r900",
        "star": 30,
        "watch": 74,
        "score": 0.02,
        "data": "2022-05-11"
    },
    {
        "id": "r901",
        "reponame": "r901",
        "star": 69,
        "watch": 1,
        "score": 0.83,
        "data": "2012-02-24"
    },
    {
        "id": "r902",
        "reponame": "r902",
        "star": 12,
        "watch": 41,
        "score": 0.2,
        "data": "2011-11-26"
    },
    {
        "id": "r903",
        "reponame": "r903",
        "star": 66,
        "watch": 14,
        "score": 0.24,
        "data": "2019-01-16"
    },
    {
        "id": "r904",
        "reponame": "r904",
        "star": 21,
        "watch": 69,
        "score": 0.64,
        "data": "2018-10-01"
    },
    {
        "id": "r905",
        "reponame": "r905",
        "star": 19,
        "watch": 31,
        "score": 0.33,
        "data": "2015-08-24"
    },
    {
        "id": "r906",
        "reponame": "r906",
        "star": 69,
        "watch": 68,
        "score": 0.74,
        "data": "2012-10-08"
    },
    {
        "id": "r907",
        "reponame": "r907",
        "star": 18,
        "watch": 54,
        "score": 0,
        "data": "2019-02-01"
    },
    {
        "id": "r908",
        "reponame": "r908",
        "star": 85,
        "watch": 62,
        "score": 0.12,
        "data": "2021-02-14"
    },
    {
        "id": "r909",
        "reponame": "r909",
        "star": 37,
        "watch": 64,
        "score": 0.24,
        "data": "2014-11-12"
    },
    {
        "id": "r910",
        "reponame": "r910",
        "star": 6,
        "watch": 2,
        "score": 0.35,
        "data": "2012-05-31"
    },
    {
        "id": "r911",
        "reponame": "r911",
        "star": 39,
        "watch": 46,
        "score": 0.73,
        "data": "2016-08-14"
    },
    {
        "id": "r912",
        "reponame": "r912",
        "star": 20,
        "watch": 84,
        "score": 0.26,
        "data": "2011-11-28"
    },
    {
        "id": "r913",
        "reponame": "r913",
        "star": 74,
        "watch": 55,
        "score": 0.89,
        "data": "2015-08-24"
    },
    {
        "id": "r914",
        "reponame": "r914",
        "star": 75,
        "watch": 10,
        "score": 0.05,
        "data": "2014-11-12"
    },
    {
        "id": "r915",
        "reponame": "r915",
        "star": 24,
        "watch": 30,
        "score": 0.94,
        "data": "2020-09-22"
    },
    {
        "id": "r916",
        "reponame": "r916",
        "star": 15,
        "watch": 87,
        "score": 0.04,
        "data": "2015-01-14"
    },
    {
        "id": "r917",
        "reponame": "r917",
        "star": 42,
        "watch": 62,
        "score": 0.57,
        "data": "2013-12-02"
    },
    {
        "id": "r918",
        "reponame": "r918",
        "star": 26,
        "watch": 93,
        "score": 0.9,
        "data": "2016-02-05"
    },
    {
        "id": "r919",
        "reponame": "r919",
        "star": 93,
        "watch": 15,
        "score": 0.34,
        "data": "2011-08-04"
    },
    {
        "id": "r920",
        "reponame": "r920",
        "star": 70,
        "watch": 73,
        "score": 0.23,
        "data": "2017-07-18"
    },
    {
        "id": "r921",
        "reponame": "r921",
        "star": 98,
        "watch": 87,
        "score": 0.55,
        "data": "2016-03-05"
    },
    {
        "id": "r922",
        "reponame": "r922",
        "star": 82,
        "watch": 46,
        "score": 0.49,
        "data": "2018-07-09"
    },
    {
        "id": "r923",
        "reponame": "r923",
        "star": 50,
        "watch": 5,
        "score": 0.49,
        "data": "2013-01-19"
    },
    {
        "id": "r924",
        "reponame": "r924",
        "star": 20,
        "watch": 74,
        "score": 0.43,
        "data": "2011-09-30"
    },
    {
        "id": "r925",
        "reponame": "r925",
        "star": 34,
        "watch": 91,
        "score": 0.9,
        "data": "2018-04-30"
    },
    {
        "id": "r926",
        "reponame": "r926",
        "star": 78,
        "watch": 75,
        "score": 0.4,
        "data": "2010-01-01"
    },
    {
        "id": "r927",
        "reponame": "r927",
        "star": 68,
        "watch": 6,
        "score": 0.62,
        "data": "2020-08-10"
    },
    {
        "id": "r928",
        "reponame": "r928",
        "star": 19,
        "watch": 35,
        "score": 0.98,
        "data": "2020-02-14"
    },
    {
        "id": "r929",
        "reponame": "r929",
        "star": 77,
        "watch": 96,
        "score": 0.89,
        "data": "2010-12-15"
    },
    {
        "id": "r930",
        "reponame": "r930",
        "star": 65,
        "watch": 28,
        "score": 0.36,
        "data": "2010-04-01"
    },
    {
        "id": "r931",
        "reponame": "r931",
        "star": 31,
        "watch": 25,
        "score": 0.6,
        "data": "2019-05-07"
    },
    {
        "id": "r932",
        "reponame": "r932",
        "star": 37,
        "watch": 48,
        "score": 0.67,
        "data": "2010-08-03"
    },
    {
        "id": "r933",
        "reponame": "r933",
        "star": 67,
        "watch": 58,
        "score": 0.1,
        "data": "2020-12-24"
    },
    {
        "id": "r934",
        "reponame": "r934",
        "star": 52,
        "watch": 71,
        "score": 0.88,
        "data": "2020-10-09"
    },
    {
        "id": "r935",
        "reponame": "r935",
        "star": 38,
        "watch": 16,
        "score": 0.92,
        "data": "2011-02-21"
    },
    {
        "id": "r936",
        "reponame": "r936",
        "star": 1,
        "watch": 43,
        "score": 0.25,
        "data": "2014-07-14"
    },
    {
        "id": "r937",
        "reponame": "r937",
        "star": 34,
        "watch": 84,
        "score": 0.59,
        "data": "2020-02-04"
    },
    {
        "id": "r938",
        "reponame": "r938",
        "star": 74,
        "watch": 73,
        "score": 0.67,
        "data": "2015-01-29"
    },
    {
        "id": "r939",
        "reponame": "r939",
        "star": 18,
        "watch": 83,
        "score": 0.56,
        "data": "2013-04-05"
    },
    {
        "id": "r940",
        "reponame": "r940",
        "star": 1,
        "watch": 15,
        "score": 0.07,
        "data": "2014-05-23"
    },
    {
        "id": "r941",
        "reponame": "r941",
        "star": 83,
        "watch": 9,
        "score": 0.94,
        "data": "2012-05-08"
    },
    {
        "id": "r942",
        "reponame": "r942",
        "star": 0,
        "watch": 1,
        "score": 0.97,
        "data": "2011-11-03"
    },
    {
        "id": "r943",
        "reponame": "r943",
        "star": 79,
        "watch": 20,
        "score": 0.66,
        "data": "2013-05-14"
    },
    {
        "id": "r944",
        "reponame": "r944",
        "star": 5,
        "watch": 39,
        "score": 0.07,
        "data": "2016-04-24"
    },
    {
        "id": "r945",
        "reponame": "r945",
        "star": 11,
        "watch": 41,
        "score": 0.56,
        "data": "2014-08-17"
    },
    {
        "id": "r946",
        "reponame": "r946",
        "star": 61,
        "watch": 42,
        "score": 0.97,
        "data": "2012-05-04"
    },
    {
        "id": "r947",
        "reponame": "r947",
        "star": 52,
        "watch": 35,
        "score": 0.4,
        "data": "2019-08-15"
    },
    {
        "id": "r948",
        "reponame": "r948",
        "star": 27,
        "watch": 97,
        "score": 0.8,
        "data": "2011-01-02"
    },
    {
        "id": "r949",
        "reponame": "r949",
        "star": 13,
        "watch": 14,
        "score": 0.98,
        "data": "2016-09-15"
    },
    {
        "id": "r950",
        "reponame": "r950",
        "star": 44,
        "watch": 77,
        "score": 0.25,
        "data": "2018-01-08"
    },
    {
        "id": "r951",
        "reponame": "r951",
        "star": 15,
        "watch": 26,
        "score": 0.81,
        "data": "2010-05-11"
    },
    {
        "id": "r952",
        "reponame": "r952",
        "star": 36,
        "watch": 43,
        "score": 0.19,
        "data": "2016-07-28"
    },
    {
        "id": "r953",
        "reponame": "r953",
        "star": 77,
        "watch": 85,
        "score": 0.17,
        "data": "2010-09-05"
    },
    {
        "id": "r954",
        "reponame": "r954",
        "star": 54,
        "watch": 95,
        "score": 0.44,
        "data": "2013-05-25"
    },
    {
        "id": "r955",
        "reponame": "r955",
        "star": 65,
        "watch": 90,
        "score": 0.21,
        "data": "2011-02-02"
    },
    {
        "id": "r956",
        "reponame": "r956",
        "star": 91,
        "watch": 78,
        "score": 0.49,
        "data": "2015-06-15"
    },
    {
        "id": "r957",
        "reponame": "r957",
        "star": 16,
        "watch": 59,
        "score": 0.26,
        "data": "2022-01-02"
    },
    {
        "id": "r958",
        "reponame": "r958",
        "star": 16,
        "watch": 71,
        "score": 0.99,
        "data": "2013-09-29"
    },
    {
        "id": "r959",
        "reponame": "r959",
        "star": 77,
        "watch": 13,
        "score": 0.55,
        "data": "2011-04-01"
    },
    {
        "id": "r960",
        "reponame": "r960",
        "star": 41,
        "watch": 28,
        "score": 0.76,
        "data": "2021-12-29"
    },
    {
        "id": "r961",
        "reponame": "r961",
        "star": 83,
        "watch": 15,
        "score": 0.08,
        "data": "2013-11-16"
    },
    {
        "id": "r962",
        "reponame": "r962",
        "star": 87,
        "watch": 73,
        "score": 0.18,
        "data": "2018-11-04"
    },
    {
        "id": "r963",
        "reponame": "r963",
        "star": 7,
        "watch": 55,
        "score": 0.13,
        "data": "2022-03-24"
    },
    {
        "id": "r964",
        "reponame": "r964",
        "star": 86,
        "watch": 71,
        "score": 0.77,
        "data": "2010-01-04"
    },
    {
        "id": "r965",
        "reponame": "r965",
        "star": 99,
        "watch": 56,
        "score": 0.11,
        "data": "2020-04-29"
    },
    {
        "id": "r966",
        "reponame": "r966",
        "star": 61,
        "watch": 66,
        "score": 0.93,
        "data": "2011-05-22"
    },
    {
        "id": "r967",
        "reponame": "r967",
        "star": 75,
        "watch": 1,
        "score": 0.19,
        "data": "2019-12-02"
    },
    {
        "id": "r968",
        "reponame": "r968",
        "star": 8,
        "watch": 56,
        "score": 0.83,
        "data": "2014-08-07"
    },
    {
        "id": "r969",
        "reponame": "r969",
        "star": 75,
        "watch": 85,
        "score": 0.99,
        "data": "2013-06-14"
    },
    {
        "id": "r970",
        "reponame": "r970",
        "star": 83,
        "watch": 63,
        "score": 0.15,
        "data": "2020-05-23"
    },
    {
        "id": "r971",
        "reponame": "r971",
        "star": 50,
        "watch": 80,
        "score": 0.24,
        "data": "2022-12-22"
    },
    {
        "id": "r972",
        "reponame": "r972",
        "star": 48,
        "watch": 80,
        "score": 0.05,
        "data": "2010-03-17"
    },
    {
        "id": "r973",
        "reponame": "r973",
        "star": 3,
        "watch": 69,
        "score": 0.66,
        "data": "2014-12-08"
    },
    {
        "id": "r974",
        "reponame": "r974",
        "star": 92,
        "watch": 34,
        "score": 0.83,
        "data": "2016-02-13"
    },
    {
        "id": "r975",
        "reponame": "r975",
        "star": 90,
        "watch": 83,
        "score": 0.69,
        "data": "2020-01-16"
    },
    {
        "id": "r976",
        "reponame": "r976",
        "star": 78,
        "watch": 25,
        "score": 0.96,
        "data": "2015-05-21"
    },
    {
        "id": "r977",
        "reponame": "r977",
        "star": 90,
        "watch": 69,
        "score": 0.41,
        "data": "2016-01-05"
    },
    {
        "id": "r978",
        "reponame": "r978",
        "star": 69,
        "watch": 7,
        "score": 0.68,
        "data": "2013-08-22"
    },
    {
        "id": "r979",
        "reponame": "r979",
        "star": 82,
        "watch": 66,
        "score": 0.64,
        "data": "2012-12-13"
    },
    {
        "id": "r980",
        "reponame": "r980",
        "star": 37,
        "watch": 10,
        "score": 0.28,
        "data": "2012-02-04"
    },
    {
        "id": "r981",
        "reponame": "r981",
        "star": 31,
        "watch": 96,
        "score": 0.59,
        "data": "2021-05-25"
    },
    {
        "id": "r982",
        "reponame": "r982",
        "star": 61,
        "watch": 18,
        "score": 0.55,
        "data": "2011-03-27"
    },
    {
        "id": "r983",
        "reponame": "r983",
        "star": 82,
        "watch": 30,
        "score": 0.06,
        "data": "2014-03-19"
    },
    {
        "id": "r984",
        "reponame": "r984",
        "star": 71,
        "watch": 11,
        "score": 0.99,
        "data": "2018-08-07"
    },
    {
        "id": "r985",
        "reponame": "r985",
        "star": 1,
        "watch": 31,
        "score": 0.56,
        "data": "2018-05-10"
    },
    {
        "id": "r986",
        "reponame": "r986",
        "star": 98,
        "watch": 39,
        "score": 0.03,
        "data": "2018-11-09"
    },
    {
        "id": "r987",
        "reponame": "r987",
        "star": 99,
        "watch": 66,
        "score": 0.04,
        "data": "2018-11-27"
    },
    {
        "id": "r988",
        "reponame": "r988",
        "star": 94,
        "watch": 23,
        "score": 0.07,
        "data": "2010-07-16"
    },
    {
        "id": "r989",
        "reponame": "r989",
        "star": 25,
        "watch": 76,
        "score": 0.04,
        "data": "2019-07-09"
    },
    {
        "id": "r990",
        "reponame": "r990",
        "star": 12,
        "watch": 11,
        "score": 0.35,
        "data": "2018-07-04"
    },
    {
        "id": "r991",
        "reponame": "r991",
        "star": 89,
        "watch": 46,
        "score": 0.65,
        "data": "2018-11-01"
    },
    {
        "id": "r992",
        "reponame": "r992",
        "star": 33,
        "watch": 75,
        "score": 0.21,
        "data": "2018-09-02"
    },
    {
        "id": "r993",
        "reponame": "r993",
        "star": 31,
        "watch": 39,
        "score": 0.58,
        "data": "2022-07-02"
    },
    {
        "id": "r994",
        "reponame": "r994",
        "star": 6,
        "watch": 15,
        "score": 0.75,
        "data": "2011-06-02"
    },
    {
        "id": "r995",
        "reponame": "r995",
        "star": 49,
        "watch": 79,
        "score": 0.11,
        "data": "2010-06-25"
    },
    {
        "id": "r996",
        "reponame": "r996",
        "star": 9,
        "watch": 95,
        "score": 0.59,
        "data": "2022-02-11"
    },
    {
        "id": "r997",
        "reponame": "r997",
        "star": 88,
        "watch": 13,
        "score": 0.51,
        "data": "2018-04-20"
    },
    {
        "id": "r998",
        "reponame": "r998",
        "star": 16,
        "watch": 7,
        "score": 0.98,
        "data": "2011-12-06"
    },
    {
        "id": "r999",
        "reponame": "r999",
        "star": 64,
        "watch": 93,
        "score": 1,
        "data": "2016-05-12"
    }
]
  

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
    const width = Math.floor(chartRef.current.offsetWidth) - margin.left - margin.right;
    const height = Math.floor(chartRef.current.offsetHeight) - margin.top - margin.bottom;
    data.sort((a, b) => multiRuleSort(a, b)); // 对数据根据x轴的值进行排序
    const circleR = 6;
    let yAvg = average(data);
    const [mergeData, maxWidth] = mergeDataFunc(
      width,
      height,
      circleR,
      yAvg
    );
    const xData = mergeData.map((item) => item[xAxisType]);
    const yData = mergeData.map((item) => item[yAxisType]);
    const [xmin, xmax] = [d3.min(xData), d3.max(xData)]; // 轴的最值
    const [ymin, ymax] = [d3.min(yData), d3.max(yData)];
    const yNumber = ymax - ymin;
    // let
    const svg = d3
      .select("#cluster-details")
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("background", "white")
      // .attr("width", width)
      // .attr("height", height)
      .attr("width", "100%")
      .attr("height", "100%")
      // .attr("viewBox", [
      //   0,
      //   0,
      //   width* 2,
      //   height*2,
      //   // width - margin.left - margin.right,
      //   // height - margin.top - margin.bottom,
      // ])
      // .attr("transform", `translate(${margin.left}, ${margin.top})`);
    // 对数据做进一步处理

    const wrapper = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    // 坐标轴的箭头表示符号
    const markerWidth = 10, markerHeight = 10
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'cluster-edtails-arrow')
      .attr('viewBox', [0, 0, 10, 10])
      .attr('refX', markerWidth/2)
      .attr('refY', markerHeight/2)
      .attr('markerWidth', markerWidth)
      .attr('markerHeight', markerHeight)
      .attr('orient', 'auto-start-reverse')
      .append('path')
      .attr('d', d3.line()([[0, 0], [0, markerHeight], [markerWidth, markerHeight/2]]))
      .attr('stroke', 'black');
    // 添加纵向坐标轴
    wrapper.append('text')
          .attr('x', -5)
          .attr('y', height/2)
          .attr('dy', '0.35em')
          .style('fill', '#db2f72')
          .style('font-size', '0.7em')
          .style('text-anchor', 'end')
          .style('', 'end')
          .text(yAvg)

    wrapper.append('path')
          .attr('d', d3.line()([[0, height/2], [0, height-5]]))
          .attr('stroke', 'rgba(51, 51, 51, 1)')
          .attr('stroke', 'black')
          .attr('stroke-width', '0.5')
          .attr('marker-end', 'url(#cluster-edtails-arrow)')
          .attr('fill', 'none');    wrapper.append('path')
    wrapper.append('path')
        .attr('d', d3.line()([[0, height/2], [0, 5]]))
        .attr('stroke', 'rgba(51, 51, 51, 1)')
          .attr('stroke', 'black')
          .attr('stroke-width', '0.5')
          .attr('marker-end', 'url(#cluster-edtails-arrow)')
          .attr('fill', 'none');
    wrapper.append('path')
          .attr('d', d3.line()([[0, height/2], [maxWidth + 20, height/2]]))
          .attr('stroke', 'rgba(51, 51, 51, 1)')
          .attr('stroke-width', '0.5')
          .attr('marker-end', 'url(#cluster-edtails-arrow)')
          .attr('fill', 'none');
    wrapper
      .append("g")
      .attr("class", "chart-g")
      .selectAll("circle")
      .data(mergeData)
      .join("circle")
      .attr("cx", (d) => d.x) // 计算出来的x、y值
      .attr("cy", (d) => d.y)
      .attr("xval", (d) => d[xAxisType])
      .attr("yval", (d) => d[yAxisType])
      .attr("r", circleR)
      .attr("fill", (d) => {
        if (d.group.length !== 0) {
          return "red";
        }
        return "#d6f6a7";
      });
  };

  // 对排序后的数据根据y轴的值进行合并(合并同一个x下相同y值的点)
  function mergeDataFunc(w, h, r, yAvg) {
    let mergeData = [{ ...data[0], group: [], x: r, y: h / 2 - r }]; // 把第一条数据放进去并初始化类型为单个点，第一个点的位置位于初始位置
    let mergeIndex = 1;
    let colMaxNumber = Math.floor(h / (2 * 2 * r)); // 一半视图最多能容纳的点数
    let xLabel = {};
    for (let i = 1; i < data.length; i++) {
      let temp = data[i];
      // 当前点与merge中的最后一条数据相同
      if (
        temp[xAxisType] === mergeData[mergeIndex - 1][xAxisType] &&
        temp[yAxisType] === mergeData[mergeIndex - 1][yAxisType]
      ) {
        if (mergeData[mergeIndex - 1]["group"].length === 0) {
          delete mergeData[mergeIndex - 1].group;
          mergeData[mergeIndex - 1] = {
            [xAxisType]: temp[xAxisType],
            [yAxisType]: temp[yAxisType],
            group: [mergeData[mergeIndex - 1], temp],
          };
        } else {
          mergeData[mergeIndex - 1] = {
            [xAxisType]: temp[xAxisType],
            [yAxisType]: temp[yAxisType],
            group: [...mergeData[mergeIndex - 1]["group"], temp],
          };
        }
      } else {
        mergeData[mergeIndex] = { ...temp, group: [] };
        mergeIndex += 1;
      }
    }

    // 计算合并后的数据的x, y
    // xLabel={'x1': [number(y>avg), number(y<avg)], 'x2':[...]}
    for (let i of mergeData) {
      if (xLabel.hasOwnProperty(i[xAxisType])) {
        if (i[yAxisType] >= yAvg) {
          xLabel[i[xAxisType]][0] += 1;
        } else {
          xLabel[i[xAxisType]][1] += 1;
        }
      } else {
        xLabel[i[xAxisType]] = [0, 0];
        if (i[yAxisType] >= yAvg) {
          xLabel[i[xAxisType]][0] += 1; // >= 平均数的数量
        } else {
          xLabel[i[xAxisType]][1] += 1;
        }
      }
    }
    console.log(h / (2 * 2 * r), colMaxNumber, xLabel);
    let maxWidth = 0;  // 记录图表实际使用的宽度
    let columnIndex = 0; // 标识属于第几列的，是累加的
    let prevNeededCol = 0;
    let positiveNumber = 0; // 某一个key下面的负数总数
    let negativeNumber = 0; // 某一个key下面的正数总数
    let prevKey = -1;
    for (let i = 0; i < mergeData.length; i++) {
      if (i === 0) {
        // 第一个元素
        columnIndex = 1;
        positiveNumber = 0;
        negativeNumber = 0;
        prevKey = mergeData[i][xAxisType];
        prevNeededCol = Math.ceil(
          d3.max(xLabel[mergeData[i][xAxisType]]) / colMaxNumber
        ); // 当前的横坐标值需要的列数
      }

      let curKey = mergeData[i][xAxisType]; // 当前key
      if (curKey === prevKey) {
        if (mergeData[i][yAxisType] >= yAvg) {
          positiveNumber += 1;
        } else {
          negativeNumber += 1;
        }
      } else {
        columnIndex += prevNeededCol; // 已经使用了的列数
        // 重新初始化一些参数
        prevNeededCol = Math.ceil(
          d3.max(xLabel[mergeData[i][xAxisType]]) / colMaxNumber
        ); // 当前的横坐标值需要的列数
        positiveNumber = 0;
        negativeNumber = 0;
        prevKey = curKey;

        if (mergeData[i][yAxisType] >= yAvg) {
          positiveNumber += 1;
        } else {
          negativeNumber += 1;
        }
      }

      let c = 0, row = 0;
      if (mergeData[i][yAxisType] >= yAvg) {
        if(positiveNumber % (colMaxNumber) === 0){
          c = colMaxNumber
        }else{
          c= positiveNumber % (colMaxNumber)
        }
        mergeData[i]["y"] = h / 2 - r * (2 *c - 1); // 当前点的y值
      } else {
        if(negativeNumber % (colMaxNumber) === 0){
          c = colMaxNumber
        }else{
          c= negativeNumber % (colMaxNumber)
        }
        mergeData[i]["y"] = h / 2 + r * (2 * c - 1); // 当前点的y值
      }
      if(d3.max([positiveNumber, negativeNumber]) %  (colMaxNumber) === 0){
        row = d3.max([positiveNumber, negativeNumber]) / (colMaxNumber) - 1
      }else{
        row = Math.floor(d3.max([positiveNumber, negativeNumber]) /  (colMaxNumber))
      }
      mergeData[i]["x"] = r *((columnIndex + row) * 2 - 1); // 当前点的x值
      if(i === mergeData.length -1){
        maxWidth = mergeData[i]["x"]
      }
    }
    return [mergeData, maxWidth];
  }

  // 现根据x轴属性升序排序，再根据y轴属性升序排序
  function multiRuleSort(a, b) {
    if (a[xAxisType] === b[xAxisType]) {
      if (a[yAxisType] > b[yAxisType]) {
        return 1;
      } else {
        return -1;
      }
    } else if (a[xAxisType] > b[xAxisType]) {
      return 1;
    }
    return -1;
  }
  // 计算y轴的平均值
  function average(array) {
    let sum = 0;
    array.forEach((e) => {
      sum += e[yAxisType];
    });
    return sum / array.length;
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
