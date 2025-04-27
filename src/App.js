import React from "react";
import AppRouter from "router/Router";
import { Layout } from "antd";

import "./App.css";

const { Content } = Layout;

function App() {
  return (
    <Layout className="Container">
      <Content className="Content">
        <AppRouter />
      </Content>
    </Layout>
  );
}

export default App;
