import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import PropertyList from "../components/PropertyList";
import SearchForm from "../components/SearchForm";

const HomePage = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "32px 8px 32px 32px" }}
        >
          <PropertyList />
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
