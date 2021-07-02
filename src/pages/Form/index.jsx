import React, { Component } from "react";
import FormPage from "./FormPage";
import FormPage2 from "./FormPage2";
import FormPage3 from "./FormPage3";
import HocPage from "./HocPage";

class Form extends Component {
  render() {
    return (
      <div>
        <HocPage />
        <FormPage />
        <FormPage2 />
        <FormPage3 />
      </div>
    );
  }
}

export default Form;
