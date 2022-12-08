import './main.css'
import axios from 'axios';
import { getResult, testConnect } from '../../apis/api';
import React, { useEffect, useState} from "react";
import { Input } from 'antd';
const { Search } = Input;



const Main = () => {
    const [query, setQuery] = useState("")

    // useEffect(() => {
    //     if(query !== ""){
    //     }
    // }, [query])

    const searchRepo = (value, event) =>{
        if(value !== query){
            getResult(value).then((res) => console.log(res));
        }
        setQuery(value)   // 保存最新一次查询的值
    }


    return (
        <div id="main-container">
            <div id="header">
                <img src="./assets/img/logo.svg"  className="App-logo" ></img>
            </div>
            <div id="search-container">
                <div id="search-interface">
                <Search placeholder="input search text" enterButton="Search" size="large" onSearch={ searchRepo } />
                </div>
               
            </div>
            <div id="search-result"></div>
        </div>

    )

}

export default Main;