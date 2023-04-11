import React, { useState } from "react";
import { Form, Button, Input, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import SignupButton from "./SignupButton";
import { login } from "../utils";

const LoginForm = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    let placement = "topLeft";
    try {
      await login(data);

      notification.success({
        message: `Hello ${data.username}!`,
        description: "Sign in Successfully 🎉",
        duration: 2,
        placement,
      });
      onLoginSuccess();
    } catch (error) {
      notification.error({
        message: `Sorry!`,
        description: "Fail to Sign in 😭😭😭",
        duration: 3,
        placement,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 500, margin: "20px auto" }}>
      <Form onFinish={handleFormSubmit}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            disabled={loading}
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password disabled={loading} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Log in
          </Button>
          Or <SignupButton />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
