import React from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import CreateProduct from "../../components/StoreKeeper/CreateProduct";

const CreateProductPage = () => {
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
          <CreateProduct />
        </Box>
      </Box>
    </>
  );
};

export default CreateProductPage;
