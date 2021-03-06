import { useEffect, useState } from "react";
import axios from "axios";
import { Affix, Button } from "antd";
import { BarsOutlined } from "@ant-design/icons";

import FilterBar from "./FilterBar";
import ChatCardList from "./ChatCardList";

import muzi from "../muzi.png";

import "../App.css";

function OpenChatPage() {
  const [openChatList, setOpenChatList] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    async function fetchOpenChatList() {
      const res = await axios.get("/getLinks", {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      setOpenChatList(res.data);

      let tagsArray = [];
      for (let i = 0; i < res.data.length; i++) {
        tagsArray.push(
          ...res.data[i].tags.map((tag) => {
            return tag;
          })
        );
      }
      let duplicateRemovedTagsArray = [...new Set(tagsArray)];

      setTags([...tags, duplicateRemovedTagsArray]);
    }

    fetchOpenChatList();
    return () => {};
  }, []);

  function handleFilter(list) {
    return list.filter((each) => {
      return each.tags.includes(selectedTag);
    });
  }

  function resetFilter() {
    return setSelectedTag("");
  }

  const LoadingImage = () => {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <img
          id="loading"
          src={muzi}
          style={{ width: "100px", borderRadius: "999px" }}
          alt="ryan"
        />
      </div>
    );
  };

  return (
    <>
      {selectedTag ? (
        <Button
          onClick={resetFilter}
          icon={<BarsOutlined />}
          style={{ margin: "5px 0" }}
        >
          리스트 리셋
        </Button>
      ) : null}
      <Affix offsetTop={45}>
        <FilterBar
          selectedTagValue={selectedTag}
          tags={tags}
          filterList={(tag) => setSelectedTag(tag)}
        />
      </Affix>
      {openChatList.length > 0 ? (
        <ChatCardList
          list={selectedTag ? handleFilter(openChatList) : openChatList}
        />
      ) : (
        <LoadingImage />
      )}
    </>
  );
}

export default OpenChatPage;
