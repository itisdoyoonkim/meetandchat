import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Col,
  Row,
  Divider,
  Card,
  Button,
  Skeleton,
  Select,
  Carousel,
  PageHeader,
} from "antd";
import {
  HeartFilled,
  TeamOutlined,
  TagsOutlined,
  CommentOutlined,
  LockOutlined,
} from "@ant-design/icons";

function App() {
  const [openChatList, setOpenChatList] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchOpenChatList() {
      const res = await axios.get("/getLinks", {
        headers: { "Access-Control-Allow-Origin": "*" },
      });

      setOpenChatList(res.data.result.lists);
      // setTags(res.data.result.lists)
    }

    fetchOpenChatList();

    return () => {};
  }, []);

  function renderOpenChatList() {
    return openChatList.map((chat) => {
      return (
        <Col span={6} style={{ margin: "10px 0" }}>
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
                    ? [
                        <LockOutlined style={{ color: "blue" }} />,
                        " ",
                        chat.name,
                      ]
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
                return <span>{tag} </span>;
              })}
            </section>

            <section>
              <small>최근 메세지: {chat.lastchat}</small>
            </section>
          </Card>
        </Col>
      );
    });
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const { Option } = Select;
  const { Meta } = Card;

  return (
    <>
      <div className="container">
        <section>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select one or more hashtags"
            defaultValue={["운동"]}
            onChange={handleChange}
            optionLabelProp="label"
          >
            <Option value="china" label="China">
              <div className="demo-option-label-item">
                <span role="img" aria-label="China">
                  🇨🇳
                </span>
                China (中国)
              </div>
            </Option>
            <Option value="usa" label="USA">
              <div className="demo-option-label-item">
                <span role="img" aria-label="USA">
                  🇺🇸
                </span>
                USA (美国)
              </div>
            </Option>
            <Option value="japan" label="Japan">
              <div className="demo-option-label-item">
                <span role="img" aria-label="Japan">
                  🇯🇵
                </span>
                Japan (日本)
              </div>
            </Option>
            <Option value="korea" label="Korea">
              <div className="demo-option-label-item">
                <span role="img" aria-label="Korea">
                  🇰🇷
                </span>
                Korea (韩国)
              </div>
            </Option>
          </Select>
        </section>

        {/* ADVERTISEMENT */}
        <section>
          <Carousel autoplay>
            <article>
              <h3 style={contentStyle}>Ad 1</h3>
            </article>
            <article>
              <h3 style={contentStyle}>Ad 2</h3>
            </article>
            <article>
              <h3 style={contentStyle}>Ad 3</h3>
            </article>
            <article>
              <h3 style={contentStyle}>Ad 4</h3>
            </article>
          </Carousel>
        </section>

        {openChatList.length > 0 ? (
          <Row gutter={16}>{renderOpenChatList()}</Row>
        ) : (
          <Skeleton active />
        )}
      </div>
    </>
  );
}

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default App;
