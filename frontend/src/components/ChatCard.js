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
  const { Meta } = Card;

  return (
    <Card
      style={{
        backgroundColor: "#fefefa",
      }}
    >
      <section>
        {/* <img
          src={chat.wp}
          alt="room-img"
          style={{
            // borderRadius: "99px",
            marginBottom: "10px",
            width: "100%",
            height: "60%",
            // position: "absolute",
            // top: "10px",
            // right: "10px",
          }}
        /> */}
        <Meta
          title={
            chat.locked
              ? [<LockOutlined style={{ color: "blue" }} />, " ", chat.name]
              : chat.name
          }
          description={"- " + chat.owner}
        />
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
