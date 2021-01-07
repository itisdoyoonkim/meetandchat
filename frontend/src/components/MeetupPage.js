import React, { useEffect, useState } from "react";
import { Button, Affix } from "antd";
import { BarsOutlined } from "@ant-design/icons";

import FilterBar from "./FilterBar";
import MeetupList from "./MeetupList";

import axios from "axios";

function Meetup() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get("/meetups", {
        headers: { "Access-Control-Allow-Origin": "*" },
      });

      setPosts(res.data);

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
    fetchPosts();

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

  return (
    <div>
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
          tags={tags}
          selectedTagValue={selectedTag}
          filterList={(tag) => setSelectedTag(tag)}
        />
      </Affix>
      <MeetupList list={selectedTag ? handleFilter(posts) : posts} />
    </div>
  );
}

export default Meetup;
