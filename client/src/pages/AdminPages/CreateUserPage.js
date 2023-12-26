import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import CreateUser from "../../components/AdminComponent/CreateUser";
const CreateUserPage = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box paddingLeft={{ xs: 15, md: 20 }} padding={7}>
            <CreateUser />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateUserPage;
