import React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import AllPropertyComponent from "../../components/StoreKeeper/AllPropertyComponent";

const AllPropertyPage = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "16px 8px 32px 32px" }}
        >
          <AllPropertyComponent />
        </Box>
      </Box>
    </>
  );
};

export default AllPropertyPage;
