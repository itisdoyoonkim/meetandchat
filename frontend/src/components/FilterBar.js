import React from "react";
import { Select } from "antd";
import { TagsOutlined } from "@ant-design/icons";

function FilterBar({ tags, filterList, selectedTagValue }) {
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
    <section style={{ margin: "5px 0" }}>
      <Select
        style={{ width: "100%" }}
        placeholder={placeholder}
        onChange={handleChange}
        optionLabelProp="label"
        value={selectedTagValue ? selectedTagValue : placeholder}
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
  );
}

export default FilterBar;
