import React from "react";
import { Col, Row } from "antd";

import ChatCard from "./ChatCard";

function ChatCardList({ list }) {
  return (
    <Row gutter={16}>
      {list.map((chat) => {
        return (
          <Col
            key={chat.openlink}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={6}
            style={{ margin: "10px 0" }}
          >
            <ChatCard chat={chat} />
          </Col>
        );
      })}
    </Row>
  );
}

export default ChatCardList;
