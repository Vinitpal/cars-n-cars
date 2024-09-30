import React, { useState } from "react";
import { Form, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useAppContext } from "../../context/state";
import { api_path } from "../../db/path";
import { useRouter } from "next/router";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

const VerficationOtp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { wait } = useAppContext();
  const userPhone = useSelector((state) => state.user.userPhone);
  const router = useRouter();

  const onFinish = async (values) => {
    // console.log(values);
    var bodyFormData = new FormData();

    const mobile = sessionStorage.getItem("sell_ur_car_mobile");
    // console.log(mobile);

    bodyFormData.append("mobile", +mobile);
    bodyFormData.append("otp", values.otp);

    try {
      const axios = (await import("axios")).default;

      await axios({
        method: "post",
        url: `${api_path}/api/verify_otp`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(true);
    wait(2000).then(() => {
      setLoading(false);
      router.push("/sellthankyou");
      // todo add notification in sir function
    });
  };

  return (
    <Form onFinish={onFinish} form={form} className="detail-form verify-otp">
      <h2>Please Enter One Time Password to verify your Account</h2>
      <Form.Item
        name="otp"
        label="Enter OTP"
        className="input-container"
        rules={[{ required: true }]}
      >
        <Input size="large" />
      </Form.Item>

      <p>
        <span>Resend</span> One Time Password
      </p>

      <button>
        {loading ? <Spin indicator={loadingIcon} /> : "Validate and Confirm"}
      </button>
    </Form>
  );
};

export default VerficationOtp;
