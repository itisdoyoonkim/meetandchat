import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  CommentOutlined,
  MessageOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

function MenuBar() {
  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="open-chat" icon={<CommentOutlined />}>
          <Link to="/">오픈 챗</Link>
        </Menu.Item>
        <Menu.Item key="instant-meetup" icon={<MessageOutlined />}>
          <Link to="/meetup">밋업</Link>
        </Menu.Item>
        <Menu.Item key="new" icon={<PlusCircleOutlined />}>
          <Link to="/meetup/new">새 밋업 만들기</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default MenuBar;
