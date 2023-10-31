import React from "react";
import { Stack, Box } from "@mui/material";
import Header from "../../Components/Header";
import SideBar from "../../Components/Sidebar";
import AllStoreRequest from "../../Components/StoreManager/AllStoreRequest";

const AllStoreRequestPage = () => {
  return (
    <Box>
      <Header />
      <Stack direction={"row"}>
        <SideBar />
        <AllStoreRequest />
      </Stack>
    </Box>
  );
};

export default AllStoreRequestPage;
