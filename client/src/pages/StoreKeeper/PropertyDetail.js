import React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import PropertyDetailComponent from "../../components/StoreKeeper/PropertyDetailComponent";

const PropertyDetail = () => {
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
          <PropertyDetailComponent />
        </Box>
      </Box>
    </>
  );
};

export default PropertyDetail;
