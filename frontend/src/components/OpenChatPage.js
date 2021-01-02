import { useEffect, useState } from "react";
import axios from "axios";
import { Affix, Spin, Button } from "antd";
import { BarsOutlined } from "@ant-design/icons";

import FilterBar from "./FilterBar";
import ChatCardList from "./ChatCardList";

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
      setOpenChatList(res.data.result.lists);

      let tagsArray = [];
      for (let i = 0; i < res.data.result.lists.length; i++) {
        tagsArray.push(
          ...res.data.result.lists[i].tags.map((tag) => {
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

  const Spinner = () => {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
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
        <Spinner />
      )}
    </>
  );
}

export default OpenChatPage;
