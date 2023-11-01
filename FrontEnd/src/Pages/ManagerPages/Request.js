import React from 'react'
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import RequestToManager from '../../Components/RequestToManager';
import { Box, Stack } from "@mui/material";



function Request() {
  return (
    
     <Box>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <RequestToManager />
      </Stack>
    </Box>
    
  )
}

export default Request
