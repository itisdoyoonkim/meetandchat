import React, { useState } from "react";
import { Divider, Card, Button } from "antd";
import {
  HeartFilled,
  HeartOutlined,
  TeamOutlined,
  TagsOutlined,
  CommentOutlined,
  LockOutlined,
} from "@ant-design/icons";

import placeholderProfileImgTwo from "../siteLogo.png";

function ChatCard({ chat }) {
  // console.log(chat.lastchat);
  // const localTime = new Date(chat.lastchat).getTime();

  const [profileImageErrorMessage, setProfileImageErrorMessage] = useState("");

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
                // setProfileImageErrorMessage("일시적인 문제로 인해 사진을 표시할 수 없습니다.");
              }}
              style={{ width: "80px", borderRadius: "99px" }}
              alt="kakaotalk open chat profile"
            />
            <br />
            <small>
              {profileImageErrorMessage ? profileImageErrorMessage : null}
            </small>
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
          return <span key={tag + Math.random()}>{tag} </span>;
        })}
      </section>

      <section>
        {/* Add 7 hours to display Vancouver time */}
        {/* <small>최근 메세지: {chat.lastchat}</small> */}
      </section>
    </Card>
  );
}

export default ChatCard;
