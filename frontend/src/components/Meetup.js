import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Divider } from "antd";
import { CommentOutlined, WarningOutlined } from "@ant-design/icons";

import axios from "axios";

function Meetup() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get("/meetup", {
        headers: { "Access-Control-Allow-Origin": "*" },
      });

      // console.log("data:", res.data);
      setPosts(res.data);
    }
    fetchPosts();
    return () => {};
  }, []);

  // console.log(new Date("2020-12-28T06:30:09.743Z"));
  // console.log(posts);

  const test = (date) => {
    const localDateTime = new Date(date).toLocaleString();
    return `${localDateTime}`;
  };

  return (
    <div>
      <Row gutter={16}>
        {posts
          ? posts.map((post) => {
              return (
                <Col
                  key={post._id}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={6}
                  style={{ margin: "10px 0" }}
                >
                  <Card title={post.title}>
                    <p>{post.description}</p>
                    <section>
                      <a
                        aria-label="Link to enter chat room"
                        href={post.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <br />
                        {post.link ? (
                          <Button>
                            <CommentOutlined /> 입장
                          </Button>
                        ) : null}
                      </a>
                    </section>
                    <small>
                      {post.link ? (
                        <>
                          <WarningOutlined /> 링크 미리보기:{" "}
                          {post.link.split("").slice(0, 35)}
                          ...
                        </>
                      ) : (
                        "개설한 대화방이 없습니다"
                      )}
                    </small>
                    <Divider orientation="right" plain>
                      <section>{test(post.date)}</section>
                    </Divider>
                  </Card>
                </Col>
              );
            })
          : null}
      </Row>
    </div>
  );
}

export default Meetup;
