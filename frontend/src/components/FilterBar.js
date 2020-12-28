import React from "react";
import { Select, Button } from "antd";
import { TagsOutlined } from "@ant-design/icons";

function FilterBar({ tags, filterList }) {
  // const [selectedTag, setSelectedTag] = useState("");

  function handleChange(selectedTag) {
    filterList(selectedTag);
  }

  const { Option } = Select;

  const placeholder = <TagsOutlined />;

  return (
    <section>
      {/* <Select
        style={{ width: "100%" }}
        placeholder={placeholder}
        onChange={handleChange}
        optionLabelProp="label"
        autoFocus
      >
        {tags.sort().map((option) => {
          return (
            <Option value={option} label={option} key={option + Math.random()}>
              <div className="demo-option-label-item">{option}</div>
            </Option>
          );
        })}
      </Select> */}
      {/* {tags.sort().map((tag) => {
        return <Button style={{ marginRight: "2px" }}>{tag}</Button>;
      })} */}
    </section>
  );
}

export default FilterBar;
