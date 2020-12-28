import React from "react";
import { Select } from "antd";
import { TagsOutlined } from "@ant-design/icons";

function FilterBar({ tags }) {
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  console.log("From FilterBar:", tags);

  const { Option } = Select;

  const placeholder = <TagsOutlined />;

  return (
    <section>
      <Select
        // mode="tags"
        style={{ width: "100%" }}
        placeholder={placeholder}
        onChange={handleChange}
        optionLabelProp="label"
        autoFocus
      >
        {tags.sort().map((option) => {
          return (
            <Option value={option} label={option}>
              <div className="demo-option-label-item">{option}</div>
            </Option>
          );
        })}
      </Select>
    </section>
  );
}

export default FilterBar;
