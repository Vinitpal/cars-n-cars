// next js imports
import React, { useState, useEffect } from "react";

// component imports
import { Select, Form, Upload, Button, Radio, Input, InputNumber } from "antd";
const { Option } = Select;

import { years, kms } from "../../db/car";
import { useAppContext } from "../../context/state";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { setBasicDetailValue } from "../../store/slices/sell_your_car/basicDetailSlice";
import { useBrandsQuery, useModelsQuery } from "../../store/service/api";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

const BasicDetailForm = ({ setBasicDetailCompleted }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [brandValue, setBrandValue] = useState();
  const [filteredModel, setFilteredModal] = useState([]);

  const { wait } = useAppContext();
  const { data: Brands, isLoading: brandLoading } = useBrandsQuery();
  const { data: Models, isLoading: modelLoading } = useModelsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    const getFilteredModels = () => {
      if (!modelLoading) {
        const newModelArr = Models.data.filter(
          (model) => model.b_id === brandValue
        );
        setFilteredModal(newModelArr);
      }
    };

    getFilteredModels();
  }, [Models, brandValue, modelLoading]);

  const onFinish = async (values) => {
    console.log(values);
    dispatch(setBasicDetailValue(values));

    setLoading(true);
    wait(2000).then(() => {
      setLoading(false);
      setBasicDetailCompleted(true);
    });
  };

  return (
    <Form className="detail-form" onFinish={onFinish}>
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
          {!brandLoading &&
            Brands.data.map((brand, idx) => (
              <Option key={idx} value={brand.b_id}>
                {brand.b_name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item
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
      </Form.Item>

      <Form.Item
        name="year"
        label="Year"
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
          {years &&
            [...years].map((item, idx) => (
              <Option key={idx} value={item.title}>
                {item.title}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="kms"
        label="Kms Driven"
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
          {kms &&
            [...kms].map((item, idx) => (
              <Option key={idx} value={item.title}>
                {item.title}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="fuelType"
        label="Fuel Type"
        className="input-container"
        rules={[{ required: true }]}
      >
        <Radio.Group
          options={["Petrol", "Diesel", "Electric"]}
          optionType="button"
          buttonStyle="solid"
          value={"Petrol"}
          className="radio-group"
        />
      </Form.Item>

      <Form.Item
        name="transmission"
        label="Transmission"
        className="input-container"
        rules={[{ required: true }]}
      >
        <Radio.Group
          options={["Manual", "Automatic"]}
          optionType="button"
          buttonStyle="solid"
          value={"Manual"}
          className="radio-group"
        />
      </Form.Item>

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

      <Form.Item
        name="regNum"
        label="Registration Number"
        className="input-container"
        rules={[{ required: true, type: "string" }]}
      >
        <Input size="large" id="regNum" />
      </Form.Item>

      {/*
  

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
        name="insurance"
        label="Insurance"
        className="input-container"
        rules={[{ required: true }]}
      >
        <Radio.Group
          options={["Yes", "No"]}
          optionType="button"
          buttonStyle="solid"
          value={"Yes"}
          className="radio-group"
        />
      </Form.Item>

      <div className="input-container upload-input">
        <div className="rc-upload">
          <Form.Item name="rc_upload" label="RC Copy" id="rc">
            <Upload>
              <Button size="large" icon={<BsFillImageFill className="icon" />}>
                Upload RC
              </Button>
            </Upload>
          </Form.Item>
        </div>

        <div className="car-pic-upload">
          <Form.Item
            name="car_pic_upload"
            label="Car pic"
            id="carPic"
            rules={[{ required: true }]}
          >
            <Upload>
              <Button size="large" icon={<BsFillImageFill className="icon" />}>
                Upload Photo
              </Button>
            </Upload>
          </Form.Item>
        </div>
      </div>
            */}

      <button type="submit">
        {loading ? <Spin indicator={loadingIcon} /> : "Save and Next"}
      </button>
    </Form>
  );
};

export default BasicDetailForm;
