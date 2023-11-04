import React from "react";
import { Box } from "@mui/material";
import AllManagersRequest from "../../components/Manager/AllManagersRequest";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const AllManagersRequestPage = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "0px 8px 32px 32px" }}
        >
          <AllManagersRequest />
        </Box>
      </Box>
    </>
  );
};

export default AllManagersRequestPage;
