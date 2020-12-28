import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "antd";

import Header from "./components/Header";
import Advertisement from "./components/Advertisement";
import ChatCardList from "./components/ChatCardList";
import FilterBar from "./components/FilterBar";

import "./App.css";

function App() {
  const [openChatList, setOpenChatList] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

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

      setTags([...duplicateRemovedTagsArray]);
    }

    fetchOpenChatList();

    return () => {};
  }, []);

  function filterList(selectedTag) {
    console.log(selectedTag);
  }

  return (
    <>
      <div className="container">
        <Header />
        <FilterBar tags={tags} filterList={(tag) => filterList(tag)} />

        <Advertisement />

        {openChatList.length > 0 ? (
          <ChatCardList list={openChatList} />
        ) : (
          <Skeleton active />
        )}
      </div>
    </>
  );
}

export default App;
