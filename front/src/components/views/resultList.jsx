import React from "react";
import { useState } from "react";
import { LikeOutlined, StarOutlined, EyeOutlined } from "@ant-design/icons";
import { Typography, List, Space, Tag  } from "antd";
import "./resultList.css";
import { useEffect } from "react";
const { Paragraph } = Typography;

const ResultList = () => {
  const [rows, setRows] = useState(1);
  const [expandable, setExpandable] = useState(true);
  const [init, setInit] = useState(false)
  const [listKey, setListKey] = useState({})
  const [listFold, setListFold] = useState({})
  const [loading, setLoading] = useState(false);

  const hits = [
    {
      repoName: "iDataV",
      "owner.ownerName": "16399220_yyhsong",
      "owner.htmlUrl": "https://github.com/yyhsong",
      "owner.ownerType": "User",
      "owner.ownerDescription": "This is the way",
      htmlUrl: "https://github.com/yyhsong/iDataV",
      description: "大屏数据可视化 Big screen data visualization demo",
      createdAt: "2018-06-06T06:52:20Z",
      updatedAt: "2022-08-11T14:14:02Z",
      size: 18526,
      topics: [
        "antv",
        "data-visualization",
        "datav",
        "echarts",
        "large-screen-data-visualization",
        "sugar",
      ],
      stargazersCount: 4317,
      watchersCount: 4317,
      contentsUrl:
        "https://api.github.com/repos/yyhsong/iDataV/contents/{+path}",
      language: ["JavaScript", "HTML", "CSS"],
      contributors: ["yyhsong"],
    },
    {
      repoName: "ReactScaleView",
      "owner.ownerName": "4111627_xiaohaijoe",
      "owner.htmlUrl": "https://github.com/xiaohaijoe",
      "owner.ownerType": "User",
      "owner.ownerDescription": null,
      htmlUrl: "https://github.com/xiaohaijoe/ReactScaleView",
      description:
        "大屏数据可视化，响应式适配方案。利用响应式的适配方式，针对不同的分辨率的屏幕，一次开发，多屏兼容。large-screen-data-visualization。",
      createdAt: "2021-02-08T06:31:59Z",
      updatedAt: "2022-07-28T03:12:38Z",
      size: 9103,
      topics: [
        "data-visualization",
        "datav",
        "echarts",
        "large-screen-data-visualization",
        "responsive",
        "suger",
      ],
      stargazersCount: 68,
      watchersCount: 68,
      contentsUrl:
        "https://api.github.com/repos/xiaohaijoe/ReactScaleView/contents/{+path}",
      language: ["JavaScript", "Less", "HTML", "CSS"],
      contributors: ["xiaohaijoe"],
    },
    {
      repoName: "vuex-namespaced-module-structure",
      "owner.ownerName": "12736734_igeligel",
      "owner.htmlUrl": "https://github.com/igeligel",
      "owner.ownerType": "User",
      "owner.ownerDescription":
        "⚡️ @klarna with Node.js, React.js. In free time hacking on Node.js, .NET, JavaScript and Vue.js Projects",
      htmlUrl: "https://github.com/igeligel/vuex-namespaced-module-structure",
      description:
        ":chart_with_upwards_trend: A Vue.js project powered by Vuex namespaced modules in a simple structure based on Large-scale Vuex application structures",
      createdAt: "2017-10-22T12:23:30Z",
      updatedAt: "2022-05-25T07:41:16Z",
      size: 184,
      topics: [
        "blogpost",
        "large-scale",
        "modules",
        "vue",
        "vue2",
        "vuejs2",
        "vuex",
      ],
      stargazersCount: 151,
      watchersCount: 151,
      contentsUrl:
        "https://api.github.com/repos/igeligel/vuex-namespaced-module-structure/contents/{+path}",
      language: ["JavaScript", "Vue", "HTML"],
      contributors: ["igeligel"],
    },
    {
      repoName: "vuex-simple-structure",
      "owner.ownerName": "12736734_igeligel",
      "owner.htmlUrl": "https://github.com/igeligel",
      "owner.ownerType": "User",
      "owner.ownerDescription":
        "⚡️ @klarna with Node.js, React.js. In free time hacking on Node.js, .NET, JavaScript and Vue.js Projects",
      htmlUrl: "https://github.com/igeligel/vuex-simple-structure",
      description:
        ":chart_with_upwards_trend: A repository showcasing a simple Vuex store inside a Vue.js application based on Large-scale Vuex application structures @3yourmind",
      createdAt: "2017-10-22T11:39:23Z",
      updatedAt: "2022-05-16T15:02:29Z",
      size: 182,
      topics: [
        "blogpost",
        "large-scale",
        "simple",
        "vue",
        "vue2",
        "vuejs2",
        "vuex",
      ],
      stargazersCount: 87,
      watchersCount: 87,
      contentsUrl:
        "https://api.github.com/repos/igeligel/vuex-simple-structure/contents/{+path}",
      language: ["JavaScript", "Vue", "HTML"],
      contributors: ["igeligel"],
    },
    {
      repoName: "large-scale-javascript",
      "owner.ownerName": "19714_azu",
      "owner.htmlUrl": "https://github.com/azu",
      "owner.ownerType": "User",
      "owner.ownerDescription":
        "Creator of @textlint, @secretlint, @honkit and @almin.\r\nEditor of @efcl, @jser and @ecmascript-daily.\r\nAuthor of @js-primer.\r\n(Don't send me email-ad.)",
      htmlUrl: "https://github.com/azu/large-scale-javascript",
      description: "複雑なJavaScriptアプリケーションを作るために考えること",
      createdAt: "2016-09-24T16:23:25Z",
      updatedAt: "2022-06-10T04:37:33Z",
      size: 128,
      topics: ["css", "document", "javascript"],
      stargazersCount: 320,
      watchersCount: 320,
      contentsUrl:
        "https://api.github.com/repos/azu/large-scale-javascript/contents/{+path}",
      language: ["JavaScript", "CSS"],
      contributors: ["azu", "sanemat", "himanoa"],
    },
    {
      repoName: "vuex-feature-scoped-structure",
      "owner.ownerName": "12736734_igeligel",
      "owner.htmlUrl": "https://github.com/igeligel",
      "owner.ownerType": "User",
      "owner.ownerDescription":
        "⚡️ @klarna with Node.js, React.js. In free time hacking on Node.js, .NET, JavaScript and Vue.js Projects",
      htmlUrl: "https://github.com/igeligel/vuex-feature-scoped-structure",
      description:
        ":chart_with_upwards_trend: Feature scoped Vuex modules to have a better organization of business logic code inside Vuex modules based on Large-scale Vuex application structures @3yourmind",
      createdAt: "2017-10-22T14:22:04Z",
      updatedAt: "2022-06-17T04:22:51Z",
      size: 379,
      topics: [
        "blogpost",
        "container",
        "containers",
        "large-scale",
        "modules",
        "vue",
        "vue2",
        "vuejs2",
        "vuex",
      ],
      stargazersCount: 224,
      watchersCount: 224,
      contentsUrl:
        "https://api.github.com/repos/igeligel/vuex-feature-scoped-structure/contents/{+path}",
      language: ["JavaScript", "Vue", "HTML"],
      contributors: ["igeligel"],
    },
    {
      repoName: "data-visualization",
      "owner.ownerName": "4074517_TingGe",
      "owner.htmlUrl": "https://github.com/TingGe",
      "owner.ownerType": "User",
      "owner.ownerDescription":
        "JS/DevOps/PMP/\r\nAgile/WoT/ \r\n@nefe /@clientlabs / @uplaydotcc",
      htmlUrl: "https://github.com/TingGe/data-visualization",
      description: "数据可视化",
      createdAt: "2015-08-15T15:19:50Z",
      updatedAt: "2022-06-04T02:11:34Z",
      size: 5079,
      topics: [
        "d3js",
        "data-visualization",
        "fabric",
        "netflow",
        "sankey-diagram",
      ],
      stargazersCount: 197,
      watchersCount: 197,
      contentsUrl:
        "https://api.github.com/repos/TingGe/data-visualization/contents/{+path}",
      language: ["JavaScript", "CSS", "HTML"],
      contributors: ["TingGe"],
    },
    {
      repoName: "d3-iconarray",
      "owner.ownerName": "125399_tomgp",
      "owner.htmlUrl": "https://github.com/tomgp",
      "owner.ownerType": "User",
      "owner.ownerDescription": "Computer user",
      htmlUrl: "https://github.com/tomgp/d3-iconarray",
      description: "A D3 module for making grids of icons",
      createdAt: "2015-07-31T07:32:03Z",
      updatedAt: "2022-05-28T09:10:15Z",
      size: 370,
      topics: ["d3", "data-visualisation", "grid", "icon-array", "scale"],
      stargazersCount: 80,
      watchersCount: 80,
      contentsUrl:
        "https://api.github.com/repos/tomgp/d3-iconarray/contents/{+path}",
      language: ["JavaScript", "HTML"],
      contributors: ["tomgp"],
    },
    {
      repoName: "Data-Visualization-Dashboard",
      "owner.ownerName": "31229906_skyerhxx",
      "owner.htmlUrl": "https://github.com/skyerhxx",
      "owner.ownerType": "User",
      "owner.ownerDescription": null,
      htmlUrl: "https://github.com/skyerhxx/Data-Visualization-Dashboard",
      description: "20套数据可视化驾驶舱源码",
      createdAt: "2019-08-31T14:28:44Z",
      updatedAt: "2022-07-15T06:52:55Z",
      size: 32329,
      topics: [],
      stargazersCount: 23,
      watchersCount: 23,
      contentsUrl:
        "https://api.github.com/repos/skyerhxx/Data-Visualization-Dashboard/contents/{+path}",
      language: ["JavaScript", "HTML", "CSS"],
      contributors: ["skyerhxx"],
    },
    {
      repoName: "scalable-data-visualization",
      "owner.ownerName": "5673251_znation",
      "owner.htmlUrl": "https://github.com/znation",
      "owner.ownerType": "User",
      "owner.ownerDescription": "Software Engineer",
      htmlUrl: "https://github.com/znation/scalable-data-visualization",
      description: "React.js Conference 2015 talk and demo",
      createdAt: "2015-01-05T20:04:09Z",
      updatedAt: "2021-12-18T16:28:46Z",
      size: 1403,
      topics: [],
      stargazersCount: 166,
      watchersCount: 166,
      contentsUrl:
        "https://api.github.com/repos/znation/scalable-data-visualization/contents/{+path}",
      language: ["JavaScript", "CSS", "HTML"],
      contributors: ["brentvatne", "waldyrious"],
    },
  ];
  useEffect(() => {
    setInit(true)
  }, [])

  useEffect(() => {
    if(init){
      for(let i=0; i<hits.length; i++){
        let key = hits[i].repoName
        let tempKey = {[key]: hits[i].repoName + '$' + i}
        let tempFold = {[key]: true}
        setListKey(p => ({...p, ...tempKey}))
        setListFold(p => ({...p, ...tempFold}))
      }
    }
  }, [init])

  
  const onExpand = (e) => {
    let curRepo = e.target.parentNode.id.split('$')[0]
    let tempFold = {[curRepo]: false}
    setListFold(p => ({...p, ...tempFold}))
  };
  const onCollapse = (e) => {
    let curRepo = e.target.parentNode.parentNode.id.split('$')[0]
    let tempFold = {[curRepo]: true}
    let tempKeyNumber = parseInt(e.target.parentNode.parentNode.id.split('$')[1]) + 1
    let tempKey = {[curRepo]: [curRepo] + '$' + tempKeyNumber}
    setListFold(p => ({...p, ...tempFold}))
    setListKey(p => ({...p, ...tempKey}))
  };
  // 高亮相同的tag
  const highlightTag = (e)=>{
    let currTopic = e.target.innerText.replace(/\-|\_/g," ");
    let elements = document.querySelectorAll(`${"span[value=" + currTopic + "]"}`);
    for(let i of elements){
      i.classList.add('tagSelected')
    }
  }

  const highlightRemove = () => {
    let elements = document.querySelectorAll("span[type=topicSpan]")
    for(let i of elements){
      i.classList.remove('tagSelected')
    }
  }
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
 return (
    <div style={{ width: "100%", height: "100%" }}>
      {init && <List
        itemLayout="vertical"
        size="small"
        dataSource={hits}
        pagination={{
          pageSize: 5,
        }}
        renderItem={(item, index) => (
          <List.Item
            key={item.repoName}
            actions={[
              <IconText
                icon={StarOutlined}
                text={item.stargazersCount}
                key="list-vertical-star-o"
              />,
              <IconText
                icon={EyeOutlined}
                text={item.watchersCount}
                key="list-vertical-like-o"
              />,
            ]}
          >
            <List.Item.Meta
              title={<a href={item.htmlUrl}>{item.repoName}</a>}
            />
            {item.topics.map((topic) => {
              return(
                <Tag
                type= 'topicSpan'
                value={topic.replace(/\-|\_/g," ").toLowerCase()}
                 onMouseOver = {highlightTag}
                 onMouseOut = {highlightRemove}
                 >
                  {topic}
                 </Tag>
              )
            })}
            <Paragraph
              key= {listKey[item.repoName]}
              id = {listKey[item.repoName]}
              ellipsis={{
                rows,
                symbol: "v",
                expandable,
                onExpand: onExpand,
              }}
            >
              {item.description}
              {!listFold[item.repoName] && (
                <span className="value-collapse" onClick={onCollapse}>
                  <a> ^</a>
                </span>
              )}
            </Paragraph>
          </List.Item>
        )}
      />}
    </div>
  );
};

export default ResultList;
