import { Box } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ResetPassword from "../components/ResetPassword";

const ResetPasswordPage = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "32px 8px 32px 32px" }}
        >
          <ResetPassword />
        </Box>
      </Box>
    </>
  );
};

export default ResetPasswordPage;
