import React from "react";
import { useState } from "react";
import { LikeOutlined, StarOutlined, EyeOutlined } from "@ant-design/icons";
import { Typography, List, Space, Tag } from "antd";
import parse from "html-react-parser";
import "./resultList.css";
import { useEffect } from "react";
const { Paragraph } = Typography;

const ResultList = ({ result, query, loading }) => {
  const repoList = result;
  const [rows, setRows] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [expandable, setExpandable] = useState(true);
  const [init, setInit] = useState(false);
  const [listKey, setListKey] = useState({});
  const [listFold, setListFold] = useState({});

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    console.log('listFold', listFold);
  }, [listFold]);


  useEffect(() => {
    if (init && repoList !== undefined) {
      for (let i = 0; i < repoList.length; i++) {
        let key = repoList[i].repoName;
        let tempKey = { [key]: repoList[i].repoName + "$" + i };
        let tempFold = { [key]: true };
        setListKey((p) => ({ ...p, ...tempKey }));
        setListFold((p) => ({ ...p, ...tempFold }));
      }
    }
  }, [repoList]);

  const onExpand = (e) => {
    let curRepo = e.target.parentNode.id.split("$")[0];
    let tempFold = { [curRepo]: false };
    setListFold((p) => ({ ...p, ...tempFold }));
  };
  const onCollapse = (e) => {
    let curRepo = e.target.parentNode.parentNode.id.split("$")[0];
    let tempFold = { [curRepo]: true };
    let tempKeyNumber =
      parseInt(e.target.parentNode.parentNode.id.split("$")[1]) + 1;
    let tempKey = { [curRepo]: [curRepo] + "$" + tempKeyNumber };
    setListFold((p) => ({ ...p, ...tempFold }));
    setListKey((p) => ({ ...p, ...tempKey }));
  };
  // 高亮相同的tag
  const highlightTag = (e) => {
    let currTopic = e.target.innerText.replace(/\-|\_/g, " ");
    let elements = document.querySelectorAll(
      `${"span[value='" + currTopic + "']"}`
    );
    for (let i of elements) {
      i.classList.add("tagSelected");
    }
  };

  const highlightRemove = () => {
    let elements = document.querySelectorAll("span[type=topicSpan]");
    for (let i of elements) {
      i.classList.remove("tagSelected");
    }
  };
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <>
      <div id="repo-list-title">
        <p>&nbsp;Repositories list</p>
        {query && (
          <label>
            searching " {query} ": {repoList.length} results&nbsp;&nbsp;
          </label>
        )}
      </div>
      <div id="repo-list-content">
        {init && (
          <List
            itemLayout="vertical"
            size="small"
            loading={loading}
            dataSource={repoList}
            pagination={{
              pageSize: pageSize,
              size:"small",
              onChange: (curPage, curSize) => setPageSize(curSize)
            }}
            renderItem={(item) => (
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
                  title={<a href={item.htmlUrl}>{item.highlight.hasOwnProperty("repoName")?parse(item.highlight.repoName[0]): item.repoName}</a>}
                />
                {
                  !item.highlight.hasOwnProperty("topics")?
                    item.topics.map((topic) => {
                      return (
                        <Tag
                          type="topicSpan"
                          value={topic.replace(/\-|\_/g, " ").toLowerCase()}
                          onMouseOver={highlightTag}
                          onMouseOut={highlightRemove}
                        >
                          {topic}
                        </Tag>
                      );
                    })
                  : (() => {
                    let htemp = [];
                    let temp = item.highlight.topics.map((t) => {
                      let tt = t.replaceAll("<em>", "").replaceAll("</em>", "").toLowerCase()
                      let ttt = t.replaceAll("<em>", "<b>").replaceAll("</em>", "</b>")
                      htemp.push(ttt);
                      return tt;
                    });
                    let tags = item.topics.map((topic) => {
                      if (temp.includes(topic.toLowerCase())) {
                        return (
                          <Tag
                            type="topicSpan"
                            value={topic.replace(/\-|\_/g, " ").toLowerCase()}
                            onMouseOver={highlightTag}
                            onMouseOut={highlightRemove}
                          >
                          {parse(htemp[temp.indexOf(topic.toLowerCase())])}
                          </Tag>
                        );
                      } else {
                        return (
                          <Tag
                            type="topicSpan"
                            value={topic.replace(/\-|\_/g, " ").toLowerCase()}
                            onMouseOver={highlightTag}
                            onMouseOut={highlightRemove}
                          >
                            {topic}
                          </Tag>
                        );
                      }
                    })
                    return tags
                  })()
                }
                <Paragraph
                  key={listKey[item.repoName]}
                  id={listKey[item.repoName]}
                  ellipsis={{
                    rows,
                    symbol: "v",
                    expandable,
                    onExpand: onExpand,
                  }}
                >
                  {item.highlight.hasOwnProperty("description")?parse(item.highlight.description[0].replaceAll("<em>", "<b>").replaceAll("</em>", "</b>")): item.description}
                  {!listFold[item.repoName] && (
                    <span className="value-collapse" onClick={onCollapse}>
                      <a> ^</a>
                    </span>
                  )}
                </Paragraph>
              </List.Item>
            )}
          />
        )}
      </div>
    </>
  );
};

export default ResultList;
