import React, { useState } from "react";
import { Select, Button } from "antd";
import {
  TagsOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

function FilterBar({ tags, filterList }) {
  const [viewTags, setViewTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  // console.log(tags);

  function handleChange(selectedTag) {
    filterList(selectedTag);
  }

  const { Option } = Select;

  const placeholder = (
    <>
      <TagsOutlined /> 태그를 선택해주세요
    </>
  );

  return (
    <div style={{ margin: "5px 0" }}>
      <section>
        <Select
          style={{ width: "100%" }}
          placeholder={placeholder}
          onChange={handleChange}
          optionLabelProp="label"
          autoFocus
        >
          {tags[0]
            ? tags[0].sort().map((option) => {
                return (
                  <Option
                    value={option}
                    label={option}
                    key={option + Math.random()}
                  >
                    <div className="demo-option-label-item">{option}</div>
                  </Option>
                );
              })
            : null}
        </Select>
      </section>
      {/* <Button onClick={() => setViewTags(!viewTags)}>
        {viewTags
          ? ["Hide all tags", <EyeInvisibleOutlined />]
          : ["See all tags", <EyeOutlined />]}
      </Button>

      {viewTags ? (
        <section style={{ margin: "10px 0" }}>
          {tags[0].sort().map((tag) => {
            return <Button style={{ margin: "1px" }}>{tag}</Button>;
          })}
        </section>
      ) : null} */}
    </div>
  );
}

export default FilterBar;
