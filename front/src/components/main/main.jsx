import "./main.css";
import axios from "axios";
import { getResult, testConnect } from "../../apis/api";
import React, { useEffect, useState } from "react";
import ResultList from "../views/resultList";
import { Input } from "antd";
const { Search } = Input;

const Main = () => {
  const [query, setQuery] = useState("");

  // useEffect(() => {
  //     if(query !== ""){
  //     }
  // }, [query])

  const searchRepo = (value, event) => {
    if (value !== query) {
      getResult(value).then((res) => console.log(res));
    }
    setQuery(value); // 保存最新一次查询的值
  };

  return (
    <div id="main-container">
      <div id="header">
        <div id="engine-logo">
          <img src="./assets/img/logo.svg" className="App-logo"></img>
        </div>
        <div id="search-container">
          <div id="search-interface">
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={searchRepo}
            />
          </div>
        </div>
      </div>
      <div id="search-filter">过滤得选项</div>
      <div id="search-result">
        <ResultList></ResultList>
      </div>
    </div>
  );
};

export default Main;
