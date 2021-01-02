import React from "react";
import { Divider, Card, Button } from "antd";
import {
  HeartFilled,
  HeartOutlined,
  TeamOutlined,
  TagsOutlined,
  CommentOutlined,
  LockOutlined,
} from "@ant-design/icons";

function ChatCard({ chat }) {
  // console.log(chat.lastchat.toLocaleString());

  return (
    <Card
      style={{
        backgroundColor: "#fefefa",
      }}
    >
      <section>
        <h4>
          {chat.locked
            ? [<LockOutlined style={{ color: "blue" }} />, " ", chat.name]
            : chat.name}
        </h4>
        <h5>{"- " + chat.owner}</h5>
      </section>

      <section>
        <a
          aria-label="Link to enter chat room"
          href={chat.openlink}
          target="_blank"
          rel="noreferrer"
        >
          <br />
          <Button>
            <CommentOutlined /> 입장
          </Button>
        </a>
      </section>

      <Divider plain>
        <section>
          <TeamOutlined /> {chat.headcount} /{" "}
          <HeartFilled style={{ color: "red" }} /> {chat.like}
        </section>
      </Divider>

      <section>
        <TagsOutlined />{" "}
        {chat.tags.map((tag) => {
          return <span key={tag + Math.random()}>{tag} </span>;
        })}
      </section>

      <section>
        {/* Add 7 hours to display Vancouver time */}
        <small>최근 메세지: {chat.lastchat}</small>
      </section>
    </Card>
  );
}

export default ChatCard;
