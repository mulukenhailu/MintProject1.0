import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PropertyEditComponent from "../../components/StoreKeeper/PropertyEditComponent";

const PropertyEdit = () => {
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
          <PropertyEditComponent />
        </Box>
      </Box>
    </>
  );
};

export default PropertyEdit;
