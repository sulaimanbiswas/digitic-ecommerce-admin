import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Badge, Button, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LiaBlogSolid } from "react-icons/lia";
import {
  MdAddShoppingCart,
  MdCategory,
  MdDashboardCustomize,
  MdOutlineInvertColors,
  MdOutlineShoppingCart,
  MdPlaylistAddCheck,
  MdShoppingCart,
} from "react-icons/md";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { TbBrandDatabricks } from "react-icons/tb";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo text-center">
            <img
              src="/sm-logo.svg"
              alt="logo"
              className="sm-logo"
              width={40}
              height={40}
            />
            <img
              src="/lg-logo.svg"
              alt="logo"
              className="lg-logo"
              width={200}
              height={40}
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key === "sign-out") {
                return;
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "",
                icon: <MdDashboardCustomize className="fs-5" />,
                label: "Dashboard",
              },
              {
                key: "customers",
                icon: <PiUsersThreeDuotone className="fs-5" />,
                label: "Customers",
              },
              {
                key: "catalog",
                icon: <MdOutlineShoppingCart className="fs-5" />,
                label: "Catalog",
                children: [
                  {
                    key: "add-product",
                    icon: <MdAddShoppingCart className="fs-5" />,
                    label: "Add Products",
                  },
                  {
                    key: "products-list",
                    icon: <MdShoppingCart className="fs-5" />,
                    label: "Products List",
                  },
                  {
                    key: "add-brand",
                    icon: <TbBrandDatabricks className="fs-5" />,
                    label: "Add Brand",
                  },
                  {
                    key: "brands-list",
                    icon: <TbBrandDatabricks className="fs-5" />,
                    label: "Brands List",
                  },
                  {
                    key: "add-category",
                    icon: <BiCategoryAlt className="fs-5" />,
                    label: "Add Category",
                  },
                  {
                    key: "categories-list",
                    icon: <BiCategoryAlt className="fs-5" />,
                    label: "Categories List",
                  },
                  {
                    key: "add-color",
                    icon: <MdOutlineInvertColors className="fs-5" />,
                    label: "Add Color",
                  },
                  {
                    key: "colors-list",
                    icon: <MdOutlineInvertColors className="fs-5" />,
                    label: "Colors List",
                  },
                ],
              },
              {
                key: "orders",
                icon: <MdPlaylistAddCheck className="fs-5" />,
                label: "Orders",
              },
              {
                key: "blogs",
                icon: <LiaBlogSolid className="fs-5" />,
                label: "Blogs",
                children: [
                  {
                    key: "add-blog",
                    icon: <LiaBlogSolid className="fs-5" />,
                    label: "Add Blog",
                  },
                  {
                    key: "blogs-list",
                    icon: <LiaBlogSolid className="fs-5" />,
                    label: "Blogs List",
                  },
                  {
                    key: "add-blog-category",
                    icon: <MdCategory className="fs-5" />,
                    label: "Add Blog Category",
                  },
                  {
                    key: "blog-categories-list",
                    icon: <MdCategory className="fs-5" />,
                    label: "Blog Categories",
                  },
                ],
              },
              {
                key: "enquiries",
                icon: <MdPlaylistAddCheck className="fs-5" />,
                label: "Enquiries",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="d-flex justify-content-between align-items-center pe-4"
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="d-flex align-items-center gap-3 ">
              <div className="position-relative">
                <Badge size="small" count={5} color="yellow">
                  <IoMdNotificationsOutline className="fs-3" />
                </Badge>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="">
                  <img
                    src="/user.png"
                    alt="user"
                    className="rounded-circle"
                    width={40}
                    height={40}
                  />
                </div>
                <div className=" ">
                  <h5 className="mb-0 user-name">Admin</h5>
                  <p className="mb-0 user-email">admin@gmail.com</p>
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "calc(100vh - 112px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
