// next js imports
import React, { useState, useEffect } from "react";

// component imports
import { Select, Form, Input, InputNumber } from "antd";
const { Option } = Select;
import { api_path } from "../../db/path";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUserPhone } from "../../store/slices/global/userSlice";
import { useBrandsQuery, useModelsQuery } from "../../store/service/api";
import { Brands } from "../../db/car";

import { Spin } from "antd";
import { useAppContext } from "../../context/state";
import { LoadingOutlined } from "@ant-design/icons";
import { AiOutlineWhatsApp } from "react-icons/ai";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

const LeadForm = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [brandValue, setBrandValue] = useState();
  const [filteredModel, setFilteredModal] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const { wait, storeToLocal } = useAppContext();
  // const { data: Brands, isLoading: brandLoading } = useBrandsQuery();
  const { data: Models, isLoading: modelLoading } = useModelsQuery();

  // useEffect(() => {
  //   const getFilteredModels = () => {
  //     if (!modelLoading) {
  //       const newModelArr = Models.data.filter(
  //         (model) => model.b_id === brandValue
  //       );
  //       setFilteredModal(newModelArr);
  //     }
  //   };

  //   getFilteredModels();
  // }, [Models, brandValue, modelLoading]);

  useEffect(() => {
    window.onload = setPageLoaded(true);
  }, []);

  const onFinish = async (values) => {
    // console.log(values);

    var bodyFormData = new FormData();

    bodyFormData.append("brand", +values.brand);
    bodyFormData.append("model", +values.model);
    bodyFormData.append("price", +values.price);
    bodyFormData.append("reg_number", values.regNum);
    bodyFormData.append("mobile", +values.mobile_number);

    try {
      const axios = (await import("axios")).default;

      await axios({
        method: "post",
        url: `${api_path}/api/sell_your_car_2/`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        if (response.status === 200) {
          // console.log(response);
          dispatch(setUserPhone(values.mobile_number));
          storeToLocal("phone", values.mobile_number);
          sessionStorage.setItem("sell_ur_car_mobile", +values.mobile_number);
        }
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(true);
    wait(2000).then(() => {
      // redirect to thank you
      setLoading(false);
      router.push("/sellthankyou");
    });
  };

  if (!pageLoaded) {
    return <div></div>;
  }

  return (
    <Form className="detail-form lead-form" onFinish={onFinish}>
      {/* // Brand // */}
      <Form.Item
        name="brand"
        label="Brand"
        className="input-container"
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(value) => setBrandValue(value)}
        >
          {Brands &&
            Brands.map((brand, idx) => (
              <Option key={idx} value={brand.title}>
                {brand.title}
              </Option>
            ))}
        </Select>
      </Form.Item>

      {/* // Model // */}
      {/* <Form.Item
        name="model"
        label="Model"
        className="input-container"
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {filteredModel && filteredModel.length > 0 ? (
            filteredModel.map((item, idx) => (
              <Option key={idx} value={item.m_id}>
                {item.m_name}
              </Option>
            ))
          ) : (
            <Option>Select brand first</Option>
          )}
        </Select>
      </Form.Item> */}

      {/* // Price // */}
      <Form.Item
        name="price"
        label="Selling Price"
        className="input-container"
        rules={[{ required: true }]}
      >
        <Input
          type="number"
          size="large"
          prefix="₹"
          id="price"
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* // Reg Num // */}
      <Form.Item
        name="regNum"
        label="Registration Number"
        className="input-container"
        rules={[
          {
            required: true,
            type: "string",
          },
        ]}
      >
        <Input
          size="large"
          id="regNum"
          placeholder="CG 04 XX XXXX"
          // pattern="^[A-Z|a-z]{2}\s[0-9]{2}\s[A-Z|a-z]{2}\s[0-9]{4}$"
          // title="CG 04 XX XXXX"
        />
      </Form.Item>

      {/* // Mobile // */}
      <Form.Item
        name="mobile_number"
        label="Mobile No."
        className="input-container"
        rules={[{ required: true, type: "number" }]}
      >
        <InputNumber
          size="large"
          placeholder="Enter 10 digit Mobile No."
          id="mobileNo"
          maxLength={10}
        />
      </Form.Item>

      <button type="submit">
        {loading ? <Spin indicator={loadingIcon} /> : "Submit"}
      </button>

      <div className="step">
        <div className="number">OR</div>
      </div>

      <button className="whatsapp-us">
        <a
          href="https://api.whatsapp.com/send?phone=7778889995&text=Hello,%20I%20am%20Interested%20for%20Sell-My-Car"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineWhatsApp className="icon" />
          Chat on WhatsApp
        </a>
      </button>
    </Form>
  );
};

export default LeadForm;
