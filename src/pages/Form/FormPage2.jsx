import React, { Component } from "react";
import { Form, Input, Icon, Button, Select } from "antd";

const { Option } = Select;
const nameRules = { required: true, message: "please input ur name" };
const passwordRules = {
  required: true,
  message: "please input ur password",
  label: "label",
};

class FormPage2 extends Component {
  formRef = React.createRef();
  onGenderChange = (value) => {
    switch (value) {
      case "male":
        this.formRef.current.setFieldsValue({
          name: "sdfa",
        });
        return;
      default:
        return;
    }
  };
  onReset=()=>{
    this.formRef.current.resetFields();
  }
  render() {
    const onFinish = (values) => {
      console.log("Received values of form: ", values);
    };
    const onFinishFailed = (e) => {
      console.log(e);
      let errors = e.errorFields;
      errors.forEach((e) => {
        console.log(`${e.name}: ${e.errors[0]}`);
      });
      console.log("data", e.values);
    };
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 5,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
      },
    };
    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };

    return (
      <div style={{ padding: "0 auto", border: "2px red solid" }}>
        <h3>FormPage2</h3>
        <Form
          {...formItemLayout}
          ref={this.formRef}
          validateMessages={validateMessages}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark=""// 三种形态 optional false 以及不写,必选项的规则里有required:false
        >
          <Form.Item 
          label="name" 
          required = "false"
          name="name" 
          tooltip="This is a required field" 
          rules={[{ ...nameRules }]}>
            <Input placeholder="please input ur name" />
          </Form.Item>

          <Form.Item
            label="password"
            name="password"
            rules={[{ ...passwordRules }]}
          >
            <Input type="password"  placeholder="please input ur password" />
          </Form.Item>
          <Form.Item
          required
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="number"
            label="number"
            rules={[
              {
                min: 10,
                max: 80,
              },
            ]}
          >
            <Input type="number"></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default FormPage2;
