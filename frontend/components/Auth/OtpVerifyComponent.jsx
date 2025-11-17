import Link from "next/link";
import { api_path } from "../../db/path";
import React from "react";

import { Input, Form } from "antd";

const OtpVerifyComponent = () => {
  const onFinish = async (values) => {
    // console.log(values);

    var bodyFormData = new FormData();
    const mobile = sessionStorage.getItem("mobile");
    bodyFormData.append("otp", +values.otp);
    bodyFormData.append("mobile", +mobile);
    // bodyFormData.append("password", values.password);

    try {
      const axios = (await import("axios")).default;

      await axios({
        method: "post",
        url: `${api_path}/api/verify_otp`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        console.log(response);
        // store session
        // redirect to dashboard
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container verify-otp">
      <div className="header">
        <h2>OTP Verification</h2>
        <div className="breadcrumb">
          <Link href="/" className="active">
            Home
          </Link>
          <span>{">"}</span>
          <Link href="/auth/OtpVerify">Verify OTP</Link>
        </div>
      </div>
      <Form onFinish={onFinish}>
        <p className="otp-header">
          Please Enter One Time Password to verify your Account
        </p>

        <Form.Item name="otp" label="Enter OTP" className="input-container">
          <Input size="large" minLength={6} maxLength={6} />
        </Form.Item>

        <p>
          <span>Resend</span> One Time Password
        </p>

        <button>Validate and Confirm</button>
      </Form>
    </div>
  );
};

export default OtpVerifyComponent;
