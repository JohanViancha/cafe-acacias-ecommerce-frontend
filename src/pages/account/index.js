"use client";
import { useAuth } from "@/hooks";

import { useState } from "react";
import BasicLayout from "@/layouts/BasicLayout";
import Info from "@/components/Account/Info/index";
import ChangeNameForm from "@/components/Account/Settings/ChangeNameForm/index";
import ChangeEmailForm from "@/components/Account/Settings/ChangeEmailForm/index";
import ChangPasswordForm from "@/components/Account/Settings/ChangePasswordForm/index";
import AddAddress  from "@/components/Account/Address/AddAddress/index";
import ListAddresses from "@/components/Account/Address/ListAddresses/index";

import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import Wishlist from "@/components/Account/Wishlist";
import Orders from "@/components/Account/Orders";
import Seo from "@/components/Shared/Seo";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Account() {
  const [value, setValue] = useState(0);
  const { user, logout } = useAuth();
  const router = useRouter();
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  if (!user) {
    router.push("/");
    return null;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
    <Seo title="Mi cuenta"/>
    <BasicLayout>
      <Info />

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              icon={<ShoppingBagIcon />}
              iconPosition="start"
              label="Mis pedidos"
              key={0}
              {...a11yProps(0)}
            />
            <Tab
              key={1}
              icon={<FavoriteIcon />}
              iconPosition="start"
              label="Lista de deseos"
              {...a11yProps(1)}
            />
            <Tab
              key={2}
              icon={<LocationOnIcon />}
              iconPosition="start"
              label="Direcciones"
              {...a11yProps(2)}
            />
            <Tab
              key={3}
              icon={<SettingsIcon />}
              iconPosition="start"
              label="Ajustes"
              {...a11yProps(3)}
            />
            <Tab icon={<LogoutIcon />} aria-label="logout" onClick={logout} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Orders /> 
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Wishlist />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AddAddress  onReload={onReload} />
          <ListAddresses reload={reload} onReload={onReload} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Stack gap={3}>
            <ChangeNameForm />
            <ChangeEmailForm />
            <ChangPasswordForm />
          </Stack>
        </CustomTabPanel>
      </Box>
    </BasicLayout>
    
    </>
    
  );
}

export default Account;
