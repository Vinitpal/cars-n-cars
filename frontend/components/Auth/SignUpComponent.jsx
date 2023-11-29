// component imports
import Link from "next/link";
import { InputNumber, Input, Form, Radio } from "antd";
import { api_path } from "../../db/path";
import { useRouter } from "next/router";
import React from "react";

const SignUpComponent = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  // ---* todo track user location and get city from there
  const onFinish = async (values) => {
    console.log(values);

    try {
      const axios = (await import("axios")).default;

      await axios({
        method: "post",
        url: `${api_path}/api/v1/auth/register`,
        data: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (response) {
        if (response.status === 201) {
          console.log(response);
          sessionStorage.setItem("phone", +values.phone);
          router.push("/registerSuccess");
        } else {
          console.log(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container sign-up">
      <div className="header">
        <h2>Register Here</h2>
        <div className="breadcrumb">
          <Link href="/">
            <a className="active">Home</a>
          </Link>
          <span>{">"}</span>
          <Link href="/auth/SignUp">Sign Up</Link>
        </div>
      </div>

      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name="name"
          label="Full Name"
          className="input-container"
          rules={[{ required: true, type: "string" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          className="input-container"
          rules={[{ required: true, type: "email" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Mobile Number"
          className="input-container"
          rules={[{ required: true, type: "number" }]}
        >
          <InputNumber size="large" minLength={10} maxLength={10} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          className="input-container"
          rules={[{ required: true, type: "password" }]}
        >
          <Input size="large" type="password" />
        </Form.Item>

        <Form.Item
          name="userRole"
          label="Are you?"
          rules={[{ required: true }]}
          className="input-container"
        >
          <Radio.Group size="large">
            <Radio.Button value="User">User</Radio.Button>
            <Radio.Button value="Dealer">Dealer</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <button>Register Now</button>
        <p className="auth-bottom-text">
          Already have an account?{" "}
          <span>
            <a href={`${api_path}/admin`} target="_blank">
              Login here
            </a>
          </span>
        </p>
      </Form>
    </div>
  );
};

export default SignUpComponent;
