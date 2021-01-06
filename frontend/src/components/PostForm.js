import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Card, Divider, Form, Input, Button, Col } from "antd";
import {
  CommentOutlined,
  WarningOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

function PostForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [totalNumberOfCharacters, setTotalNumberOfCharacters] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [errors, setErrors] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    // console.log(e.target.value.split(/\r?\n/));
    setDescription(e.target.value.split(/\r?\n/));
    // limitCharacters(e.target.value.split(/\r?\n/))
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };
  const handleTagsChange = (e) => {
    console.log(e.target.value.replace(/\s/g, "").split(" "));
    setTags(e.target.value.replace(/\s/g, "").split(" "));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const config = {
      headers: { "Content-type": "application/json" },
    };
    const body = JSON.stringify({ title, description, link, tags });

    try {
      await axios.post("/meetups", body, config);
      props.history.push("/meetup");
    } catch (error) {
      setErrors([...errors, ...error.response.data.errors]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
      console.log(error.response.data.errors);
    }
  };

  const displayError = (fieldName) => {
    for (let i = 0; i < errors.length; i++) {
      if (errors[i].param === fieldName) {
        return errors[i].msg;
      }
    }
  };

  // const limitCharacters = (description) => {
  //   console.log(description);
  //   let characters = 0;
  //   for (let i = 0; i < description.length; i++) {
  //     // characters = characters + i.length;
  //     characters = characters + description[i].length;
  //   }
  //   console.log(`total of ${characters}`);
  //   setTotalNumberOfCharacters(characters);
  // };

  const [form] = Form.useForm();

  useEffect(() => {
    const el = document.getElementById("form-card");
    window.scrollTo({
      top: el.offsetHeight,
      behavior: "smooth",
    });

    return () => {
      // cleanup
    };
  }, [showPreview]);

  const DisplayPreview = () => {
    return (
      <section style={{ marginTop: "7px" }}>
        <Card
          bordered={false}
          style={{
            backgroundColor: "#fefefa",
          }}
        >
          <section>
            <h4>{title}</h4>
          </section>

          <Divider />

          <section>
            {description
              ? description.map((sentence) => {
                  return (
                    <p style={{ overflowWrap: "break-word" }}>{sentence}</p>
                  );
                })
              : null}

            <br />
            <Button>
              <CommentOutlined /> 입장
            </Button>
          </section>
          <small>
            <h4>링크 미리보기를 참고하셔서 수상한 링크로 부터 보호하세요.</h4>
            <WarningOutlined /> 링크 미리보기: {link.split("").slice(0, 35)}
            ...
          </small>
        </Card>
      </section>
    );
  };

  return (
    <>
      <Card style={{ marginTop: "10px" }} id="form-card">
        <h1 style={headingOneStyle}>
          카카오톡 오픈 채팅을 활용해서 새로운 모임을 시작해보세요.
        </h1>

        <Form
          layout="vertical"
          form={form}
          initialValues={{
            layout: "horizontal",
          }}
          onFinish={handleSubmit}
          onFinishFailed={() => console.log("failed")}
        >
          <Form.Item label="태그를 입력해 주세요 (최대 3개)">
            <Input
              placeholder="#술, #토요일, #다운타운"
              onChange={(e) => handleTagsChange(e)}
            />
          </Form.Item>

          <Form.Item label="제목" name="title">
            <Input
              placeholder={displayError("title")}
              autoFocus
              name="title"
              value={title}
              onChange={(e) => handleTitleChange(e)}
            />
          </Form.Item>
          <Form.Item label="내용 (1-100자)" name="description">
            <Input.TextArea
              maxLength="100"
              rows={3}
              placeholder={displayError("description")}
              name="description"
              value={description}
              onChange={(e) => handleDescriptionChange(e)}
            />
          </Form.Item>
          <Form.Item label="오픈 채팅 링크" name="link">
            <Input
              placeholder={displayError("link")}
              name="link"
              value={link}
              onChange={(e) => handleLinkChange(e)}
            />
            <h5>예시) https://open.kakao.com/o/...</h5>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => setShowPreview(!showPreview)}>
              미리보기
              {!showPreview ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </Button>
          </Form.Item>

          {showPreview ? (
            <Form.Item>
              <Button htmlType="submit">작성</Button>
            </Form.Item>
          ) : null}
        </Form>
      </Card>
      {showPreview ? <DisplayPreview /> : null}
    </>
  );
}

const headingOneStyle = {
  fontSize: ".9rem",
  marginBottom: "30px",
  // textAlign: "center",
};

export default withRouter(PostForm);
