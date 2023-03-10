import { Button, Dropdown, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { UserOutlined } from "@ant-design/icons";
import LoginForm from "./component/LoginForm";
import "./styles/App.css";
// import HomePage from "./component/HomePage";
const { Header, Content, Footer } = Layout;

function App() {
  const [authed, setAuthed] = useState(); //undefined is a falsy value

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthed(authToken !== null);
  }, []);

  const handleLoginSuccess = () => {
    setAuthed(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setAuthed(false);
  };

  const renderContent = () => {
    // return <></>;
    if (authed === undefined) {
      return <></>;
    }

    if (!authed) {
      return <LoginForm onLoginSuccess={handleLoginSuccess} />;
    }

    // return <HomePage />;
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <DarkModeToggle id="darkToggle" />
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
            App Store
          </div>
          {authed && (
            <div>
              <Dropdown trigger="click" overlay={userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
        </Header>
        <Content
          style={{ height: "calc(100% - 64px)", padding: 20, overflow: "auto" }}
        >
          {renderContent()}
        </Content>
        <Footer>
          ©2023 OnlyApp. All Rights Reserved. Website Made by DerickDu.
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
