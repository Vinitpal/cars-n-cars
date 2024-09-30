import React, { useState } from "react";
import { api_path } from "../../db/path";
import { MdVerified } from "react-icons/md";
import { Modal, Form, Input, InputNumber } from "antd";
import { IoSpeedometerOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const ModalContent = ({ v_id, brand, model, city }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values) => {
    // console.log(values);
    var bodyFormData = new FormData();

    bodyFormData.append("email", values.email);
    bodyFormData.append("name", values.name);
    bodyFormData.append("phone", values.phone);
    bodyFormData.append("v_id", v_id);
    bodyFormData.append("uid", 1);

    try {
      const axios = (await import("axios")).default;

      await axios({
        method: "post",
        url: `${api_path}/api/enquiry`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(async function (response) {
          // console.log(response);

          const category = router.pathname.split("/")[1];

          const emailjs = (await import("@emailjs/browser")).default;

          await emailjs.send(
            process.env.NEXT_PUBLIC_SERVICE_ID,
            process.env.NEXT_PUBLIC_ENQUIRY_TEMPLATE_ID,
            {
              brand: brand,
              model: model,
              name: values.name,
              mobile: values.phone,
              email: values.email,
              page: `${category}/${brand}_${model}_in_${city}?id=${v_id}`,
            },
            process.env.NEXT_PUBLIC_USER_ID
          );
        })
        .then(() => router.push("/usedthankyou"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Form className="seller-detail-cta-form" onFinish={onFinish} form={form}>
        <Form.Item
          name="name"
          label="Full Name"
          className="input-container"
          rules={[{ required: true, type: "string" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Mobile Number"
          className="input-container"
          rules={[{ required: true, type: "number" }]}
        >
          <InputNumber size="large" minLength={9} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          className="input-container"
          rules={[{ required: true }]}
        >
          <Input type="email" size="large" />
        </Form.Item>

        <button type="submit">Submit</button>
      </Form>
    </section>
  );
};

const CarInfo = ({ productData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="car-info border-pc">
      <div className="title">
        <h2>{productData.brand + " " + productData.model}</h2>
        {productData.verified && <MdVerified className="icon" />}
      </div>

      <div className="engine">
        <p>{productData.variant}</p>
        <p>{productData.cc + " cc"}</p>
        <p>{productData.bodyType}</p>
      </div>

      <div className="price">
        <p>
          <IoSpeedometerOutline className="icon" />{" "}
          {productData.kilometerDriven} KMS
        </p>
        <h1>
          <span>₹ </span> {(+productData.price).toLocaleString("en-IN")}
        </h1>
      </div>

      <div className="fav-cta" style={{}}>
        <h3 style={{ textAlign: "right", width: "100%" }}>
          <span>₹ </span> {(+productData.price + 20000).toLocaleString("en-IN")}
        </h3>
      </div>

      <div className="location">
        <p>{productData.location}</p>
        <p>{productData.regState}</p>
      </div>

      <div className="cta-btns">
        <button className="seller" onClick={showModal}>
          Enquire Now
        </button>

        <button className="connect">
          <a
            href="https://api.whatsapp.com/send?phone=7778889995&text=Hello,%20I%20am%20Interested%20for%20Deal"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block" }}
          >
            Connect With Us
          </a>
        </button>
      </div>

      <Modal
        title="Enquire Now"
        style={{
          top: "20%",
          width: "100%",
          height: "100%",
        }}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalContent
          v_id={productData.v_id}
          brand={productData.brand}
          model={productData.model}
          city={productData.location}
        />
      </Modal>
    </div>
  );
};

export default CarInfo;
