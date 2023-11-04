import React from "react";
import { Box } from "@mui/material";
import AllStoreRequest from "../../components/StoreManager/AllStoreRequest";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import AllStoreKeeperRequest from "../../components/StoreKeeper/AllStoreKeeperRequest";

const AllOrderRequestKeeper = () => {
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
          <AllStoreKeeperRequest />
        </Box>
      </Box>
    </>
  );
};

export default AllOrderRequestKeeper;
