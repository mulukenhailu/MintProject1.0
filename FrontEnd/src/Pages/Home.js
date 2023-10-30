import React from "react";
import { Box, Stack } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import PropertyList from "../Components/PropertyList";
import Header from "../Components/Header";
const Home = () => {
  return (
    <Box>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <PropertyList />
      </Stack>
    </Box>
  );
};

export default Home;
