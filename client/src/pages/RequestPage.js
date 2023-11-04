import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";

const RequestPage = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>RequestPage</h1>
        </Box>
      </Box>
    </>
  );
};

export default RequestPage;
