// component imports
import React from "react";
import Link from "next/link";
import { InputNumber, Form } from "antd";
import { api_path } from "../../db/path";
import { useRouter } from "next/router";

const LoginComponent = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values) => {
    // console.log(values);
    var bodyFormData = new FormData();

    bodyFormData.append("mobile", +values.mobile);
    // bodyFormData.append("password", values.password);

    try {
      const axios = (await import("axios")).default;

      await axios({
        method: "post",
        url: `${api_path}/api/login`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        console.log(response);
        sessionStorage.setItem("mobile", +values.mobile);
        router.push("/auth/OtpVerify");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <div className="header">
        <h2>Login Here</h2>
        <div className="breadcrumb">
          <Link href="/">
            <a className="active">Home</a>
          </Link>
          <span>{">"}</span>
          <Link href="/auth/Login">Login</Link>
        </div>
      </div>

      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name="mobile"
          label="Mobile Number"
          className="input-container"
          rules={[{ required: true, type: "number" }]}
        >
          <InputNumber size="large" maxLength={10} />
        </Form.Item>

        <button>Send OTP</button>
        <p className="auth-bottom-text">
          Don&apos;t have an account?{" "}
          <span onClick={() => router.push("/auth/SignUp")}>Register here</span>
        </p>
      </Form>
    </div>
  );
};

export default LoginComponent;
