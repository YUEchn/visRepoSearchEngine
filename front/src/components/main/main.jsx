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
            testConnect().then((res) => console.log(res))
            // getResult(value)
        }
        setQuery(value)   // 保存最新一次查询的值
    }

    const bt = () =>{
        
        // axios.post("http://localhost:3008/getResult").then((res) =>{
        //     console.log(res, res.data);
        // })

        // testConnect()
        getResult()

    }


    return (
        <div id="main-container">
            <div id="header">
                <img src="./assets/img/logo.svg"  className="App-logo" ></img>
            </div>
            <div id="search-container">
                <div id="search-interface">
                {/* <Search placeholder="input search text" enterButton="Search" size="large" onSearch={ searchRepo } /> */}
                <button onClick={bt}></button>
                </div>
               
            </div>
            <div id="search-result"></div>
        </div>

    )

}

export default Main;