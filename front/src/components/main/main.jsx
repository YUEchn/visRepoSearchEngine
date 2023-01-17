import "./main.css";
import "flexlayout-react/style/underline.css";
import axios from "axios";
import { getResult, testConnect } from "../../apis/api";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Layout, Model, TabNode, IJsonModel, Actions } from "flexlayout-react";
import ResultList from "../views/resultList";
import SimilarRepos from "../views/similarRepos";
import RelevantRepos from "../views/revelantRepos";
import ClusterView from "../views/clusterView";
import RepoPortrait from "../views/repoPortrait";
import TimeFilter from "../views/timeFilter";
import ClusterDetails from "../views/clusterDetails";
const { Search } = Input;

const Main = () => {
  const [init, setInit] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [isSelect, setIsSelect] = useState(false)
  const [selectRepo, setSelectRepo] = useState("");
  const [maximize, setMaximize] = useState(false);

  // 布局的配置
  const configModel = {
    global: { tabEnableFloat: false },
    borders: [],
    layout: {
      type: "row",
      weight: 100,
      children: [
        {
          type: "row",
          weight: 100,
          children: [
            {
              type: "row",
              weight: 100,
              children: [
                {
                  type: "tabset",
                  weight: 100,
                  children: [
                    {
                      type: "tab",
                      name: "cluster view",
                      component: "cluster-view",
                      enableClose: false,
                    },
                  ],
                },
              ],
            },
            {
              type: "tabset",
              weight: 40,
              children: [
                {
                  type: "tab",
                  name: "cluster details",
                  component: "cluster-details",
                  enableClose: false,
                },
                // {
                //   type: "tab",
                //   name: "relevant repos",
                //   component: "relevant-repos",
                //   enableClose: false,
                // },
                // {
                //   type: "tab",
                //   name: "similar repos",
                //   component: "similar-repos",
                //   enableClose: false,
                // },
              ],
            },
          ],
        },
      ],
    },
  };

  const model = Model.fromJson(configModel);
  const factory = (node) => {
    var component = node.getComponent();
    switch (component) {
      case "result-list":
        return (
          <ResultList
            result={result}
            query={query}
            loading={loading}
            // setSelectRepo={setSelectRepo}
          />
        );
      case "cluster-view":
        return <ClusterView />;
      case "cluster-details":
        return <ClusterDetails />;
      case "relevant-repos":
        return <RelevantRepos />;
      case "similar-repos":
        return <SimilarRepos />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    let flexObj = document.getElementsByClassName("flexlayout__layout");
    if (init && flexObj !== undefined) {
      if (query !== "") {
        flexObj[0].style.width = '55vw'
        flexObj[0].style.left = "20vw"; // 根据是否有查询更新页面布局
        setSelectRepo("aaaa");
      } else {
        flexObj[0].style.width = '75vw'
        flexObj[0].style.left = "0";
        setMaximize("width");
      }
    }
  }, [query]);

  useEffect(() => {
    // console.log('selectRepo1', selectRepo);
    if (init && selectRepo != "") {
      console.log("selectRepo2", selectRepo);
    }
  }, [selectRepo]);

  // 执行用户查询
  const searchRepo = (value, event) => {
    if (value !== query) {
      // 与上一次执行不同的查询才会执行新的查询
      setLoading(true);
      // getResult(value).then((res) => {
      //   setResult(res.data)
      //   setLoading(false)
      // });
    }
    setQuery(value); // 保存最新一次查询的值
  };

  return (
    <div id="main-container">
      <div id="header">
        <div id="engine-logo">
          <h1>VisRepo</h1>
        </div>
        <div id="search-container">
          <div id="search-interface">
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="midlle"
              onSearch={searchRepo}
            />
          </div>
        </div>
      </div>
      <div id="search-filter">
        <div id="result-filter"></div>
        <div id="time-filter">
          <TimeFilter></TimeFilter>
        </div>
      </div>
      <div id="search-result">
        {query && (
          <div id="list-container">
            <ResultList
              result={result}
              query={query}
              loading={loading}
            ></ResultList>
          </div>
        )}
        <Layout
          model={model}
          factory={factory}
          icons={{
            maximize: <>&#128470;&#xFE0E;</>,
            restore: <>&#128469;&#xFE0E;</>,
          }}
        />
      </div>
      <div id="repo-portrait">
        <RepoPortrait></RepoPortrait>
      </div>
    </div>
  );
};

export default Main;
