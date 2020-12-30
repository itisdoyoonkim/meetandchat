import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Card, Row, Col, Form, Input, Button } from "antd";

function PostForm(props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      title: e.target.value,
      description: e.target.value.split(/\r?\n/),
      link: e.target.value,
      // [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log(formData);

    const config = {
      headers: { "Content-type": "application/json" },
    };
    const body = JSON.stringify(formData);

    await axios.post("/meetups", body, config);

    props.history.push("/meetup");
  };

  const [form] = Form.useForm();

  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
  const buttonItemLayout = { wrapperCol: { span: 14, offset: 4 } };

  return (
    <Card style={{ marginTop: "10px" }}>
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
            value={formData.title}
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
        <Form.Item label="한 줄 내용" name="description">
          <Input.TextArea
            rows={10}
            placeholder=""
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
        <Form.Item label="오픈 챗 링크" name="link">
          <Input
            placeholder="https://open.kakao.com/o/..."
            name="link"
            value={formData.link}
            onChange={(e) => handleChange(e)}
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
