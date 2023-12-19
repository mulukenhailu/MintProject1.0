import React from "react";
import Box from "@mui/material/Box";
import EditUserComponent from "../../components/AdminComponent/UpdateUser";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const EditUserPage = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: "50px 8px 32px 32px",
          }}
        >
          <EditUserComponent />
        </Box>
      </Box>
    </>
  );
};

export default EditUserPage;
