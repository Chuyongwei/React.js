import React, { Component } from "react";
import Layout from "./Layout";

class HomePage extends Component {
  render() {
    return (
      <Layout showTopBar={false} showBottomBar={true} title="商城首页">
        {/* <div>
          <h3>HomePage</h3>
        </div> */}
        {{
          content: (
            <div>
              <h3>HomePage</h3>
            </div>
          ),
          text: "这是一个文本",
          btnChilck: () => {
						console.log("这是一个按钮");
					},
        }}
      </Layout>
    );
  }
}

export default HomePage;
