import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import Sidebar from "../Components/Sidebar";


const RootLayout = () => {
  
  return (
    <Box>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <Outlet />
      </Stack>
    </Box>
  );
};

export default RootLayout;
