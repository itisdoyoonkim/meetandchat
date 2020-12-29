import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton, Button, Affix } from "antd";

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
    // console.log("useEfect ran");
    return () => {};
  }, []);

  function searchMatchingChat(list) {
    return list.filter((each) => {
      return each.tags.includes(selectedTag);
    });
  }

  return (
    <>
      <Affix offsetTop={0}>
        <FilterBar tags={tags} filterList={(tag) => setSelectedTag(tag)} />
      </Affix>
      {openChatList.length > 0 ? (
        <ChatCardList
          list={selectedTag ? searchMatchingChat(openChatList) : openChatList}
        />
      ) : (
        <Skeleton active />
      )}
    </>
  );
}

export default OpenChatPage;