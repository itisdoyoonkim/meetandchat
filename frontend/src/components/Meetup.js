import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Divider } from "antd";
import { CommentOutlined, WarningOutlined } from "@ant-design/icons";

import axios from "axios";

function Meetup() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get("/meetups", {
        headers: { "Access-Control-Allow-Origin": "*" },
      });

      setPosts(res.data);
    }
    fetchPosts();
    return () => {};
  }, []);

  // console.log(new Date("2020-12-28T06:30:09.743Z"));
  // console.log(posts);

  const changeDateFormat = (date) => {
    const localDateTime = new Date(date).toLocaleString("ko-KR");
    return `${localDateTime}`;
  };

  const postDetail = (post) => {
    return (
      <>
        {post.description.map((sentence) => {
          return <p style={textStyle}>{sentence}</p>;
        })}
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
              <h4>링크 미리보기를 참고하시고 수상한 링크는 누르지 마세요.</h4>
              <WarningOutlined /> 링크 미리보기:{" "}
              {post.link.split("").slice(0, 35)}
              ...
            </>
          ) : (
            "개설한 대화방이 없습니다"
          )}
        </small>
      </>
    );
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
                  <Card
                    loading={!post ? true : false}
                    bordered={false}
                    style={{
                      backgroundColor: "#fefefa",
                    }}
                  >
                    <section>
                      <h4>{post.title}</h4>
                    </section>

                    <Divider />

                    {postDetail(post)}
                    <Divider orientation="right" plain>
                      <section>{changeDateFormat(post.date)}</section>
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

const textStyle = {
  overflowWrap: "break-word" /* CSS3 */,
};

export default Meetup;
