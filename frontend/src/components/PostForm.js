import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Card, Row, Col, Form, Input, Button } from "antd";

function PostForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const [errors, setErrors] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value.split(/\r?\n/));
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const config = {
      headers: { "Content-type": "application/json" },
    };
    const body = JSON.stringify({ title, description, link });

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

  const [form] = Form.useForm();

  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
  const buttonItemLayout = { wrapperCol: { span: 14, offset: 4 } };

  return (
    <Card style={{ marginTop: "10px" }}>
      {errors
        ? errors.map((e) => {
            return <h5>{e.msg}</h5>;
          })
        : null}
      <Form
        {...formItemLayout}
        layout="horizontal"
        form={form}
        initialValues={{
          layout: "horizontal",
        }}
        onFinish={handleSubmit}
        onFinishFailed={() => console.log("failed")}
      >
        <Form.Item label="제목" name="title">
          <Input
            placeholder=""
            autoFocus
            name="title"
            value={title}
            onChange={(e) => handleTitleChange(e)}
          />
        </Form.Item>
        <Form.Item label="내용 (1-100자)" name="description">
          <Input.TextArea
            rows={3}
            placeholder=""
            name="description"
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          />
        </Form.Item>
        <Form.Item label="오픈 챗 링크" name="link">
          <Input
            placeholder="https://open.kakao.com/o/..."
            name="link"
            value={link}
            onChange={(e) => handleLinkChange(e)}
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primady" htmlType="submit">
            작성
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default withRouter(PostForm);
