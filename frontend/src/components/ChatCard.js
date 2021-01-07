import React from "react";
import { Divider, Card, Button, Tag } from "antd";
import {
  HeartFilled,
  TeamOutlined,
  TagsOutlined,
  CommentOutlined,
  LockOutlined,
} from "@ant-design/icons";

import placeholderProfileImgTwo from "../siteLogo.png";

function ChatCard({ chat }) {
  return (
    <Card
      bordered={false}
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <section>
            <h5>{"- " + chat.owner}</h5>
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
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={chat.pfimg}
              onError={(e) => {
                e.target.src = placeholderProfileImgTwo;
              }}
              style={{ width: "80px", borderRadius: "99px" }}
              alt="kakaotalk open chat profile"
            />
            <br />
          </section>
        </div>
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
          return <Tag key={tag + Math.random()}>{tag} </Tag>;
        })}
      </section>
    </Card>
  );
}

export default ChatCard;
