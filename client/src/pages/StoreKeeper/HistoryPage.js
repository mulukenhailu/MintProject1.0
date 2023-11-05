import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Box from "@mui/material/Box";
import StorePropertiesList from "../../components/StoreKeeper/History";

const HistoryPage = () => {
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
          <StorePropertiesList />
        </Box>
      </Box>
    </>
  );
};

export default HistoryPage;
