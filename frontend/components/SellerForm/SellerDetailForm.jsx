// next js imports
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

// component imports
import { Select, InputNumber, Input, Radio, Form, Upload, Button } from "antd";
const { Option } = Select;
import { BsFillImageFill } from "react-icons/bs";
import { useAppContext } from "../../context/state";
import { api_path, old_api_path } from "../../db/path";

import { ownerType } from "../../db/car";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { setUserPhone, setUserName } from "../../store/slices/global/userSlice";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

const SellerDetailForm = ({ setSellerDetailCompleted }) => {
  const { wait } = useAppContext();

  const basicDetailValue = useSelector((state) => state.basicDetail.value);
  const dispatch = useDispatch();
  const { storeToLocal } = useAppContext();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    // console.log(values);
    var bodyFormData = new FormData();

    bodyFormData.append("brand", +basicDetailValue.brand);
    bodyFormData.append("model", +basicDetailValue.model);
    bodyFormData.append("price", +basicDetailValue.price);
    bodyFormData.append("fuel_type", basicDetailValue.fuelType);
    bodyFormData.append("transmission_type", basicDetailValue.transmission);
    bodyFormData.append("year_of_purchase", +basicDetailValue.year);
    bodyFormData.append("kilometer_driven", basicDetailValue.kms);
    bodyFormData.append("reg_number", basicDetailValue.regNum);
    // bodyFormData.append("doc", basicDetailValue.rc_upload);
    bodyFormData.append("front_image", values.front);
    bodyFormData.append("back_image", values.back);
    bodyFormData.append("side_image", values.side);
    bodyFormData.append("interior_image", values.interior);
    bodyFormData.append("name", values.full_name);
    bodyFormData.append("mobile", values.mobile_number);
    bodyFormData.append("no_of_owners", values.ownerType);
    // bodyFormData.append("email", values.email);
    // bodyFormData.append("city", values.city);
    // bodyFormData.append("state", values.state);
    bodyFormData.append("you_are", values.you_are);

    try {
      const axios = (await import("axios")).default;

      await axios({
        method: "post",
        url: `${api_path}/api/sell_your_car/`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(async function (response) {
        if (response.status === 200) {
          // console.log(response);
          dispatch(setUserPhone(values.mobile_number));
          dispatch(setUserName(values.full_name));
          storeToLocal("name", values.full_name);
          storeToLocal("phone", values.mobile_number);
          sessionStorage.setItem("sell_ur_car_mobile", +values.mobile_number);

          const emailjs = (await import("@emailjs/browser")).default;

          await emailjs
            .send(
              process.env.NEXT_PUBLIC_SERVICE_ID,
              process.env.NEXT_PUBLIC_SELL_YOUR_CAR_TEMPLATE_ID,
              {
                name: values.full_name,
                mobile: values.mobile_number,
              },
              process.env.NEXT_PUBLIC_USER_ID
            )
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            );
        }
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(true);
    wait(2000).then(() => {
      setLoading(false);
      setSellerDetailCompleted(true);
      // router.push("/thankYou");
    });
  };

  return (
    <Form onFinish={onFinish} className="detail-form">
      <Form.Item
        name="full_name"
        label="Owner Name"
        className="input-container"
        rules={[{ required: true, type: "string" }]}
      >
        <Input size="large" placeholder="Full Name" id="fullName" />
      </Form.Item>

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
        />
      </Form.Item>

      <Form.Item
        name="ownerType"
        label="Owner Type"
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
          {ownerType &&
            [...ownerType].map((owner, idx) => (
              <Option key={idx} value={idx + 1}>
                {owner.title}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="you_are"
        label="Are you?"
        rules={[{ required: true }]}
        className="input-container"
      >
        <Radio.Group size="large">
          <Radio.Button value="user">User</Radio.Button>
          <Radio.Button value="dealer">Dealer</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <div className="input-container upload-input">
        <div className="car-pic-upload">
          <Form.Item name="front" label="Front" id="front">
            <Upload listType="picture" maxCount={1}>
              <Button size="large" icon={<BsFillImageFill className="icon" />}>
                Upload Photo
              </Button>
            </Upload>
          </Form.Item>
        </div>

        <div className="car-pic-upload">
          <Form.Item name="back" label="Back" id="back">
            <Upload listType="picture" maxCount={1}>
              <Button size="large" icon={<BsFillImageFill className="icon" />}>
                Upload Photo
              </Button>
            </Upload>
          </Form.Item>
        </div>

        <div className="car-pic-upload">
          <Form.Item name="side" label="Side Photo" id="side-photo">
            <Upload listType="picture" maxCount={1}>
              <Button size="large" icon={<BsFillImageFill className="icon" />}>
                Upload Photo
              </Button>
            </Upload>
          </Form.Item>
        </div>

        <div className="car-pic-upload">
          <Form.Item name="interior" label="Interior Photo" id="interior">
            <Upload listType="picture" maxCount={1}>
              <Button size="large" icon={<BsFillImageFill className="icon" />}>
                Upload Photo
              </Button>
            </Upload>
          </Form.Item>
        </div>
      </div>

      <button type="submit">
        {loading ? <Spin indicator={loadingIcon} /> : "Proceed to Verification"}
      </button>
    </Form>
  );
};

export default SellerDetailForm;
