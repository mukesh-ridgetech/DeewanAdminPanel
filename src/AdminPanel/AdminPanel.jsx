import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar, Button, Dropdown } from "antd";
import "../Style/AdminPanel.css";
import {
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  CarOutlined,
  EnvironmentOutlined,
  CarryOutOutlined,
  FormOutlined,
  HomeOutlined,
  WarningOutlined,
  TruckOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Home from "./Home";
import Personal from "./Personal";
import ImageUploader from "./ImageUploader";
const { Header, Sider, Content } = Layout;
import CreateAmenity from "./CreateAmenity";
import Users from "./Users";
import MasterCards from "./MasterCards";
import Builder from "../Master/Builder";
import Location from "../Master/Location";
import Overview from "../Master/Overview";
import Amenties from "../Master/Amenties";
import Furnished from "../Master/Furnished";
import Flooring from "../Master/Flooring";
import Fencing from "../Master/Fencing";
import Parking from "../Master/Parking";
import Neighbourhood from "../Master/Neighbourhood";
import Transition from "../Master/Transition";
import PropertiesDetails from "./PropertiesDetails";
import Testinomial from "./Testinomial";
import TrendingProperties from "./TrendingProperties";
// properties-details

import Properties from "./Properties";
import logo from '../../public/images/dewanLogo.png'

const AdminPanel = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const[id,setId] = useState();
 const navigate= useNavigate();

  const handleMenuClick = (e) => {
    setSelectedTab(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return <Home />;
      case "home":
        return <ImageUploader />;
      case "personal":
        return <CreateAmenity />;
      case "users":
        return <Users />;
      case "master-card":
        return <MasterCards setSelectedTab={setSelectedTab} />;
      case "builder-master":
        return <Builder />;

      case "location-master":
        return <Location />;

      case "overview-master":
        return <Overview />;

      case "amenties-master":
        return <Amenties />;

        case "furnished-master":
        return <Furnished />;


        case "flooring-master":
        return <Flooring />;

        case "fencing-master":
        return <Fencing />;

        case "parking-master":
        return <Parking />;

        case "neighbourhood-master":
        return <Neighbourhood />;

        case "transition-master":
        return <Transition />;

        case "properties":
        return <Properties setSelectedTab={setSelectedTab}  setId={setId}/>;

        case "properties-details":
        return <PropertiesDetails id={id}/>;

        case "testinomial":
        return <Testinomial/>;


        case "trendingProperties":
        return <TrendingProperties/>;
        
    }
  };

  const menuItems = [
    // { key: "home", icon: <TeamOutlined />, label: "Home" },
    { key: "users", icon: <TeamOutlined />, label: "Users" },
    { key: "properties", icon: <CarryOutOutlined />, label: "Properties" },
    { key: "testinomial", icon: <CalendarOutlined />, label: "Testinomial" },
    { key: "trendingProperties", icon: <EnvironmentOutlined />, label: "Trending Properties" },
    // EnvironmentOutlined
    {
      key: "master-card",
      icon: <TeamOutlined />,
      label: "Setups",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", maxWidth: "100vw" }}>
      <Header className="header">
      <div className="logo-vinMart">
          <img src={logo} alt="dewanRealty Logo" />
        </div>


        <Button type="primary" onClick={handleLogout}  style={{ marginLeft: '20px' }}>
          Logout
        </Button>
      </Header>

      <Layout>
        <Sider className="sider">
          <Menu
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={handleMenuClick}
          >
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>

            {menuItems?.map((menuItem) => (
              <Menu.Item key={menuItem?.key} icon={menuItem?.icon}>
                {menuItem?.label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        <Layout style={{ padding: "24px" }}>
          <Content className="content">{renderContent()}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
