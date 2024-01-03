import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";
import RequestDetailPageComponent from "../components/RequestDetailPageComponent";

const RequestPageDetail = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, paddingLeft: 2, paddingTop: 3 }}
        >
          <RequestDetailPageComponent />
        </Box>
      </Box>
    </>
  );
};

export default RequestPageDetail;
