import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState,useEffect } from "react";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineBranches,
  AiOutlineTrademarkCircle,
  AiOutlineUserSwitch,
  AiOutlineOrderedList,
} from "react-icons/ai";
import { CiDiscount1 } from "react-icons/ci";
import { VscChecklist } from "react-icons/vsc";
import { BsExclamationCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { Avatar } from "@mui/material";
import { usePopover } from "../hooks/use-popover";
import { AccountPopover } from "../Components/account-popover";
import Notifications from "./notifications";
import { auth } from "../Config/FirebaseConfig";
import axios from "axios";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [user, setUser] = useState({
    id: 0,
    email: "",
    role_id: 0,
    image:""
  });
  const role = localStorage.getItem("role_id");
  const user3=auth.currentUser.toJSON();
  useEffect(() => {
    const fetchHandler = async () => {
      return await axios
        .get(`http://localhost:5005/Admin/GetAccountByEmail/${user3.email}`)
        .then((res) => res.data);
    };
    fetchHandler().then((data) => {
      setUser(data.account);
      console.log(data);
    });
  }, []);
  const navigate = useNavigate();
  const accountPopover = usePopover();
 
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ minWidth: "100vh",backgroundColor:"white"}}
      >
        <div className="logo" style={{backgroundColor:"transparent"}}>
          <h2 className="text-black fs-5 text-center py-3">
            <span className="sm-logo"><img src={require("../assets/logo.png")} width={50} height={50} alt="logo"/></span>
            <span className="lg-logo" style={{margin:20}}><img src={require("../assets/logo.png")} width={150} height={50} alt="logo"/></span>
          </h2>
        </div>
        <Menu
          mode="inline"
         
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard style={{color :"#FF6600"}} className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "produits",
              icon: <AiOutlineShoppingCart style={{color :"#FF6600"}}className="fs-4" />,
              label: "Produits",
              children: [
                {
                  key: "liste-produit",
                  icon: <AiOutlineOrderedList style={{color :"#FF6600"}} className="fs-4" />,
                  label: "Liste produits",
                },
              ],
            },
            {
              key: " sous catégories",
              icon: <AiOutlineBranches style={{color :"#FF6600"}} className="fs-4" />,
              label: "Sous Catégories",
              children: [
                {
                  key: "liste-Categorie",
                  icon: <AiOutlineOrderedList style={{color :"#FF6600"}} className="fs-4" />,
                  label: "Liste sous catégories",
                }
              ],
            },
            {
              key: "partenaires",
              icon: <AiOutlineTrademarkCircle style={{color :"#FF6600"}} className="fs-4" />,
              label: "Partenaires",
              children: [
                {
                  key: "liste-partenaire",
                  icon: <AiOutlineOrderedList className="fs-4" />,
                  label: "Liste partenaires",
                },
              ],
            },
           role ==1 ? ({
              key: "utilisateurs",
              icon: <AiOutlineUserSwitch  style={{color :"#FF6600"}} className="fs-4" />,
              label: "Utilisateurs",
              children: [
                {
                  key: "liste-admin",
                  icon: <AiOutlineOrderedList style={{color :"#FF6600"}} className="fs-4" />,
                  label: "Liste admins",
                },
                {
                  key: "liste-utilisateurs",
                  icon: <AiOutlineOrderedList style={{color :"#FF6600"}} className="fs-4" />,
                  label: "Liste utilisateurs",
                },
              ],
            }):null,
            role ==1 ? ({
              key: "offres",
              icon: <CiDiscount1 style={{color :"#FF6600"}} className="fs-4" />,
              label: "Offres",
              children: [
                {
                  key: "Liste-offre",
                  icon: <AiOutlineOrderedList style={{color :"#FF6600"}} className="fs-4" />,
                  label: "Liste Offres",
                },
              ],
            }):null,
          role == 1 ?(  {
              key: "commandes",
              icon: <VscChecklist style={{color :"#FF6600"}} className="fs-4" />,
              label: "Commandes",
              children: [
                {
                  key: "liste-commande",
                  icon: <AiOutlineOrderedList style={{color :"#FF6600"}} className="fs-4" />,
                  label: "Liste  commandes",
                },
              ],
            }):null,
            {
              key: "réclamations",
              icon: <BsExclamationCircleFill  style={{color :"#FF6600"}} className="fs-4" />,
              label: "Réclamation",
              children: [
                {
                  key: "liste-reclamation",
                  icon: <AiOutlineOrderedList style={{color :"#FF6600"}} className="fs-4" />,
                  label: "Liste  réclamations",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="d-flex justify-content-between ps-3 pe-5"
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-3 align-items-center">
            <div className="d-flex gap-3 align-items-center">
              <div>
                <Avatar
                  onClick={accountPopover.handleOpen}
                  ref={accountPopover.anchorRef}
                  sx={{
                    cursor: "pointer",
                    height: 40,
                    width: 40,
                  }}
                  src={user.image}
                />
                <AccountPopover
                  anchorEl={accountPopover.anchorRef.current}
                  open={accountPopover.open}
                  onClose={accountPopover.handleClose}
                />
              </div>
              <div>
                <p className="mb-0"> {user.email}</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
        <Outlet /> 

        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
