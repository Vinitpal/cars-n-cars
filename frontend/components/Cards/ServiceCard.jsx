// next js imports
import Image from "next/image";
import { useState } from "react";

import { DatePicker } from "antd";
import moment from "moment";

import { LoadingOutlined } from "@ant-design/icons";

import { useRouter } from "next/router";
import { Spin } from "antd";
import { Form } from "antd";
import { Modal } from "antd";
import { Input } from "antd";
import { InputNumber } from "antd";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

const ModalContent = ({ selectedPlan }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const disabledTime = () => ({
    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 18, 19, 20, 21, 22, 23],
  });

  const [timeValue, setTimeValue] = useState("10:00");
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    // console.log(values, timeValue._d, selectedPlan);
    // console.log({
    //   name: values.name,
    //   mobile: values.phone,
    //   date: timeValue._d,
    //   plan: selectedPlan,
    // });

    setLoading(true);
    // send email
    try {
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs
        .send(
          process.env.NEXT_PUBLIC_SERVICE_ID,
          process.env.NEXT_PUBLIC_SERVICE_PAGE_TEMPLATE_ID,
          {
            name: values.name,
            mobile: values.phone,
            date: timeValue._d,
            plan: selectedPlan,
          },
          process.env.NEXT_PUBLIC_USER_ID
        )
        .then(() => {
          setLoading(false);
          router.push("/servicethankyou");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="seller-modal-section service-card-form-modal">
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
          <InputNumber size="large" maxLength={10} />
        </Form.Item>

        <DatePicker
          format="YYYY-MM-DD HH:mm a"
          disabledDate={disabledDate}
          disabledTime={disabledTime}
          hideDisabledOptions={true}
          showTime={{
            hideDisabledOptions: true,
          }}
          onChange={(value) => setTimeValue(value)}
        />

        <button type="submit">
          {loading ? <Spin indicator={loadingIcon} /> : "Submit Now"}
        </button>
      </Form>
    </section>
  );
};

const ServiceCard = ({ className, item }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

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
    <>
      <div className={`product-card service-card ${className}`}>
        {/* Image */}
        <div className="image-container" style={{ width: "100%" }}>
          <Image
            src={item && item.image}
            alt="Cars&Cars"
            layout="fill"
            loading="lazy"
            blurDataURL="/images/bannerCar.webp"
            placeholder="blur"
          />
          <div className="package-title">
            <h2>{item.title}</h2>
          </div>
        </div>

        <div className="content">
          <div className="standard">
            <h3>Standard</h3>

            <p className="price">
              <span>₹ {item.standard.price} </span>
            </p>

            <div className="features">
              {item.standard.features &&
                item.standard.features.map((feature, idx) => (
                  <p key={idx}>{feature}</p>
                ))}
            </div>

            <button
              className="cta-btn"
              onClick={() => {
                showModal();
                setSelectedPlan(
                  "Standard: " + item.title + " Price: " + item.standard.price
                );
              }}
            >
              Enquire Now
            </button>
          </div>

          <div className="premium">
            <h3>Premium</h3>

            <p className="price">
              <span>₹ {item.premium.price}</span>
            </p>

            <div className="features">
              {item.premium.features &&
                item.premium.features.map((feature, idx) => (
                  <p key={idx}>{feature}</p>
                ))}
            </div>

            <button
              className="cta-btn"
              onClick={() => {
                showModal();
                setSelectedPlan(
                  "Premium: " + item.title + " Price: " + item.premium.price
                );
              }}
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
      <Modal
        style={{
          top: "10%",
          width: "100%",
          height: "80%",
        }}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="seller-detail-modal-phone"
      >
        <ModalContent selectedPlan={selectedPlan} />
      </Modal>
    </>
  );
};

export default ServiceCard;
