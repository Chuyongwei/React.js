import React, { Component } from "react";
import { Form, Input, Icon, Button } from "antd";

const nameRules = { required: true, message: "please input ur name" };
const passwordRules = {
  required: true,
  message: "please input ur password",
  label: "label",
};

class FormPage2 extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Received values of form: ", values);
    };
    const onFinishFailed = (e)=>{
      console.log(e);
      let errors =  e.errorFields;
      errors.forEach(e=>{
        console.log(`${e.name}: ${e.errors[0]}`);
      })
      console.log("data",e.values);
    }
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
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    return (
      <div style={{ padding: "0 auto", border: "2px red solid" }} >
        <h3>FormPage2</h3>
        <Form {...formItemLayout}  validateMessages={validateMessages} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
            label="name"
            name="name"
            rules={[{ ...nameRules }]}
          >
            <Input  placeholder="please input ur name" />
          </Form.Item>

          <Form.Item
            label="password"
            name="password"
            rules={[{ ...passwordRules }]}
          >
            <Input type="password" placeholder="please input ur password" />
          </Form.Item>
          <Form.Item
          name="number"
          label="number"
          rules={[{
            min:10,
            max:80
          }]}
          >
            <Input type="number" ></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default FormPage2;
