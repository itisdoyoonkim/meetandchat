import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { CommentOutlined } from "@ant-design/icons";

function MenuBar() {
  const { SubMenu } = Menu;

  return (
    <>
      <Menu
        // onClick={this.handleClick}
        // selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="mail" icon={<CommentOutlined />}>
          <Link to="/">GROUP CHAT</Link>
        </Menu.Item>
        <Menu.Item key="app" icon={<CommentOutlined />}>
          <Link to="/meetup">INSTANT MEETUP</Link>
        </Menu.Item>
        <Menu.Item key="new" icon={<CommentOutlined />}>
          <Link to="/meetup/new">NEW MEETUP</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default MenuBar;
