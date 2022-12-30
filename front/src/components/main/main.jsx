import "./main.css";
import axios from "axios";
import { getResult, testConnect } from "../../apis/api";
import React, { useEffect, useState } from "react";
import ResultList from "../views/resultList";
import { Input } from "antd";
const { Search } = Input;

const Main = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if(result !== []){
        console.log(result);
      }
  }, [result])

  // 执行用户查询
  const searchRepo = (value, event) => {
    if (value !== query) {  // 与上一次执行不同的查询才会执行新的查询
      setLoading(true)
      getResult(value).then((res) => {
        setResult(res.data)
        setLoading(false)
      });
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
        <div id="list-container">
        <ResultList result={result} query={query} loading={loading}></ResultList>
        </div>
      </div>
    </div>
  );
};

export default Main;
