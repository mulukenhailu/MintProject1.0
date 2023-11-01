import React from 'react'
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import RequestToManager from '../../Components/RequestToManager';
import { Box, Stack } from "@mui/material";
import PropertyList from '../../Components/PropertyList';



function Manager() {
  return (
    
     <Box>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <PropertyList />
      </Stack>
    </Box>
    
  )
}

export default Manager
