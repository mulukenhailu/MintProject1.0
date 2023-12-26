import { Box } from "@mui/material";
import React from "react";
import UserOrderComponent from "../components/UserOrderComponent";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const UserOrdersPage = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <UserOrderComponent />
        </Box>
      </Box>
    </>
  );
};

export default UserOrdersPage;
