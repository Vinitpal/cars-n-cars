import React, { useState } from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import { api_path } from "../../db/path";
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
          console.log(response);

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
    <section className="seller-modal-section">
      <h2>Enquiry Form</h2>
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
          // name="mobile_number"
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

        <button type="submit">Submit Now</button>
      </Form>
    </section>
  );
};

const CarCta = ({ productData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    <React.Fragment>
      <button className={`connect ${isModalVisible && "hide"}`}>
        <a
          href="https://api.whatsapp.com/send?phone=7778889995&text=Hello,%20I%20am%20Interested%20for%20Deal"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect With Us
        </a>
      </button>
      <button
        className={`seller ${isModalVisible && "hide"}`}
        onClick={showModal}
      >
        Enquire Now
      </button>
      <Modal
        style={{
          top: "-10px",
          width: "100%",
          height: "100%",
        }}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="seller-detail-modal-phone"
      >
        <ModalContent
          v_id={productData.v_id}
          brand={productData.brand}
          model={productData.model}
          city={productData.location}
        />
      </Modal>
    </React.Fragment>
  );
};

export default CarCta;
