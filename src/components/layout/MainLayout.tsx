import { Button, Layout } from "antd";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../../redux/features/auth/authSlice";
import Sidebar from "./Sidebar";

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());

    toast.success("Successfully logout", { duration: 2000 });
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }}>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
