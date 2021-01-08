import React from "react";
import { Row, Card, Col, Tag, Divider, Button } from "antd";
import { CommentOutlined, WarningOutlined } from "@ant-design/icons";

function MeetupList({ list }) {
  const changeDateFormat = (date) => {
    const localDateTime = new Date(date).toLocaleString("ko-KR");
    return `${localDateTime}`;
  };

  const postDetail = (post) => {
    return (
      <>
        {post.description.map((sentence) => {
          return (
            <p key={post.description.indexOf(sentence)} style={textStyle}>
              {sentence}
            </p>
          );
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
              <h4>링크 미리보기를 참고하셔서 수상한 링크로 부터 보호하세요.</h4>
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
        {list
          ? list.map((post) => {
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
                      <div>
                        {post.tags
                          ? post.tags.map((tag) => {
                              return <Tag>#{tag} </Tag>;
                            })
                          : null}
                      </div>
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

export default MeetupList;
